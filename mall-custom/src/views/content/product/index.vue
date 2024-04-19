<template>
  <div style="background-color: #e8ded9; padding-bottom: 40px;">
    <TopSearchComponent />
    <el-main class="container">
      <div class="info-container">
        <div class="left-pic-container">
          <el-image class="show-item" :src="showImage" fit="contain" />
          <div ref="thumbnails" class="pic-thumbnails">
            <div v-for="item in product.productImageList">
              <el-image class="thumbnail" :src="item" fit="contain" @mouseenter="handleMouseEnter" />
            </div>
          </div>
        </div>
        <div class="right-container">
          <div style="width: 100%;">
            <h1 class="main-title">{{ product.name }}</h1>
          </div>
          <Price class="margin-top"
            :price="parseBalance(product.promotePrice ? product.promotePrice : product.originalPrice)"
            :original-price="product.promotePrice ? parseBalance(product.originalPrice) : null"
          />
          <div class="margin-top mcdelivery">
            <span class="label">配送地址：</span>
            <el-select
              v-model="address"
              placeholder="选择地址"
              size="large"
              style="flex: 1"
            >
              <el-option
                v-for="item in addresses"
                :label="item.province + ' ' + item.city + ' ' + item.town + ' ' + item.street + ' ' + item.mobile"
                :value="item.id"
              />
            </el-select>
          </div>
          <div class="basic-content">
            <div class="sku-cate" v-for="item, key in property">
              <span class="label">{{ item.name }}：</span>
              <div class="skuItemWrapper">
                <el-radio-group v-model="form.specFix[key]" size="large">
                  <el-radio-button v-for="v, k in item.values" :label="k">
                    {{ v }}
                  </el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div class="sku-cate">
              <span class="label">数量：</span>
              <el-input-number v-model="form.num" size="large" :min="1" :max="product.stock > 0 ? product.stock : 1" :disabled="product.stock <= 0" />
              <div style="width: 10px;"></div>
              <el-tag v-if="product.stock > 0" size="large" type="success">有货</el-tag>
              <el-tag v-else size="large" type="danger">缺货</el-tag>
            </div>
          </div>
          <div class="basic-content">
            <el-button-group class="action-group">
              <el-button size="large">立即购买</el-button>
              <el-button size="large" @click="addCart">加入购物车</el-button>
            </el-button-group>
            <span style="width: 10px; display: inline-block;"></span>
            <el-button v-if="isStar != null" text round @click="addStar">
              <IconSVGComponent :class="'icon ' + (isStar ? 'is-star' : '')" :name="isStar ? 'icon-biaoxingfill' : 'icon-biaoxing'" />
              <span>收藏</span>
            </el-button>
          </div>
        </div>
      </div>
      <el-tabs class="content" v-model="tab">
        <el-tab-pane label="商品详情" name="1">
          <div class="product-detail" v-html="productImage"></div>
        </el-tab-pane>
        <el-tab-pane label="商品评论" name="2">评论</el-tab-pane>
      </el-tabs>
    </el-main>
  </div>
</template>

<script>
import TopSearchComponent from '@/components/content/TopSearchComponent.vue';
import Price from '@/components/content/Price.vue';
import IconSVGComponent from '@/components/utils/IconSVGComponent.vue';
import { getProduct } from '@/api/product';
import { getCustomProperty } from '@/api/property'
import { parseBalance } from '@/utils/util';
import { addCart } from '@/api/cart';
import { ElMessage } from 'element-plus';
import { listAddresses } from '@/api/address';
import { addStar, getIsStar, deleteStar } from '@/api/star';

