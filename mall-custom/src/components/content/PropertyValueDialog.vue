<template>
  <el-dialog
    v-model="dialogVisible"
    title="商品信息"
    width="500"
    @open="handlerOpenDialog"
    @close="handlerCloseDialog"
  >
  <div>
    <div v-for="item, key in dialogProperty" class="item">
      <div class="value-name">
        {{ item.name }}：
      </div>
      <div>
        <el-radio-group v-model="dialogSpec[key]">
          <el-radio-button v-for="v, k in dialogProperty[key].values" :label="k">
            {{ v }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>
  </div>
  <template #footer>
    <div class="dialog-footer">
      <el-button type="primary" @click="clickConfirm">
        确认
      </el-button>
      <el-button @click="clickCancel">
        取消
      </el-button>
    </div>
  </template>
  </el-dialog>
</template>

<script>
import { shallowEqual } from '@/utils/util';

export default {
  name: 'PropertyValueDialog',
  props: [
    'visible',
    'property',
    'spec',
    //购物车项 id
    'id'
  ],
  emits: [
    'update:visible',
    'update:property',
    'update:spec',
    'confirm'
  ],
  data() {
    return {
      //记录刚打开对话框时的参数，以便在点击取消按钮后恢复
      originalSpec: {},
      //记录退出时是否点击的是确认按钮
      isConfim: false
    };
  },
  methods: {
    clickConfirm() {
      this.isConfim = true;
      this.dialogVisible = false;
      //两个对象不相同才发送确认事件
      if(!shallowEqual(this.dialogSpec, this.originalSpec)) {
        this.$emit('confirm', this.id);
      }
    },
    clickCancel() {
      this.isConfim = false;
      //赋每个 key 的值，不要直接赋引用，因为直接赋值引用会改变 dialogSpec 变量指向的地址。
      Object.keys(this.dialogSpec).forEach(key => {
        this.dialogSpec[key] = this.originalSpec[key];
      });
      this.dialogVisible = false;
    },
    handlerOpenDialog() {
      //刚打开对话框时触发
      //深拷贝
      this.originalSpec = JSON.parse(JSON.stringify(this.dialogSpec));
      //默认 false
      this.isConfim = false;
    },
    handlerCloseDialog() {
      //关闭对话框时触发
      //判断，如果没有点击确定按钮就关闭了对话框，那么需要还原 dialogSpec
      if(!this.isConfim) {
        this.clickCancel();
      }
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit('update:visible', value);
      }
    },
    dialogProperty: {
      get() {
        return this.property;
      },
      set(value) {
        this.$emit('update:property', value);
      }
    },
    dialogSpec: {
      get() {
        return this.spec;
      },
      set(value) {
        this.$emit('update:spec', value);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 14px;
  .value-name {
    min-width: 50px;
    font-size: 14px;
    color: var(--el-text-color-secondary);
  }
  :deep(.el-radio-button__inner) {
    border-left: var(--el-border);
    border-right: var(--el-border);
    border-radius: var(--el-border-radius-base);
  }
  :deep(.el-radio-button__original-radio:checked+.el-radio-button__inner) {
    border-color: var(--el-radio-button-checked-border-color,var(--el-color-primary));
  }
  :deep(.el-radio-button) {
    margin-right: 5px;
    margin-bottom: 5px;
  }
}
</style>