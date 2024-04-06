<template>
  <div>
    <div class="title">
      <span>确认收货地址</span>
      <div style="flex-grow: 1;"></div>
      <el-button link type="primary">管理收货地址</el-button>
    </div>
    <div class="address-container">
      <el-radio-group size="large" v-model="address">
        <el-radio v-for="item in 5" :label="item" border>
          <div class="text">djsagkdhasgdhkjasgdhjasgkhjdghaskgdhjaskgdhjasghdj</div>
          <el-tag style="margin-left: 10px;" type="danger">默认地址</el-tag>
          <div style="flex-grow: 1;"></div>
          <el-button v-show="item == address" link type="danger">修改本地址</el-button>
        </el-radio>
      </el-radio-group>
      <div>
        <el-button type="primary">新增地址</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: 1
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  font-weight: bold;
  line-height: 32px;
  border-bottom: 2px solid #f1f1f1;
  margin-bottom: 10px;
}
.address-container {
  :deep(.el-radio-group) {
    flex-direction: column;
    align-items: unset;
    width: 100%;
  }
  :deep(.el-radio) {
    width: 100%;
    height: max-content;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
  :deep(.el-radio:last-child) {
    margin-right: 32px;
  }
  :deep(.el-radio__label) {
    display: flex;
    width: 100%;
    align-items: center;
  }
  .text {
    white-space: normal;
  }
}
</style>