export default {
  data() {
    return {
      id: "",
      tab: "1",
      showImage: "",
      //商品对象
      product: {},
      //地址
      address: null,
      //地址列表
      addresses: [],
      //商品属性
      property: {},
      //详情图片（markdown 格式）
      productImage: "",
      form: {
        specFix: {},
        num: 1
      },
      //标记商品是否已收藏
      isStar: null
    };
  },
  methods: {
    /**
     * 监听鼠标滑入图片
     */
    handleMouseEnter(event) {
      let cs = this.$refs['thumbnails'].childNodes;
      for(let i = 1; i < cs.length - 1; i++) {
        cs[i].firstChild.classList.remove('pic-active');
      }
      event.target.parentNode.classList.add('pic-active');
      this.showImage = event.target.src;
    },
    getProduct() {
      getProduct(this.id).then((response) => {
        if(response != null) {
          this.product = response.data;
          //默认显示第一张图片
          let that = this;
          this.$nextTick(() => {
            let cs = that.$refs['thumbnails'].childNodes;
            cs[1].firstChild.classList.add('pic-active');
          });
          this.showImage = (this.product.hasOwnProperty('productImageList') && this.product.productImageList.length > 0) ? this.product.productImageList[0] : null;
          //组合详情图片
          if(this.product.productDetailImageList != null && this.product.productDetailImageList.length > 0) {
            let temp = "";
            for(let i = 0; i < this.product.productDetailImageList.length; i++) {
              temp += `![image](${this.product.productDetailImageList[i]})`;
            }
            this.productImage = this.$markdown.parse(temp);
          }
        }
      })
    },
    getCustomProperty() {
      getCustomProperty(this.id).then((response) => {
        if(response != null) {
          this.property = response.data.property;
        }
      })
    },
    listAddresses() {
      listAddresses().then((response) => {
        if(response != null) {
          this.addresses = response.data;
          //找默认地址
          for(let i = 0; i < this.addresses.length; i++) {
            if(this.addresses[i].ifDefault) {
              this.address = this.addresses[i].id;
              break;
            }
          }
        }
      });
    },
    /**
     * 添加商品到购物车
     */
    addCart() {
      if(this.form.specFix == null || Object.keys(this.form.specFix).length != Object.keys(this.property).length) {
        ElMessage.warning("请选择您要的商品信息");
        return;
      }
      addCart({
        productId: this.id,
        num: this.form.num,
        spec: JSON.stringify(this.form.specFix)
      }).then((response) => {
        if(response != null) {
          ElMessage.success("成功添加到购物车");
        }
      })
    },
    /**
     * 收藏商品
     */
    addStar() {
      if(!this.isStar) {
        //添加收藏
        addStar(this.id).then((response) => {
          if(response != null) {
            ElMessage.success("收藏成功");
            this.isStar = true;
          }
        })
      } else {
        //取消收藏
        deleteStar([this.id]).then((response) => {
          if(response != null) {
            ElMessage.success("取消收藏成功");
            this.isStar = false;
          }
        })
      }
    },
    getIsStar() {
      getIsStar(this.id).then((response) => {
        if(response != null) {
          this.isStar = response.data;
        }
      })
    },
    parseBalance(balance) {
      return parseBalance(balance);
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getProduct();
    this.getCustomProperty();
    this.listAddresses();
    this.getIsStar();
  },
  components: { TopSearchComponent, Price, IconSVGComponent }
}
</script>

<style lang="scss" scoped>
.container {
  width: $mainWidth;
  border-radius: 24px;
  background-color: white;
  margin: 0 auto;
  padding: 12px;
  .info-container {
    display: flex;
    .left-pic-container {
      width: 450px;
      .show-item {
        width: 450px;
        height: 450px;
      }
      .pic-thumbnails {
        margin-top: 12px;
        display: flex;
        justify-content: space-between;
        .thumbnail {
          width: 68px;
          height: 68px;
          border-radius: 6px;
          overflow: hidden;
        }
        .thumbnail:hover {
          cursor: pointer;
        }
      }
    }
    .right-container {
      flex: 1;
      margin-left: 20px;
      .main-title {
        padding: 0;
        margin: 0;
        line-height: 28px;
        color: #000;
        letter-spacing: 0;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 900;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical
      }
      .mcdelivery {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -webkit-flex-direction: row;
        -moz-box-orient: horizontal;
        -moz-box-direction: normal;
        flex-direction: row;
        font-size: 14px;
        color: #000;
        position: relative;
        line-height: 22px;
      }
      .basic-content {
        margin-top: 26px;
        .sku-cate {
          display: flex;
          margin-bottom: 15px;
          align-items: center;
          .skuItemWrapper {
            flex: 1;
            :deep(.el-radio-button__inner) {
              border-left: var(--el-border);
              border-right: var(--el-border);
              border-radius: var(--el-border-radius-base);
            }
            :deep(.el-radio-button__original-radio:checked+.el-radio-button__inner) {
              border-color: var(--el-radio-button-checked-border-color,var(--el-color-primary));
            }
            :deep(.el-radio-button) {
              margin-right: 5px;
              margin-bottom: 5px;
            }
          }
        }
        .action-group {
          :deep(span) {
            color: white;
            font-weight: bold;
          }
          :deep(button:first-child) {
            border-top-left-radius: 50px;
            border-bottom-left-radius: 50px;
            background: linear-gradient(90deg, rgb(255, 119, 0), rgb(255, 73, 0));
            box-shadow: rgba(255, 119, 0, 0.2) 0px 9px 13px 0px;
          }
          :deep(button:last-child) {
            border-top-right-radius: 50px;
            border-bottom-right-radius: 50px;
            background: linear-gradient(90deg, rgb(255, 203, 0), rgb(255, 148, 2));
            box-shadow: rgba(255, 203, 0, 0.2) 0px 9px 13px 0px;
          }
          :deep(button) {
            border: none;
          }
          :deep(button:not(:last-child)) {
            margin-right: 0;
          }
        }
        .icon {
          font-size: 14px;
          margin-right: 5px;
          .is-star {
            color: #ff5000;
          }
        }
      }
    }
  }
  .content {
    :deep(.el-tabs__item) {
      font-size: 18px;
    }
  }
}

.pic-active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: 6px;
  border: 4px solid #f9f7f3;
  z-index: 1;
}

.pic-active::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: 6px;
  border: 1px solid #ff5000;
  z-index: 2;
  background-color: rgba(0,0,0,.02);
}

.margin-top {
  margin-top: 14px;
}

.label {
  display: inline-block;
  width: 75px;
  color: #7f7f7f
}

.product-detail {
  width: 720px;
  margin: 0 auto;
  :deep(p) {
    display: flex;
    flex-direction: column;
  }
  :deep(img) {
    width: 100%;
  }
}
</style>