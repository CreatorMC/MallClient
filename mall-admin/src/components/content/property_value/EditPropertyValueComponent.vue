<template>
  <PropertyValueDialog
    v-model:dialogDataProp="dialogData"
    v-model:isShow="isShowDialog"
    :isLoading="isLoading"
    :isDisableForm="isDisableForm"
    @confirm-property-value-dialog="saveEditPropertyValueDialog"
  />
</template>

<script>
import PropertyValueDialog from "@/components/content/property_value/PropertyValueDialog.vue"
import { getPropertyValue, updatePropertyValue } from "@/api/property_value";
import { ElMessage } from "element-plus";

export default {
  name: "EditPropertyValueComponent",
  emits: [
    'getTableData'
  ],
  expose: [
    'openEditPropertyValueDialog'
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
     * 打开编辑属性值对话框
     */
    openEditPropertyValueDialog(data) {
      this.isShowDialog = true;
      this.isDisableForm = false;
      //对话框显示加载动画
      this.isLoading = true;
      //获取数据
      getPropertyValue(data.id).then((response) => {
        if(response != null) {
          this.dialogData = response.data;
          //取消加载动画
          this.isLoading = false;
        }
      });
    },
    /**
     * 更新属性值信息
     */
    saveEditPropertyValueDialog() {
      this.isDisableForm = true;
      updatePropertyValue(this.dialogData).then((response) => {
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
    PropertyValueDialog
  }
}
</script>

<style lang="scss" scoped>
</style>