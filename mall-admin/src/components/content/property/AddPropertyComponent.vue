<template>
  <PropertyDialog
    v-model:dialogDataProp="addPropertyData"
    v-model:isShow="showAddPropertyDialog"
    :isLoading="dialogLoading"
    :isDisableForm="isDisableAddPropertyForm"
    :isAddProperty="true"
    @confirm-property-dialog="saveAddPropertyDialog"
  />
</template>

<script>
import PropertyDialog from '@/components/content/property/PropertyDialog.vue';
import { addProperty } from "@/api/property";
import { ElMessage } from 'element-plus';

export default {
  name: "AddPropertyComponent",
  emits: [
    'getTableData'
  ],
  expose: [
    'openAddPropertyDialog'
  ],
  data() {
    return {
      //用于新增属性的对象
      addPropertyData: {
        //属性所属分类 id
        categoryId: "",
        //属性名称
        name: "",
      },
      //对话框是否在加载
      dialogLoading: false,
      //是否显示新增属性对话框
      showAddPropertyDialog: false,
      //是否禁用新增属性表单
      isDisableAddPropertyForm: false
    }
  },
  methods: {
    /**
     * 打开新增属性对话框
     */
    openAddPropertyDialog() {
      this.showAddPropertyDialog = true;
      this.isDisableForm = false;
    },
    /**
     * 添加属性
     */
    saveAddPropertyDialog() {
      this.isDisableAddPropertyForm = true;
      addProperty(this.addPropertyData).then((response) => {
        if (response != null) {
          //关闭对话框
          this.showAddPropertyDialog = false;
          ElMessage.success("新增成功");
          //刷新数据
          this.$emit("getTableData");
        }
      }).finally((error) => {
        this.isDisableAddPropertyForm = false;
      });
    }
  },
  components: { PropertyDialog }
}
</script>

<style lang="scss" scoped></style>