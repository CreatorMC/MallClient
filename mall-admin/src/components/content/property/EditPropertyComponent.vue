<template>
  <PropertyDialog
    v-model:dialogDataProp="dialogData"
    v-model:isShow="isShowDialog"
    :isLoading="isLoading"
    :isDisableForm="isDisableForm"
    @confirm-property-dialog="saveEditPropertyDialog"
  />
</template>

<script>
import PropertyDialog from "@/components/content/property/PropertyDialog.vue"
import { getProperty, updateProperty } from "@/api/property";
import { ElMessage } from "element-plus";

export default {
  name: "EditPropertyComponent",
  emits: [
    'getTableData'
  ],
  expose: [
    'openEditPropertyDialog'
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
     * 打开编辑属性对话框
     */
    openEditPropertyDialog(data) {
      this.isShowDialog = true;
      this.isDisableForm = false;
      //对话框显示加载动画
      this.isLoading = true;
      //获取数据
      getProperty(data.id).then((response) => {
        if(response != null) {
          this.dialogData = response.data;
          //取消加载动画
          this.isLoading = false;
        }
      });
    },
    /**
     * 更新属性信息
     */
    saveEditPropertyDialog() {
      this.isDisableForm = true;
      updateProperty(this.dialogData).then((response) => {
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
    PropertyDialog
  }
}
</script>

<style lang="scss" scoped>
</style>