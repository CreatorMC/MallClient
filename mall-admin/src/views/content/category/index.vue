<template>
  <div>
    <el-form inline label-width="80px">
      <el-form-item label="分类名称">
        <el-input v-model="form.name" placeholder="请输入分类名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getTableData">
          <el-icon><Search /></el-icon>
          <span>搜索</span>
        </el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" plain @click="openAddCategoryDialog">
        <el-icon><Plus /></el-icon>
        <span>新增</span>
      </el-button>
      <el-button type="danger" plain :disabled="isDisableDelete" @click="deleteSelectedCategory">
        <el-icon><Delete /></el-icon>
        <span>删除</span>
      </el-button>
    </div>
    <el-table ref="table" v-loading="tableLoading" :data="tableData" @selection-change="selectChange">
      <el-table-column type="selection" />
      <el-table-column prop="id" label="分类编号" />
      <el-table-column prop="name" label="分类名称" />
      <el-table-column fixed="right" label="操作" width="200px">
        <template #default="scope">
          <div class="operation-cell">
            <el-button type="primary" text @click="openEditCategoryDialog(scope.row)">
              <el-icon><Edit /></el-icon>
              <span>编辑</span>
            </el-button>
            <el-button type="danger" text @click="deleteCategory([scope.row.id])">
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
    <EditCategoryComponent ref="editDialog" @get-table-data="getTableData" />
    <AddCategoryComponent ref="addDialog" @get-table-data="getTableData" />
  </div>
</template>

<script>
import { getCategoryList, deleteCategory } from '@/api/category';
import PaginationComponent from '@/components/utils/PaginationComponent.vue';
import EditCategoryComponent from '@/components/content/category/EditCategoryComponent.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import AddCategoryComponent from '@/components/content/category/AddCategoryComponent.vue';

export default {
  data() {
    return {
      //当前页
      nowPage: 1,
      //一页几条数据
      pageSize: 10,
      //总共多少条数据
      total: 0,
      form: {
        //分类名称
        name: ""
      },
      //表格数据
      tableData: [],
      tableLoading: true,
      isDisableDelete: true,
    };
  },
  methods: {
    /**
     * 获取表格数据
     */
    getTableData() {
      this.tableLoading = true;
      getCategoryList(this.nowPage, this.pageSize, this.form).then((response) => {
        if (response != null) {
          this.tableData = response.data.rows;
          this.total = parseInt(response.data.total);
          this.tableLoading = false;
        }
      });
    },
    /**
     * 打开新增分类对话框
     */
    openAddCategoryDialog() {
      this.$refs['addDialog'].openAddCategoryDialog();
    },
    /**
     * 打开编辑分类对话框
     */
    openEditCategoryDialog(data) {
      this.$refs['editDialog'].openEditCategoryDialog(data);
    },
    /**
     * 删除分类
     */
    deleteCategory(ids) {
      ElMessageBox.confirm(
        '确定要删除选中的分类吗？',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        //确认
        deleteCategory(ids).then((response) => {
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
     * 删除选中的分类
     */
    deleteSelectedCategory() {
      let selectedList = this.$refs['table'].getSelectionRows();
      let ids = [];
      selectedList.forEach(category => {
        ids.push(category.id);
      });
      this.deleteCategory(ids);
    },
    /**
     * 表格的选择项发生改变时触发
     */
    selectChange() {
      let selectedList = this.$refs['table'].getSelectionRows();
      if (selectedList.length > 0) {
        this.isDisableDelete = false;
      } else {
        this.isDisableDelete = true;
      }
    }
  },
  mounted() {
    this.getTableData();
  },
  components: {
    PaginationComponent,
    EditCategoryComponent,
    AddCategoryComponent
  }
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