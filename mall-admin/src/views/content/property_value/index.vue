<template>
  <div>
    <el-form inline :model="form" :rules="rule" ref="search">
      <el-form-item prop="productId" label="所属商品 id">
        <el-input v-model="form.productId" placeholder="请输入所属商品 id" clearable></el-input>
      </el-form-item>
      <el-form-item prop="propertyId" label="所属属性 id">
        <el-input v-model="form.propertyId" placeholder="请输入所属属性 id" clearable></el-input>
      </el-form-item>
      <el-form-item label="值">
        <el-input v-model="form.value" placeholder="请输入值" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">
          <el-icon><Search /></el-icon>
          <span>搜索</span>
        </el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" plain @click="openAddPropertyValueDialog">
        <el-icon><Plus /></el-icon>
        <span>新增</span>
      </el-button>
      <el-button type="danger" plain :disabled="isDisableDelete" @click="deleteSelectedPropertyValue">
        <el-icon><Delete /></el-icon>
        <span>删除</span>
      </el-button>
    </div>
    <el-table ref="table" v-loading="tableLoading" :data="tableData" @selection-change="selectChange">
      <el-table-column type="selection" />
      <el-table-column prop="id" label="属性值编号" />
      <el-table-column prop="productId" label="所属商品编号" />
      <el-table-column prop="propertyId" label="所属属性编号" />
      <el-table-column prop="value" label="值" />
      <el-table-column fixed="right" label="操作" width="200px">
        <template #default="scope">
          <div class="operation-cell">
            <el-button type="primary" text @click="openEditPropertyValueDialog(scope.row)">
              <el-icon><Edit /></el-icon>
              <span>编辑</span>
            </el-button>
            <el-button type="danger" text @click="deletePropertyValue([scope.row.id])">
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
    <EditPropertyValueComponent ref="editDialog" @get-table-data="getTableData" />
    <AddPropertyValueComponent ref="addDialog" @get-table-data="getTableData" />
  </div>
</template>

<script>
import { getPropertyValueList, deletePropertyValue } from '@/api/property_value';
import PaginationComponent from '@/components/utils/PaginationComponent.vue';
import EditPropertyValueComponent from '@/components/content/property_value/EditPropertyValueComponent.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import AddPropertyValueComponent from '@/components/content/property_value/AddPropertyValueComponent.vue';

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
        //所属商品 id
        productId: null,
        //所属属性 id
        propertyId: null,
        //值
        value: ""
      },
      //表格数据
      tableData: [],
      tableLoading: true,
      isDisableDelete: true,
      rule: {
        productId: [
          { 
            validator: (rule, value, callback) => {
              if(value == null || value == "") {
                callback();
              } else if(/^[1-9]\d*$/.test(value)) {
                callback();
              } else {
                callback(new Error("id 不合法"));
              }
            },
            trigger: 'blur' 
          }
        ],
        propertyId: [
          { 
            validator: (rule, value, callback) => {
              if(value == null || value == "") {
                callback();
              } else if(/^[1-9]\d*$/.test(value)) {
                callback();
              } else {
                callback(new Error("id 不合法"));
              }
            },
            trigger: 'blur' 
          }
        ]
      }
    };
  },
  methods: {
    /**
     * 获取表格数据
     */
    getTableData() {
      this.tableLoading = true;
      getPropertyValueList(this.nowPage, this.pageSize, this.form).then((response) => {
        if (response != null) {
          this.tableData = response.data.rows;
          this.total = parseInt(response.data.total);
          this.tableLoading = false;
        }
      });
    },
    /**
     * 打开新增属性值对话框
     */
    openAddPropertyValueDialog() {
      this.$refs['addDialog'].openAddPropertyValueDialog();
    },
    /**
     * 打开编辑属性值对话框
     */
    openEditPropertyValueDialog(data) {
      this.$refs['editDialog'].openEditPropertyValueDialog(data);
    },
    /**
     * 删除属性值
     */
    deletePropertyValue(ids) {
      ElMessageBox.confirm(
        '确定要删除选中的属性值吗？',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        //确认
        deletePropertyValue(ids).then((response) => {
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
     * 删除选中的属性值
     */
    deleteSelectedPropertyValue() {
      let selectedList = this.$refs['table'].getSelectionRows();
      let ids = [];
      selectedList.forEach(property_value => {
        ids.push(property_value.id);
      });
      this.deletePropertyValue(ids);
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
     * 搜索
     */
    search() {
      this.$refs["search"].validate((vali) => {
        if (vali) {
          this.getTableData();
        }
      });
    }
  },
  mounted() {
    this.getTableData();
  },
  components: {
    PaginationComponent,
    EditPropertyValueComponent,
    AddPropertyValueComponent
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