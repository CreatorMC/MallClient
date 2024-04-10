<template>
  <div style="min-height: 500px;">
    <el-result
      icon="success"
      title="支付成功"
      sub-title="支付成功，等待商品发货，请注意关注订单信息"
    >
      <template #extra>
        <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script>
export default {
  props: [
    'modelValue'
  ],
  emits: ['update:modelValue'],
  data() {
    return {

    }
  },
  mounted() {
    this.stepIndex = 2;
  },
  computed: {
    stepIndex: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>