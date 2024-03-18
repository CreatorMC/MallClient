<template>
  <div id="father">
    <div id="header">
      <div class="logo">
        <router-link to="/">
          <img src="/img/logo.png" alt="">
        </router-link>
      </div>
    </div>
    <div id="container">
      <div class="login-newbg"></div>
      <div class="content-layout">
        <div class="login-box-warp">
          <LoginComponent v-if="showIndex == 0" @showRegister="showRegister" @showForget="showForget" />
          <RegisterComponent v-else-if="showIndex == 1" @showLogin="showLogin" />
          <ForgetComponent v-else-if="showIndex == 2" @showLogin="showLogin" />
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from '@/components/main/FooterComponent.vue';
import LoginComponent from '@/components/login/LoginComponent.vue';
import RegisterComponent from '@/components/login/RegisterComponent.vue';
import ForgetComponent from '@/components/login/ForgetComponent.vue';

export default {
  data() {
    return {
      // 显示哪个组件
      // 0：登录 1：注册 2：找回密码
      showIndex: 0
    };
  },
  methods: {
    /**
     * 显示注册组件
     */
    showRegister() {
      this.showIndex = 1;
    },
    /**
     * 显示登录组件
     */
    showLogin() {
      this.showIndex = 0;
    },
    /**
     * 显示忘记密码组件
     */
    showForget() {
      this.showIndex = 2;
    }
  },
  mounted() {
    if(this.$route.params.idx[0]) {
      this.showIndex = parseInt(this.$route.params.idx[0]);
      if(this.showIndex < 0 || this.showIndex > 2) {
        this.showIndex = 0;
      }
    }
  },
  components: { FooterComponent, LoginComponent, RegisterComponent, ForgetComponent }
}
</script>

<style lang="scss" scoped>
#father {
  background-color: white;
}

#header {
  padding: 22px 0;
  height: 88px;
  box-sizing: border-box;
  .logo {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    img {
      height: 100%;
    }
  }
}

#container {
  width: 100%;
  position: relative;
  .login-newbg{
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
    width: 100%;
    height: 600px;
    background-image: url("/img/login_bg.jpg");
  }
  .content-layout {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    height: 600px;
    z-index: 100;
    .login-box-warp {
      position: absolute;
      top: 40px;
      right: 60px;
      width: 350px;
      background-color: hsla(0,0%,100%,.9);
      padding: 25px 25px 20px 25px;
    }
  }
}
</style>