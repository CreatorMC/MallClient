<template>
  <div class="container">
    <el-menu class="bar-container" mode="horizontal" :default-active="$route.path" :ellipsis="false" router>
      <el-menu-item index="">亲，请登录</el-menu-item>
      <el-menu-item index="">免费注册</el-menu-item>
      <div class="flex-grow" />
      <el-sub-menu index="" popper-class="custom-menu-popper">
        <template #title>我的淘金</template>
        <el-menu-item index="">已买到的宝贝</el-menu-item>
        <el-menu-item index="">我的足迹</el-menu-item>
      </el-sub-menu>
      <el-menu-item index=""><IconSVGComponent class="icon" name="icon-gouwuchefill" />购物车</el-menu-item>
      <el-menu-item index=""><IconSVGComponent class="icon" name="icon-biaoxingfill" />收藏夹</el-menu-item>
      <el-menu-item index="">商品分类</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import IconSVGComponent from '@/components/utils/IconSVGComponent.vue';

export default {
    name: "TopBarComponent",
    data() {
        return {};
    },
    methods: {},
    mounted() {
    },
    components: { IconSVGComponent }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}

.bar-container {
  width: $mainWidth;
  height: 100%;
  margin: auto;
  border-bottom: 0px !important;
  background-color: unset;
  > li,li :deep(.el-sub-menu__title){
    font-size: 12px;
  }
  > li:hover{
    color: red !important;
    background-color: unset !important;
  }
  > li:hover :deep(.el-sub-menu__title) {
    color: red !important;
  }
  > li:focus {
    color: red !important;
    background-color: unset !important;
  }
  > li.is-active {
    background: unset !important;
  }
}

.flex-grow {
  flex-grow: 1;
}

.icon {
  margin-right: 5px
}
</style>