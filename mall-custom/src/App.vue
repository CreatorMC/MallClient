<template>
  <div>
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

export default {
  setup() {
    var locale = zhCn;
    return {
      locale
    }
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<!-- 全局样式 -->
<style lang="scss">
html,body{
  width: 100% !important;
  height: 100%;
  overflow: hidden;
  margin: 0;
  background-color: #e1e7e9;
}
#app{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  max-width: none !important;
}
</style>
