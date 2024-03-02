<template>
  <div>
    <el-form inline label-width="80px">
      <el-form-item label="所属分类">
        <el-select v-model="form.categoryId" placeholder="请选择所属分类" :loading="isLoadingCategory" clearable>
          <el-option v-for="item in categoryList" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="属性名称">
        <el-input v-model="form.name" placeholder="请输入属性名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getTableData">
          <el-icon><Search /></el-icon>
          <span>搜索</span>
        </el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" plain @click="openAddPropertyDialog">
        <el-icon><Plus /></el-icon>
        <span>新增</span>
      </el-button>
      <el-button type="danger" plain :disabled="isDisableDelete" @click="deleteSelectedProperty">
        <el-icon><Delete /></el-icon>
        <span>删除</span>
      </el-button>
    </div>
    <el-table ref="table" v-loading="tableLoading" :data="tableData" @selection-change="selectChange">
      <el-table-column type="selection" />
      <el-table-column prop="id" label="属性编号" />
      <el-table-column prop="name" label="属性名称" />
      <el-table-column prop="categoryId" label="属性所属分类">
        <template #default="scope">
          {{ scope.row != null && categoryList != null && scope.row.categoryId != null ? resolveCategoryId(scope.row.categoryId) : "" }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200px">
        <template #default="scope">
          <div class="operation-cell">
            <el-button type="primary" text @click="openEditPropertyDialog(scope.row)">
              <el-icon><Edit /></el-icon>
              <span>编辑</span>
            </el-button>
            <el-button type="danger" text @click="deleteProperty([scope.row.id])">
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
    <EditPropertyComponent ref="editDialog" @get-table-data="getTableData" />
    <AddPropertyComponent ref="addDialog" @get-table-data="getTableData" />
  </div>
</template>

<script>
import { getPropertyList, deleteProperty } from '@/api/property';
import { getAllCategory } from "@/api/category"
import PaginationComponent from '@/components/utils/PaginationComponent.vue';
import EditPropertyComponent from '@/components/content/property/EditPropertyComponent.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import AddPropertyComponent from '@/components/content/property/AddPropertyComponent.vue';

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
        //属性所属分类 id
        categoryId: "",
        //属性名称
        name: ""
      },
      //表格数据
      tableData: [],
      tableLoading: true,
      isDisableDelete: true,
      //分类对象列表
      categoryList: [
        {
          "id": "",
          "name": ""
        }
      ],
      isLoadingCategory: true,
    };
  },
  methods: {
    /**
     * 获取表格数据
     */
    getTableData() {
      this.tableLoading = true;
      getPropertyList(this.nowPage, this.pageSize, this.form).then((response) => {
        if (response != null) {
          this.tableData = response.data.rows;
          this.total = parseInt(response.data.total);
          this.tableLoading = false;
        }
      });
    },
    /**
     * 打开新增属性对话框
     */
    openAddPropertyDialog() {
      this.$refs['addDialog'].openAddPropertyDialog();
    },
    /**
     * 打开编辑属性对话框
     */
    openEditPropertyDialog(data) {
      this.$refs['editDialog'].openEditPropertyDialog(data);
    },
    /**
     * 删除属性
     */
    deleteProperty(ids) {
      ElMessageBox.confirm(
        '确定要删除选中的属性吗？',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        //确认
        deleteProperty(ids).then((response) => {
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
     * 删除选中的属性
     */
    deleteSelectedProperty() {
      let selectedList = this.$refs['table'].getSelectionRows();
      let ids = [];
      selectedList.forEach(property => {
        ids.push(property.id);
      });
      this.deleteProperty(ids);
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
    },
    /**
     * 解析分类 id 到分类名
     */
    resolveCategoryId(categoryId) {
      for(let i = 0; i < this.categoryList.length; i++) {
        if(categoryId == this.categoryList[i].id) {
          return this.categoryList[i].name;
        }
      }
      return "";
    }
  },
  mounted() {
    this.getTableData();
    //查询所有分类，显示到选择商品分类下拉框中
    getAllCategory().then((response) => {
      if(response != null) {
        this.categoryList = response.data;
        this.isLoadingCategory = false;
      }
    });
  },
  components: {
    PaginationComponent,
    EditPropertyComponent,
    AddPropertyComponent
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