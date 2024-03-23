<template>
  <div style="background-color: #e8ded9; padding-bottom: 40px;">
    <TopSearchComponent />
    <PropertyValueDialog v-model:visible="propertyValueDialogVisible" v-model:property="dialogProperty" v-model:spec="dialogSpec" />
    <el-main class="container">
      <div class="title">购物车</div>
      <el-divider />
      <el-table :data="products">
        <el-table-column type="selection" />
        <el-table-column label="商品名称" width="300">
          <template #default="scope">
            <div class="flex-container">
              <div>
                <router-link :to="'/index/product/' + scope.row.id" style="height: 80px; display: block;">
                  <el-image style="width: 80px; height: 80px;" :src="scope.row.thumbnail" fit="contain" />
                </router-link>
              </div>
              <div>
                <router-link class="product-name" :to="'/index/product/' + scope.row.id">
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
            <el-input-number v-model="scope.row.num" :min="1" :max="scope.row.stock" size="small" />
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
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-divider />
    </el-main>
  </div>
</template>

<script>
import TopSearchComponent from '@/components/content/TopSearchComponent.vue';
import { parseBalance } from '@/utils/util';
import PropertyValueDialog from '../../../components/content/PropertyValueDialog.vue';
export default {
  data() {
    return {
      //商品信息对话框是否显示
      propertyValueDialogVisible: false,
      dialogProperty: {},
      dialogSpec: {},
      products: [
        {
          //商品 id
          id: "1",
          thumbnail: "http://127.0.0.1:8081/resources/product_image/2024/03/d8fd1ac2a3244ae5a8983d85fccdc757.jpg",
          name: "烤熟整箱商用烘焙花生碎炒原味花生仁奶茶牛轧糖蛋糕配料5斤袋装",
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
            },
            '3': {
              name: "包装",
              values: {
                '1': "朴实",
                '2': "华丽",
                '3': "得瑟",
                '4': "皇家",
                '5': "金贵",
                '6': "24K纯金",
                '7': "牛皮",
                '8': "铁箱",
                '9': "木头",
              }
            }
          },
          //用户选择的属性
          spec: {
            '1': '2',
            '2': '3',
            '3': '6'
          },
          //单价
          price: "10005",
          //数量
          num: 1,
          //库存（约束数量的值）
          stock: 5,
          //是否显示该商品属性的编辑按钮
          isShowEdit: false
        }
      ]
    };
  },
  methods: {
    handlerMouseEnter(event, product) {
      product.isShowEdit = true;
    },
    handlerMouseLeave(event, product) {
      product.isShowEdit = false;
    },
    /**
     * 打开商品信息对话框
     */
    openPropertyValueDialog(product) {
      this.propertyValueDialogVisible = true;
      this.dialogProperty = product.property;
      this.dialogSpec = product.spec;
    },
    parseBalance(balance) {
      return parseBalance(balance);
    }
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
}
.item-red {
  color: #f40 !important;
}
</style>