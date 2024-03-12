<template>
  <div>
    <div class="seat"></div>
    <el-container class="container">
      <el-main>
        <div class="top">
          <div>
            <img src="/img/logo.png" alt="logo">
          </div>
          <div class="container-search">
            <div class="search-icon">
              <el-icon>
                <Search />
              </el-icon>
            </div>
            <el-input
              v-model="searchText"
              placeholder="搜索商品"
              class="input-search"
            >
            </el-input>
            <div class="search-button">
              <el-button type="success" round>搜索</el-button>
            </div>
          </div>
        </div>
      </el-main>
      <el-main class="body">
        <div class="category-container space">
          <h2>分类</h2>
          <ul>
            <el-scrollbar height="328px">
              <li>女装</li>
              <li>女装</li>
              <li>女装</li>
              <li>女装</li>
              <li>女装</li>
              <li>女装</li>
              <li>女装</li>
              <li>女装</li>
            </el-scrollbar>
          </ul>
        </div>
        <div class="banner-container space">
          <div class="banner">
            <el-carousel trigger="click" height="315px">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="notice">
            <p><el-tag type="danger">规则</el-tag><span>2024年1月淘金重要新规速递</span></p>
          </div>
        </div>
        <div class="user-container">
          <div class="user-top">
            <el-avatar class="user-top-avatar" :size="60" src="https://empty">
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
            <span class="user-name">Hi! 你好</span>
          </div>
          <div class="user-operation">
            <el-button type="primary" round size="large">登录</el-button>
            <el-button type="success" round size="large">注册</el-button>
          </div>
          <div class="user-after">
            <div>
              <div class="icon"><IconSVGComponent name="icon-biaoxingfill" /></div>
              <div>宝贝收藏</div>
            </div>
            <div>
              <div class="icon"><IconSVGComponent name="icon-biaoxingfill" /></div>
              <div>已购商品</div>
            </div>
            <div>
              <div class="icon"><IconSVGComponent name="icon-biaoxingfill" /></div>
              <div>我的足迹</div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import IconSVGComponent from '@/components/utils/IconSVGComponent.vue';
export default {
  data() {
    return {
      searchText: ""
    };
  },
  methods: {},
  mounted() {
  },
  components: { IconSVGComponent }
}
</script>

<style lang="scss" scoped>
.container {
  width: $mainWidth;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  font: 12px/1.5 tahoma, arial, 'Hiragino Sans GB', '\5b8b\4f53', sans-serif;
}

@media screen and (max-width: 1200px) {
  .container {
    width: 990px;
  }
  .category-container {
    display: none;
  }
}

.top {
  display: flex;
  align-items: center;
  img {
    width: 142px;
    margin-left: 22px;
  }
}

.container-search {
  display: flex;
  width: 738px;
  height: 38px;
  margin-left: 50px;
  .search-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 65px;
    color: #f86000;
    border-radius: var(--el-border-radius-round) 0px 0px var(--el-border-radius-round);
    background-color: var(--el-input-bg-color,var(--el-fill-color-blank));
    border-left: 2px #f86000 solid;
    border-top: 2px #f86000 solid;
    border-bottom: 2px #f86000 solid;
  }
  .search-button {
    border-radius: 0px var(--el-border-radius-round) var(--el-border-radius-round) 0px;
    background-color: var(--el-input-bg-color,var(--el-fill-color-blank));
    padding-top: 2px;
    padding-bottom: 2px;
    padding-right: 2px;
    width: 74px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 2px #f86000 solid;
    border-top: 2px #f86000 solid;
    border-bottom: 2px #f86000 solid;
    button {
      width: 100%;
      height: fit-content;
    }
  }
  .input-search {
    width: 100%;
    border-top: 2px #f86000 solid;
    border-bottom: 2px #f86000 solid;
    :deep(.el-input__wrapper) {
      box-shadow: none;
      border-radius: 0px;
      padding: 0px;
    }
  }
}

.body {
  border-radius: 15px;
  background-color: var(--el-input-bg-color,var(--el-fill-color-blank));
  display: flex;
}

.category-container {
  border-radius: 15px;
  flex: 1;
  background-color: #F7F9FA;
  height: 368px;
  overflow: hidden;
  h2 {
    margin: 0px;
    padding: 16px 0 0 20px;
    font-size: 18px;
    color: #111;
    letter-spacing: 0;
    line-height: 24px;
  }
  ul {
    padding: 16px 0 8px 20px;
    margin-top: 0px;
  }
  li {
    overflow: hidden;
    line-height: 20px;
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 18px;
    color: #666;
    list-style: inside;
  }
  li:hover {
    color: red;
    text-decoration: underline;
  }
}

.banner-container {
  width: 564px;
  overflow: hidden;
  .banner {
    border-radius: 15px;
    height: fit-content;
    overflow: hidden;
  }
  .notice {
    margin-top: 10px;
    height: calc(100% - 315px - 10px);
    border-radius: 15px;
    overflow: hidden;
    background-color: #F7F9FA;
    display: flex;
    align-items: center;
    p {
      margin-block-start: 0px;
      margin-block-end: 0px;
      margin-left: 10px;
      margin-right: 10px;
      color: #666;
      font-size: 12px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
}

.user-container {
  flex: 1;
  border-radius: 15px;
  background-color: #F7F9FA;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .user-top {
    .user-top-avatar {
      display: block;
      margin: 32px auto 0px;
    }
    .user-name {
      display: block;
      margin-top: 22px;
      height: 24px;
      line-height: 24px;
      font-size: 16px;
      text-align: center;
    }
  }
  .user-operation {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .user-after {
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: #666;
    .icon {
      font-size: 24px;
      text-align: center;
    }
  }
}

.space {
  margin-right: 10px;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>