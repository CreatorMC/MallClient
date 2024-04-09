<template>
  <div>
    <div class="title">
      <span>确认收货地址</span>
      <div style="flex-grow: 1;"></div>
      <el-button link type="primary">管理收货地址</el-button>
    </div>
    <div class="address-container">
      <el-radio-group size="large" v-model="address">
        <el-radio v-for="item in addresses" :label="item.id" border>
          <div class="text">{{ item.province + " " + item.city + " " + item.town + " " + item.street + ` （${item.contact} 收） ` + item.mobile }}</div>
          <el-tag v-if="item.ifDefault" style="margin-left: 10px;" type="danger">默认地址</el-tag>
          <div style="flex-grow: 1;"></div>
          <el-button v-show="item.id == address" link type="danger">修改本地址</el-button>
        </el-radio>
      </el-radio-group>
      <div>
        <el-button type="primary">新增地址</el-button>
      </div>
    </div>
    <div class="title">
      <span>确认订单信息</span>
    </div>
    <el-table ref="table" :data="products">
      <el-table-column label="商品名称" width="300">
        <template #default="scope">
          <div class="flex-container">
            <div>
              <router-link :to="'/index/product/' + scope.row.productId" style="height: 80px; display: block;">
                <el-image style="width: 80px; height: 80px;" :src="scope.row.thumbnail" fit="contain" />
              </router-link>
            </div>
            <div>
              <router-link class="product-name" :to="'/index/product/' + scope.row.productId">
                {{ scope.row.name }}
              </router-link>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品信息" width="300">
        <template #default="scope">
          <div>
            <div v-for="v, k in scope.row.spec">
              {{ scope.row.property[k].name }}：{{ scope.row.property[k].values[v] }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单价">
        <template #default="scope">
          <div class="price-container">
            ￥{{ parseBalance(scope.row.price) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="150">
        <template #default="scope">
          {{ scope.row.num }}
        </template>
      </el-table-column>
      <el-table-column label="小计">
        <template #default="scope">
          <div class="item-red price-container">
            ￥{{ parseBalance(scope.row.price * scope.row.num) }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="box">
      <div class="box__wrapper">
        <div class="box__shadow">
          <div>
            <span class="realpay--title">实付款：</span>
            <span class="realpay--price-symbol">¥</span>
            <span class="realpay--price">{{ parseBalance(realPrice) == "无" ? 0.00 : parseBalance(realPrice) }}</span>
          </div>
          <div class="order-confirmAddr">
            <div>
              <span class="realpay--title">寄送至：</span>
              <span>{{ confirmAddress == null ? "请选择地址" : confirmAddress.province + " " + confirmAddress.city + " " + confirmAddress.town + " " + confirmAddress.street}}</span>
            </div>
            <div>
              <span class="realpay--title">收货人：</span>
              <span>{{ confirmAddress == null ? "请选择地址" : confirmAddress.contact + " " + confirmAddress.mobile }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="submit">
      <el-button type="danger" size="large" :disabled="products == null || products.length <= 0">提交订单</el-button>
    </div>
  </div>
</template>

<script>
import { parseBalance } from '@/utils/util';
import { listAddresses } from '@/api/address';
import { getSelectedCart } from '@/api/cart';
import { ElMessageBox, ElMessage } from 'element-plus';

export default {
  props: [
    'cartItemIds'   //购物车项 id 列表
  ],
  data() {
    return {
      address: null,
      //地址列表
      addresses: [],
      products: []
    }
  },
  methods: {
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
    getSelectedCart(ids) {
      getSelectedCart(ids).then((response) => {
        if(response != null) {
          this.products = response.data.products;
          //将 spec 转换为对象
          for(let i = 0; i < this.products.length; i++) {
            let t = this.products[i].spec;
            if(typeof t == 'string') {
              this.products[i].spec = JSON.parse(t);
            }
          }
          if(response.data.ifUpdate) {
            ElMessageBox.alert("检测到订单中有商品被下架或更新，已自动删除被下架或更新的商品。", "提示", {
              type: "info"
            });
          }
        }
      });
    },
    parseBalance(balance) {
      return parseBalance(balance);
    }
  },
  mounted() {
    if(this.cartItemIds && this.cartItemIds.length > 0) {
      this.listAddresses();
      this.getSelectedCart(this.cartItemIds);
    } else {
      this.$nextTick(() => {
        ElMessage.error("没有商品");
      });
    }
  },
  computed: {
    realPrice() {
      let result = 0;
      for(let i = 0; i < this.products.length; i++) {
        result += this.products[i].num * this.products[i].price;
      }
      return result;
    },
    confirmAddress() {
      for(let i = 0; i < this.addresses.length; i++) {
        if(this.addresses[i].id == this.address) {
          return this.addresses[i];
        }
      }
      return null;
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  font-weight: bold;
  line-height: 32px;
  border-bottom: 2px solid #f1f1f1;
  margin-bottom: 10px;
}
.address-container {
  :deep(.el-radio-group) {
    flex-direction: column;
    align-items: unset;
    width: 100%;
  }
  :deep(.el-radio) {
    width: 100%;
    height: max-content;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
  :deep(.el-radio:last-child) {
    margin-right: 32px;
  }
  :deep(.el-radio__label) {
    display: flex;
    width: 100%;
    align-items: center;
  }
  .text {
    white-space: normal;
  }
}

.flex-container {
  display: flex;
}

.product-name {
  font-size: 12px;
  display: block;
  max-height: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 5px;
  line-height: 15px;
  color: #3c3c3c;
  text-decoration: none;
}

.product-name:hover {
  color: #f60;
  text-decoration: underline;
}

.price-container {
  color: #3c3c3c;
  font-weight: 700;
  font-family: Verdana,Tahoma,arial;
}

.item-red {
  color: #f40 !important;
}

:deep(tbody) {
  font-size: 12px;
}

.box {
  text-align: right;
  margin-top: 15px;
  font: 12px Roboto, Helvetica Neue, Helvetica, Tahoma, Arial, PingFang SC,Microsoft YaHei;
  .box__wrapper{
    display: inline-block;
    border: 1px solid #ff0036;
    .box__shadow {
      border: 3px solid #fff0e8;
      min-width: 230px;
      padding: 10px 5px 10px 20px;
      .order-confirmAddr {
        line-height: 1.6;
        margin-top: 10px;
      }
    }
  }
  .realpay--title {
    font-weight: 700;
    color: #333;
  }
  .realpay--price-symbol {
    font-size: 26px;
    margin-right: 4px;
    color: #999;
  }
  .realpay--price {
    color: rgb(255, 80, 0);
    font: 700 26px tahoma;
  }
}

.submit {
  text-align: right;
  margin-top: 15px;
  > button {
    width: 182px;
  }
}
</style>