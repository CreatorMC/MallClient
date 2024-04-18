<template>
  <div style="padding-bottom: 40px">
    <TopSearchComponent />
    <el-main class="container">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-menu
            class="menu"
            :default-active="$route.path"
            router
          >
            <el-menu-item index="/index/user/user-home">
              <span>首页</span>
            </el-menu-item>
            <el-sub-menu index="">
              <template #title>
                <span>账号管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/index/user/information">个人资料</el-menu-item>
                <el-menu-item index="2-2">修改密码</el-menu-item>
                <el-menu-item index="2-3">收货地址</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item index="3">
              <span>订单管理</span>
            </el-menu-item>
            <el-menu-item index="4">
              <span>我的足迹</span>
            </el-menu-item>
            <el-menu-item index="/index/cart">
              <span>我的购物车</span>
            </el-menu-item>
            <el-menu-item index="6">
              <span>我的收藏</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20">
          <router-view></router-view>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import TopSearchComponent from '@/components/content/TopSearchComponent.vue';
export default {
  data() {
    return {};
  },
  components: { TopSearchComponent }
}
</script>

<style lang="scss" scoped>
.container {
  width: $mainWidth;
  border-radius: 24px;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  min-height: 500px;
  .menu {
    min-height: 500px;
  }
}
</style>