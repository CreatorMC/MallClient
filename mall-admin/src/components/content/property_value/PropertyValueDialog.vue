<template>
  <BaseDialogComponent
    v-model="showDialog"
    :isAdd="isAddPropertyValue"
    addText="新增属性值"
    editText="编辑属性值"
    :confirm="yes"
    :disableConfirmButton="isLoading"
    @closed="beforeClose">
    <el-form v-loading="isLoading" :model="dialogData" ref="dialogData" :rules="rule" label-width="100px" size="large" :disabled="isDisableForm">
      <el-form-item required prop="productId" label="所属商品 id">
        <el-input v-model="dialogData.productId" placeholder="请输入所属商品 id"></el-input>
      </el-form-item>
      <el-form-item required prop="propertyId" label="所属属性 id">
        <el-input v-model="dialogData.propertyId" placeholder="请输入所属属性 id"></el-input>
      </el-form-item>
      <el-form-item prop="value" label="值">
        <el-input v-model="dialogData.value" placeholder="请输入值"></el-input>
      </el-form-item>
    </el-form>
  </BaseDialogComponent>
</template>

<script>
import BaseDialogComponent from '@/components/utils/BaseDialogComponent.vue';

export default {
  name: "PropertyValueDialog",
  props: {
    /**
     * 对话框中的数据
     */
    dialogDataProp: {
      type: Object,
      required: true
    },
    isLoading: Boolean,              //对话框是否在加载
    isShow: Boolean,                 //是否显示此对话框
    isDisableForm: Boolean,          //是否禁用表单
    isAddPropertyValue: false,       //是否是新增属性值
  },
  emits: [
    'confirmPropertyValueDialog',
    'update:isShow',
    'update:dialogDataProp'
  ],
  data() {
    return {
      rule: {
        productId: [
          { 
            validator: (rule, value, callback) => {
              if(value == null || value == "") {
                callback(new Error("id 不能为空"));
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
                callback(new Error("id 不能为空"));
              } else if(/^[1-9]\d*$/.test(value)) {
                callback();
              } else {
                callback(new Error("id 不合法"));
              }
            },
            trigger: 'blur' 
          }
        ],
        value: [
          {
            required: true,
            message: '值不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    showDialog: {
      get() {
        return this.isShow;
      },
      set(value) {
        this.$emit('update:isShow', value);
      }
    },
    dialogData: {
      get() {
        return this.dialogDataProp;
      },
      set(value) {
        this.$emit('update:dialogDataProp', value);
      }
    }
  },
  methods: {
    /**
     * 按下确认按钮后
     */
    yes() {
      let that = this;
      this.$refs["dialogData"].validate((vali) => {
        if (vali) {
          this.$emit("confirmPropertyValueDialog");
        }
      });
    },
    /**
     * 对话框关闭前被调用
     */
    beforeClose() {
      this.$refs['dialogData'].resetFields();
    }
  },
  components: {
    BaseDialogComponent
  }
}
</script>

<style lang="scss" scoped>
.inline-container {
  display: flex;
  flex-wrap: wrap;
}

.auto-width {
  flex: 1 0 200px;
}
</style>