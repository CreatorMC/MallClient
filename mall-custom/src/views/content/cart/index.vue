<template>
  <div style="background-color: #e8ded9; padding-bottom: 40px;">
    <TopSearchComponent />
    <PropertyValueDialog
      v-model:visible="propertyValueDialogVisible"
      v-model:property="dialogProperty"
      v-model:spec="dialogSpec"
      :id="dialogId"
      @confirm="handlerConfirm"
    />
    <el-main class="container">
      <div class="title">购物车</div>
      <el-divider />
      <el-table ref="table" :data="products" @selection-change="handlerSelectionChange">
        <el-table-column type="selection" />
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
            <div class="edit-absolute" @mouseenter="handlerMouseEnter($event, scope.row)" @mouseleave="handlerMouseLeave($event, scope.row)">
              <div>
                <div v-for="v, k in scope.row.spec">
                  {{ scope.row.property[k].name }}：{{ scope.row.property[k].values[v] }}
                </div>
              </div>
              <div class="edit-container" v-if="scope.row.isShowEdit">
                <el-button class="edit-button" type="primary" icon="Edit" @click="openPropertyValueDialog(scope.row)" />
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
            <el-input-number v-model="scope.row.num" :min="1" :max="scope.row.stock" size="small" @change="handlerChangeNum($currentValue, $oldValue, scope.row)" />
          </template>
        </el-table-column>
        <el-table-column label="金额">
          <template #default="scope">
            <div class="item-red price-container">
              ￥{{ parseBalance(scope.row.price * scope.row.num) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="danger" size="small" @click="deleteCart([scope.row.id])">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-divider />
      <div class="footer">
        <el-button text type="primary" @click="$refs['table'].toggleAllSelection()">全选</el-button>
        <el-button text type="danger" @click="deleteCarts">删除</el-button>
        <div style="flex: 1;"></div>
        <div class="box">
          已选商品&nbsp;<span class="big-num">{{ selectProductCount }}</span>&nbsp;件
        </div>
        <div style="flex: 0.1;"></div>
        <div class="box">
          合计：<span style="font-size: 24px;" class="big-num">{{ parseBalance(totalPrice) == "无" ? "0" : parseBalance(totalPrice) }}</span>&nbsp;&nbsp;
          <el-button type="danger" size="large" round :disabled="disableSubmit" @click="submit">结算</el-button>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
import TopSearchComponent from '@/components/content/TopSearchComponent.vue';
import { parseBalance } from '@/utils/util';
import PropertyValueDialog from '@/components/content/PropertyValueDialog.vue';
import { getCart, deleteCart, updateCart } from '@/api/cart';
import { ElMessageBox, ElMessage } from 'element-plus';
export default {
  data() {
    return {
      //商品信息对话框是否显示
      propertyValueDialogVisible: false,
      dialogProperty: {},
      dialogSpec: {},
      //已选几件商品
      selectProductCount: 0,
      //合计（总价格）
      totalPrice: 0,
      //是否禁用结算按钮
      disableSubmit: true,
      //传给商品信息对话框的购物车项 id
      dialogId: "",
      products: []
    };
  },
  methods: {
    handlerMouseEnter(event, product) {
      product.isShowEdit = true;
    },
    handlerMouseLeave(event, product) {
      product.isShowEdit = false;
    },
    handlerChangeNum(currentValue, oldValue, data) {
      this.updateCart(data);
      this.computTotalPrice(this.$refs['table'].getSelectionRows());
    },
    handlerConfirm(id) {
      for(let i = 0; i < this.products.length; i++) {
        //找到与给定 id 相同的购物车项
        if(this.products[i].id === id) {
          //更新此购物车项
          this.updateCart(this.products[i]);
          break;
        }
      }
    },
    handlerSelectionChange(newSelection) {
      this.selectProductCount = newSelection.length;
      if(newSelection.length > 0) {
        //有选中的商品，不禁用结算按钮
        this.disableSubmit = false;
      } else {
        //没有选中的商品，禁用结算按钮
        this.disableSubmit = true;
      }
      this.computTotalPrice(newSelection);
    },
    /**
     * 结算
     */
    submit() {
      let list = [];
      let cartItems = this.$refs['table'].getSelectionRows();
      for(let i = 0; i < cartItems.length; i++) {
        list.push(cartItems[i].id);
      }
      //将购物车项的 id 列表传给提交订单页面
      this.$router.push({ name: 'submit', params: { cartItemIds: list } });
    },
    /**
     * 计算总价格
     */
    computTotalPrice(newSelection) {
      let tempTotal = 0;
      for(let i = 0; i < newSelection.length; i++) {
        tempTotal += newSelection[i].price * newSelection[i].num
      }
      this.totalPrice = tempTotal;
    },
    /**
     * 更新购物车项
     */
    updateCart(data) {
      let dto = {
        id: data.id,
        productId: data.productId,
        num: data.num,
        spec: JSON.stringify(data.spec)
      }
      updateCart(dto).then((response) => {
        if(response != null) {
          //更新成功，不用任何提示
        }
      });
    },
    /**
     * 得到购物车列表
     */
    getCart() {
      getCart().then((response) => {
        if(response != null) {
          this.products = response.data;
          //将 spec 转换为对象
          for(let i = 0; i < this.products.length; i++) {
            let t = this.products[i].spec;
            if(typeof t == 'string') {
              this.products[i].spec = JSON.parse(t);
            }
          }
        }
      })
    },
    /**
     * 删除购物车项
     */
    deleteCart(ids) {
      ElMessageBox.confirm(
        '确定要删除选中的商品吗？',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        //确认
        deleteCart(ids).then((response) => {
          if(response != null) {
            ElMessage.success("删除成功");
            this.getCart();
          }
        });
      }).catch(() => {
        //取消
      });
    },
    /**
     * 删除多个购物车项
     */
    deleteCarts() {
      let rows = this.$refs['table'].getSelectionRows();
      if(rows.length <= 0) {
        ElMessage.warning("请选择商品");
        return;
      }
      let ids = [];
      for(let i = 0; i < rows.length; i++) {
        ids.push(rows[i].id);
      }
      this.deleteCart(ids);
    },
    /**
     * 打开商品信息对话框
     */
    openPropertyValueDialog(product) {
      this.propertyValueDialogVisible = true;
      this.dialogProperty = product.property;
      this.dialogSpec = product.spec;
      this.dialogId = product.id;
    },
    parseBalance(balance) {
      return parseBalance(balance);
    }
  },
  mounted() {
    this.getCart();
  },
  components: { TopSearchComponent, PropertyValueDialog }
}
</script>

<style lang="scss" scoped>
.container {
  width: $mainWidth;
  border-radius: 24px;
  background-color: white;
  margin: 0 auto;
  padding: 12px;
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 12px;
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
  .edit-absolute {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 8px 12px;
    line-height: 15px;
    .edit-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border: 1px dashed #f60;
      .edit-button {
        position: absolute;
        right: -1px;
        top: -1px;
        width: 25px;
        height: 25px;
        padding: 0px;
        border-radius: 0px;
        background-color: #f60;
        border-color: #f60;
      }
    }
  }
  :deep(tbody) {
    font-size: 12px;
  }
  .footer {
    display: flex;
    align-items: center;
    height: 50px;
    .big-num {
      font-weight: bold;
      font-size: 20px;
      color: #f40;
    }
    .box {
      display: flex;
      align-items: center;
    }
  }
}
.item-red {
  color: #f40 !important;
}
</style>