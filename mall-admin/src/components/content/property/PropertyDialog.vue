<template>
  <BaseDialogComponent
    v-model="showDialog"
    :isAdd="isAddProperty"
    addText="新增属性"
    editText="编辑属性"
    :confirm="yes"
    :disableConfirmButton="isLoading"
    @closed="beforeClose">
    <el-form v-loading="isLoading" :model="dialogData" ref="dialogData" :rules="rule" label-width="100px" size="large" :disabled="isDisableForm">
      <el-form-item required prop="categoryId" label="所属分类">
        <el-select style="width: 100%;" v-model="dialogData.categoryId" placeholder="请选择所属分类" :loading="isLoadingCategory">
          <el-option v-for="item in categoryList" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="name" label="属性名称">
        <el-input v-model="dialogData.name" placeholder="请输入属性名称"></el-input>
      </el-form-item>
    </el-form>
  </BaseDialogComponent>
</template>

<script>
import BaseDialogComponent from '@/components/utils/BaseDialogComponent.vue';
import { getAllCategory } from "@/api/category"

export default {
  name: "PropertyDialog",
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
    isAddProperty: false,            //是否是新增属性
  },
  emits: [
    'confirmPropertyDialog',
    'update:isShow',
    'update:dialogDataProp'
  ],
  data() {
    return {
      rule: {
        categoryId: [
          { 
            validator: (rule, value, callback) => {
              if(value == null || value == "") {
                callback(new Error("请选择分类"));
              } else {
                callback();
              }
            },
            trigger: 'blur' 
          }
        ],
        name: [
          {
            required: true,
            message: '属性名称不能为空',
            trigger: 'blur'
          }
        ]
      },
      //分类对象列表
      categoryList: [
        {
          "id": "",
          "name": ""
        }
      ],
      isLoadingCategory: true,
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
          this.$emit("confirmPropertyDialog");
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
  mounted() {
    //查询所有分类，显示到选择商品分类下拉框中
    getAllCategory().then((response) => {
      if(response != null) {
        this.categoryList = response.data;
        this.isLoadingCategory = false;
      }
    });
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