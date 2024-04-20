<template>
  <div style="background-color: #e8ded9; padding-bottom: 40px;">
    <TopSearchComponent />
    <el-main class="container">
      <div class="title">我的收藏</div>
      <el-divider />
      <el-table ref="table" :data="products">
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
        <el-table-column label="收藏时间">
          <template #default="scope">
            {{ scope.row.time }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="danger" size="small" @click="deleteStar([scope.row.id])">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-divider />
      <div class="footer">
        <el-button text type="primary" @click="$refs['table'].toggleAllSelection()">全选</el-button>
        <el-button text type="danger" @click="deleteStars">删除</el-button>
      </div>
    </el-main>
  </div>
</template>

<script>
import TopSearchComponent from '@/components/content/TopSearchComponent.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { listStar, deleteStar } from '@/api/star';

export default {
  data() {
    return {
      products: []
    };
  },
  methods: {
    listStar() {
      listStar().then((response) => {
        if(response != null) {
          this.products = response.data;
        }
      })
    },
    deleteStars() {
      let rows = this.$refs['table'].getSelectionRows();
      if(rows.length <= 0) {
        ElMessage.warning("请选择收藏的商品");
        return;
      }
      let ids = [];
      for(let i = 0; i < rows.length; i++) {
        ids.push(rows[i].id);
      }
      this.deleteStar(ids);
    },
    deleteStar(ids) {
      ElMessageBox.confirm(
        '确定要取消收藏选中的商品吗？',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        //确认
        deleteStar(ids).then((response) => {
          if(response != null) {
            ElMessage.success("删除成功");
            this.listStar();
          }
        })
      }).catch(() => {
        //取消
      });
    }
  },
  mounted() {
    this.listStar();
  },
  components: { TopSearchComponent }
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