<template>
  <PropertyValueDialog
    v-model:dialogDataProp="addPropertyValueData"
    v-model:isShow="showAddPropertyValueDialog"
    :isLoading="dialogLoading"
    :isDisableForm="isDisableAddPropertyValueForm"
    :isAddPropertyValue="true"
    @confirm-property-value-dialog="saveAddPropertyValueDialog"
  />
</template>

<script>
import PropertyValueDialog from '@/components/content/property_value/PropertyValueDialog.vue';
import { addPropertyValue } from "@/api/property_value";
import { ElMessage } from 'element-plus';

export default {
  name: "AddPropertyValueComponent",
  emits: [
    'getTableData'
  ],
  expose: [
    'openAddPropertyValueDialog'
  ],
  data() {
    return {
      //用于新增属性值的对象
      addPropertyValueData: {
        //所属商品 id
        productId: "",
        //所属属性 id
        propertyId: "",
        //值
        value: ""
      },
      //对话框是否在加载
      dialogLoading: false,
      //是否显示新增属性值对话框
      showAddPropertyValueDialog: false,
      //是否禁用新增属性值表单
      isDisableAddPropertyValueForm: false
    }
  },
  methods: {
    /**
     * 打开新增属性值对话框
     */
    openAddPropertyValueDialog() {
      this.showAddPropertyValueDialog = true;
      this.isDisableForm = false;
    },
    /**
     * 添加属性值
     */
    saveAddPropertyValueDialog() {
      this.isDisableAddPropertyValueForm = true;
      addPropertyValue(this.addPropertyValueData).then((response) => {
        if (response != null) {
          //关闭对话框
          this.showAddPropertyValueDialog = false;
          ElMessage.success("新增成功");
          //刷新数据
          this.$emit("getTableData");
        }
      }).finally((error) => {
        this.isDisableAddPropertyValueForm = false;
      });
    }
  },
  components: { PropertyValueDialog }
}
</script>

<style lang="scss" scoped></style>