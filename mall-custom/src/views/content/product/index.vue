<template>
  <div style="background-color: #e8ded9; padding-bottom: 40px;">
    <TopSearchComponent />
    <el-main class="container">
      <div class="info-container">
        <div class="left-pic-container">
          <el-image class="show-item" :src="showImage" fit="contain" />
          <div ref="thumbnails" class="pic-thumbnails">
            <div v-for="i in 5">
              <el-image class="thumbnail" :src="srcList[i - 1]" fit="contain" @mouseenter="handleMouseEnter" />
            </div>
          </div>
        </div>
        <div class="right-container">
          <div style="width: 100%;">
            <h1 class="main-title">{{ title }}</h1>
          </div>
          <Price class="margin-top" price="10.5" original-price="8.02"/>
          <div class="margin-top mcdelivery">
            <span class="label">配送地址：</span>
            <el-select
              v-model="address"
              placeholder="选择地址"
              size="large"
              style="flex: 1"
            >
              <el-option
                v-for="item in 5"
                :key="item"
                :label="item"
                :value="item"
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
              <el-input-number v-model="form.num" size="large" :min="1" :max="stock > 0 ? stock : 1" :disabled="stock <= 0" />
              <div style="width: 10px;"></div>
              <el-tag v-if="stock > 0" size="large" type="success">有货</el-tag>
              <el-tag v-else size="large" type="danger">缺货</el-tag>
            </div>
          </div>
          <div class="basic-content">
            <el-button-group class="action-group">
              <el-button size="large">立即购买</el-button>
              <el-button size="large">加入购物车</el-button>
            </el-button-group>
            <span style="width: 10px; display: inline-block;"></span>
            <el-button text round>
              <IconSVGComponent class="icon" name="icon-biaoxing" />
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
export default {
  data() {
    return {
      tab: "1",
      showImage: "",
      //商品标题
      title: "",
      //商品预览图
      srcList: [
        '/img/banner_0.jpg',
        '/img/banner_1.jpg',
        '/img/default_fail_pic.png',
        '/img/404.png',
        '/img/default_head.png'
      ],
      //地址
      address: 1,
      //商品属性
      property: {
        '1': {
          name: "颜色",
          values: {
            '1': "红色",
            '2': "绿色"
          }
        },
        '2': {
          name: "型号",
          values: {
            '3': "大",
            '4': "中",
            '5': "小",
          }
        }
      },
      //库存
      stock: 10,
      //详情图片（markdown 格式）
      productImage: "",
      form: {
        specFix: {},
        num: 1
      }
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
    }
  },
  mounted() {
    //初始化展示图片
    let cs = this.$refs['thumbnails'].childNodes;
    cs[1].firstChild.classList.add('pic-active');
    this.showImage = this.srcList[0];

    this.productImage = this.$markdown.parse("![image](http://127.0.0.1:8081/resources/product_image/2024/03/9f1e08ec8d5a41a1aa883b5c4ddbab08.jpg)![image](http://127.0.0.1:8081/resources/product_image/2024/03/3b736f39111f4e6cbdbba6755317e96c.jpg)![image](http://127.0.0.1:8081/resources/product_image/2024/03/82c9a446ec134dfaa5b4e12977e4f533.jpg)");
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