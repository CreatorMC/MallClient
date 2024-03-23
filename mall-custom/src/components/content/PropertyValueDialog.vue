<template>
  <el-dialog
    v-model="dialogVisible"
    title="商品信息"
    width="500"
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
      <el-button type="primary" @click="dialogVisible = false">
        确认
      </el-button>
    </div>
  </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'PropertyValueDialog',
  props: [
    'visible',
    'property',
    'spec'
  ],
  emits: [
    'update:visible',
    'update:property',
    'update:spec'
  ],
  data() {
    return {

    };
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