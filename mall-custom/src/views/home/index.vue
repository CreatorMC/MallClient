<template>
  <div v-infinite-scroll="getProductList">
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
        <div style="display: flex; flex: 1;">
          <div class="category-container space">
            <h2>分类</h2>
            <ul>
              <el-scrollbar height="328px">
                <li v-for="item in categoryList">
                  <router-link :to="`/category/${item.id}`">
                    {{ item.name }}
                  </router-link>
                </li>
              </el-scrollbar>
            </ul>
          </div>
          <div class="banner-container space">
            <div class="banner">
              <el-carousel trigger="click" height="315px">
                <el-carousel-item v-for="item in banners" :key="item">
                  <img style="width: 100%; height: 100%;" :src=item>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="notice">
              <p><el-tag type="danger">规则</el-tag><span>2024年1月淘金重要新规速递</span></p>
            </div>
          </div>
          <div class="user-container">
            <div class="user-top">
              <el-avatar class="user-top-avatar" :size="60" :src="(user.avatar != null && user.avatar != '') ? user.avatar : '/img/default_head.png'">
                <img
                  src="/img/default_fail_pic.png"
                />
              </el-avatar>
              <span class="user-name" v-if="!isLogin">Hi! 你好</span>
              <span class="user-name" v-else>
                <router-link class="link" to="/">
                  Hi! {{ user.nickName }}
                </router-link>
              </span>
            </div>
            <div class="user-operation" v-if="!isLogin">
              <el-button type="primary" round size="large" @click="$router.push('/login')">登录</el-button>
              <el-button type="success" round size="large" @click="$router.push('/login/1')">注册</el-button>
            </div>
            <div class="user-operation" v-else>
              <router-link class="link" to="/">
                <strong>0</strong>
                购物车
              </router-link>
              <router-link class="link" to="/">
                <strong>0</strong>
                待收货
              </router-link>
              <router-link class="link" to="/">
                <strong>0</strong>
                待发货
              </router-link>
              <router-link class="link" to="/">
                <strong>0</strong>
                待付款
              </router-link>
              <router-link class="link" to="/">
                <strong>0</strong>
                待评价
              </router-link>
            </div>
            <div class="user-after">
              <router-link class="link" to="/">
                <div>
                  <div class="icon"><IconSVGComponent name="icon-biaoxing" /></div>
                  <div>宝贝收藏</div>
                </div>
              </router-link>
              <router-link class="link" to="/">
                <div>
                  <div class="icon"><IconSVGComponent name="icon-gouwudai" /></div>
                  <div>已购商品</div>
                </div>
              </router-link>
              <router-link class="link" to="/">
                <div>
                  <div class="icon"><IconSVGComponent name="icon-shizhong" /></div>
                  <div>我的足迹</div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div>
          <h3 class="title">猜你喜欢</h3>
          <el-row style="margin-top: -9px; margin-bottom: -9px;" :gutter="18">
            <el-col style="padding-top: 9px; padding-bottom: 9px;" v-for="item in products" :lg="8" :md="12">
              <ProductItem
                :id="item.id"
                :title="item.name"
                :price="parseBalance(item.promotePrice ? item.promotePrice : item.originalPrice)"
                :originalPrice="item.promotePrice ? parseBalance(item.originalPrice) : null"
                :img="item.thumbnail"
              />
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import IconSVGComponent from '@/components/utils/IconSVGComponent.vue';
import ProductItem from '@/components/content/ProductItem.vue';
import { userStore } from '@/store/user';
import { getCategoryList } from '@/api/category';
import { getProductList, getRecommendedProductList } from '@/api/product';
import { parseBalance } from '@/utils/util';
export default {
  data() {
    return {
      searchText: "",
      banners: [
        '/img/banner_0.jpg',
        '/img/banner_1.jpg'
      ],
      user: {
        avatar: null,
        id: null
      },
      categoryList: [],
      products: [],
      pageNum: 1,
      pageSize: 12,
      //防止重复发送获取同一页商品的请求
      pageLoading: false,
      //如果为 true，即锁住推荐商品的方法，只使用普通的获取分页商品的方法
      lock: false
    };
  },
  methods: {
    /**
     * 获取分类
     */
    getCategoryList() {
      getCategoryList(1, 9, { name: null }).then((response) => {
        if(response != null) {
          this.categoryList = response.data.rows;
        }
      })
    },
    getProductList() {
      if(((this.user.id == null || this.user.id == "") && !this.pageLoading) || this.lock) {
        this.pageLoading = true;
        getProductList(this.pageNum, this.pageSize, { name: null, categoryId: null }).then((response) => {
          if(response != null) {
            this.products = this.products.concat(response.data.rows);
            this.pageNum++;
          }
        }).finally(() => {
          this.pageLoading = false;
        })
      } else if (!this.pageLoading) {
        this.pageLoading = true;
        getRecommendedProductList(this.pageNum, this.pageSize).then((response) => {
          if(response != null) {
            if(response.data.rows.length <= 0) {
              this.lock = true;
            }
            this.products = this.products.concat(response.data.rows);
            this.pageNum++;
          }
        }).finally(() => {
          this.pageLoading = false;
        })
      }
    },
    parseBalance(balance) {
      return parseBalance(balance);
    }
  },
  mounted() {
    const store = userStore();
    this.user = store.user;
    this.getCategoryList();
    this.getProductList();
  },
  computed: {
    //是否已登录
    isLogin() {
      return this.user.id != null && this.user.id != "";
    }
  },
  components: { IconSVGComponent, ProductItem }
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
  min-height: 600px;
  border-radius: 15px;
  background-color: var(--el-input-bg-color,var(--el-fill-color-blank));
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
    margin-bottom: 14px;
    color: #666;
    list-style: inside;
  }
  li a {
    color: #666;
    text-decoration: none;
  }
  li a:hover {
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
    justify-content: space-evenly;
    align-items: center;
    a {
      text-align: center;
      strong {
        display: block;
        font-size: 14px;
        color: #f40;
        height: 18px;
      }
    }
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

.title {
  margin-top: 20px;
  margin-bottom: 20px;
  height: 24px;
  font-size: 24px;
  line-height: 24px;
}

.link {
  color: unset;
  text-decoration: none;
}

.link:hover {
  color: red;
}
</style>