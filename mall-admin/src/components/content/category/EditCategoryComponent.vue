<template>
  <CategoryDialog
    v-model:dialogDataProp="dialogData"
    v-model:isShow="isShowDialog"
    :isLoading="isLoading"
    :isDisableForm="isDisableForm"
    @confirm-category-dialog="saveEditCategoryDialog"
  />
</template>

<script>
import CategoryDialog from "@/components/content/category/CategoryDialog.vue"
import { getCategory, updateCategory } from "@/api/category";
import { ElMessage } from "element-plus";

export default {
  name: "EditCategoryComponent",
  emits: [
    'getTableData'
  ],
  expose: [
    'openEditCategoryDialog'
  ],
  data() {
    return {
      dialogData: {
      },
      //是否显示对话框
      isShowDialog: false,
      //对话框数据是否正在加载
      isLoading: false,
      //是否禁用表单
      isDisableForm: false,
    }
  },
  methods: {
    /**
     * 打开编辑分类对话框
     */
    openEditCategoryDialog(data) {
      this.isShowDialog = true;
      this.isDisableForm = false;
      //对话框显示加载动画
      this.isLoading = true;
      //获取数据
      getCategory(data.id).then((response) => {
        if(response != null) {
          this.dialogData = response.data;
          //取消加载动画
          this.isLoading = false;
        }
      });
    },
    /**
     * 更新分类信息
     */
    saveEditCategoryDialog() {
      this.isDisableForm = true;
      updateCategory(this.dialogData).then((response) => {
        if(response != null) {
          //关闭对话框
          this.isShowDialog = false;
          ElMessage.success("更新成功");
          //刷新数据
          this.$emit("getTableData");
        }
      }).finally(() => {
        this.isDisableForm = false;
      });
    }
  },
  components: {
    CategoryDialog
  }
}
</script>

<style lang="scss" scoped>
</style>