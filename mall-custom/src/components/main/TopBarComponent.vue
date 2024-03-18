<template>
  <div class="container">
    <el-menu class="bar-container" mode="horizontal" :default-active="$route.path" :ellipsis="false" router>
      <el-menu-item v-if="!isLogin" index="/login">亲，请登录</el-menu-item>
      <el-menu-item v-if="!isLogin" index="/login/1">免费注册</el-menu-item>
      <el-sub-menu v-else index="/" popper-class="custom-menu-popper custom-menu-popper-center">
        <template #title>{{ nickName }}</template>
        <div>
          <el-avatar class="user-top-avatar" :size="60" :src="(avatar != null && avatar != '') ? avatar : '/img/default_head.png'">
            <img
              src="/img/default_fail_pic.png"
            />
          </el-avatar>
          <div style="font-weight: bold; max-width: 200px;">{{ nickName }}</div>
        </div>
        <el-menu-item index="">个人中心</el-menu-item>
        <el-menu-item index="" @click="logout">退出登录</el-menu-item>
      </el-sub-menu>
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
import { userStore } from '@/store/user';
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { logout } from '@/api/login';
import router from '@/router';

export default {
  name: "TopBarComponent",
  setup() {
    const store = userStore();
    //创建响应式的头像变量
    var avatar = ref("");
    var nickName = ref("");
    var id = ref("");
    avatar.value = store.user.avatar;
    nickName.value = store.user.nickName;
    id.value = store.user.id;
    //订阅pinia的userStore产生的变化，发生变化时重新给响应式对象赋值
    store.$subscribe((mutation, state) => {
      avatar.value = state.user.avatar;
      nickName.value = state.user.nickName;
      id.value = store.user.id;
    });
    return {
      avatar,   //头像链接
      nickName, //昵称
      id        //用户id，用于判断有没有登录
    }
  },
  data() {
    return {
    };
  },
  methods: {
    logout() {
      ElMessageBox.confirm(
        '确定要退出登录吗？',
        '提示', 
        {
          type: 'warning'
        }
      ).then(() => {
        logout().then((response) => {
          if(response != null) {
            ElMessage.success("退出成功");
            localStorage.removeItem("token");
            router.push("/login");
            const store = userStore();
            //恢复store状态到初始值
            store.$reset();
            sessionStorage.clear();
          }
        })
      })
    }
  },
  mounted() {
  },
  computed: {
    //是否已登录
    isLogin() {
      return this.id != null && this.id != "";
    }
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