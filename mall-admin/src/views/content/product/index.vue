<template>
  <div>
    <el-form inline label-width="80px">
      <el-form-item label="商品名称">
        <el-input v-model="form.name" placeholder="请输入商品名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="form.categoryId" placeholder="分类" clearable>
          <el-option label="电子" value=1 />
          <el-option label="服装" value=2 />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getTableData">
          <el-icon><Search /></el-icon>
          <span>搜索</span>
        </el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" plain @click="openAddProductDialog">
        <el-icon><Plus /></el-icon>
        <span>新增</span>
      </el-button>
      <el-button type="danger" plain :disabled="isDisableDelete" @click="deleteSelectedProduct">
        <el-icon><Delete /></el-icon>
        <span>删除</span>
      </el-button>
    </div>
    <el-table ref="table" v-loading="tableLoading" :data="tableData" row-key="id" @selection-change="selectChange">
      <el-table-column type="selection" />
      <el-table-column prop="id" label="商品编号" />
      <el-table-column prop="name" label="商品名称" />
      <el-table-column prop="subTitle" label="小标题" />
      <el-table-column prop="categoryName" label="分类" />
      <el-table-column prop="originalPrice" label="原价">
        <template #default="scope">
          {{ parsePrice(scope.row.originalPrice) }}元
        </template>
      </el-table-column>
      <el-table-column prop="promotePrice" label="优惠价">
        <template #default="scope">
          {{ parsePrice(scope.row.promotePrice) }}元
        </template>
      </el-table-column>
      <el-table-column prop="stock" label="库存" />
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <div class="operation-cell">
            <el-button type="primary" link @click="openEditProductDialog(scope.row)">
              <el-icon><Edit /></el-icon>
              <span>编辑</span>
            </el-button>
            <el-button type="danger" link @click="deleteProduct([scope.row.id])">
              <el-icon><Delete /></el-icon>
              <span>删除</span>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <PaginationComponent
      v-model:nowPage="nowPage"
      v-model:pageSize="pageSize"
      :total="total"
      @get-table-data="getTableData"
    />
    <!-- 编辑商品组件 -->
    <!-- <EditProductComponent ref="editDialog" @get-table-data="getTableData" /> -->
    <!-- 新增商品组件 -->
    <!-- <AddProductComponent ref="addDialog" @get-table-data="getTableData" /> -->
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus';
import PaginationComponent from '@/components/utils/PaginationComponent.vue';
import { getProductList, deleteProduct } from '@/api/product';
import { parseBalance } from '@/utils/util';
// import AddProductComponent from '@/components/content/product/AddProductComponent.vue';
// import EditProductComponent from '@/components/content/product/EditProductComponent.vue';

export default {
  data() {
    return {
      //当前页数
      nowPage: 1,
      //一页显示多少条数据
      pageSize: 10,
      form: {
        //分类 id
        categoryId: null,
        //商品名称
        name: ""
      },
      //表格是否加载中
      tableLoading: false,
      //一共几条数据
      total: 0,
      //表格数据
      tableData: [],
      //是否禁用最上方的删除按钮
      isDisableDelete: true
    };
  },
  methods: {
    /**
     * 获取表格数据
     */
    getTableData() {
      this.tableLoading = true;
      getProductList(this.nowPage, this.pageSize, this.form).then((response) => {
        if (response != null) {
          this.tableData = response.data.rows;
          this.total = parseInt(response.data.total);
          this.tableLoading = false;
        }
      });
    },
    /**
     * 打开新增商品对话框
     */
    openAddProductDialog() {
      this.$refs['addDialog'].openAddProductDialog();
    },
    /**
     * 打开编辑商品对话框
     */
    openEditProductDialog(data) {
      this.$refs['editDialog'].openEditProductDialog(data);
    },
    /**
     * 删除商品
     */
    deleteProduct(ids) {
      ElMessageBox.confirm(
        `确定要删除选中的商品吗？`,
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        //确认
        deleteProduct(ids).then((response) => {
          if (response != null) {
            ElMessage.success("删除成功");
            //刷新数据
            this.getTableData();
          }
        });
      }).catch(() => {
        //取消
      });
    },
    /**
     * 删除选中的商品
     */
    deleteSelectedProduct() {
      let selectedList = this.$refs['table'].getSelectionRows();
      let ids = [];
      selectedList.forEach(article => {
        ids.push(article.id);
      });
      this.deleteProduct(ids);
    },
    /**
     * 表格的选择项发生改变时触发
     */
    selectChange() {
      let selectedList = this.$refs['table'].getSelectionRows();
      if(selectedList.length > 0) {
        this.isDisableDelete = false;
      } else {
        this.isDisableDelete = true;
      }
    },
    /**
     * 解析价格
     */
    parsePrice(balance) {
      return parseBalance(balance);
    }
  },
  mounted() {
    this.getTableData();
  },
  components: { PaginationComponent }
}
</script>

<style lang="scss" scoped>
.operation-cell {
  display: flex;
  flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  .el-button {
    margin-left: 5px;
    margin-right: 5px;
  }
}
</style>