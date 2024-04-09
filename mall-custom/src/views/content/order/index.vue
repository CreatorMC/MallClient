<template>
  <div style="background-color: white;">
    <div class="top-step-container">
      <div class="main">
        <router-link to="/">
          <img src="/img/logo.png" alt="首页">
        </router-link>
        <div class="flex-grow" />
        <el-steps style="width: 800px;" :active="stepIndex" finish-status="success" align-center>
          <el-step title="提交订单" />
          <el-step title="支付" />
          <el-step title="确认收货" />
        </el-steps>
      </div>
    </div>
    <div class="container">
      <router-view v-slot="{ Component }">
        <component :is="Component" v-model="stepIndex" />
      </router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stepIndex: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.top-step-container {
  width: 100%;
  height: 80px;
  background: white;
  .main {
    display: flex;
    width: $mainWidth;
    margin: 0 auto;
    height: 100%;
    > a, > div {
      margin: auto 0;
    }
    a {
      text-decoration: none;
      height: fit-content;
      img {
        height: 53px;
      }
    }
  }
}

.flex-grow {
  flex-grow: 1;
}

.container {
  width: $mainWidth;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
}
</style>