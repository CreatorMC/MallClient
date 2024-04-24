<template>
  <el-container class="container">
    <el-main>
      <div class="top">
        <div>
          <router-link to="/">
            <img src="/img/logo.png" alt="首页">
          </router-link>
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
            @keyup.enter="handlerSearch"
          >
          </el-input>
          <div class="search-button">
            <el-button type="success" round @click="handlerSearch">搜索</el-button>
          </div>
        </div>
      </div>
    </el-main>
    <el-main class="body">
      <div>
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
    <el-main>
      <el-pagination style="margin: auto; width: max-content;"
        background
        v-model:current-page="pageNum"
        v-model:page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
        @current-change="handlerChangePage"
      />
    </el-main>
  </el-container>
</template>

<script>
import ProductItem from '@/components/content/ProductItem.vue';
import { getProductList } from '@/api/product';
import { ElMessage } from 'element-plus';
import { parseBalance } from '@/utils/util';

export default {
  props: [
    'homeText'
  ],
  data() {
    return {
      //搜索输入框中的内容
      searchText: "",
      //真正搜索的内容
      realSearchText: "",
      products: [],
      pageNum: 1,
      pageSize: 30,
      total: 0
    }
  },
  methods: {
    handlerChangePage(value) {
      this.pageNum = value;
      this.getProductList();
    },
    handlerSearch() {
      if(this.searchText == null || this.searchText == "") {
        ElMessage.error("请输入搜索内容");
        return;
      }
      //刷新当前页面重新搜索
      this.$router.push({ name: 'search', params: { homeText: this.searchText } });
    },
    getProductList() {
      if(this.realSearchText == null || this.realSearchText == "") {
        ElMessage.error("请输入搜索内容");
        return;
      }
      getProductList(this.pageNum, this.pageSize, { name: this.realSearchText, categoryId: null }).then((response) => {
        if(response != null) {
          this.products = response.data.rows;
          this.total = parseInt(response.data.total);
        }
      })
    },
    parseBalance(balance) {
      return parseBalance(balance);
    }
  },
  mounted() {
    this.realSearchText = this.homeText;
    this.searchText = this.homeText;
    this.getProductList();
  },
  watch: {
    $route: function (to, from) {
      this.$router.go(0);
    }
  },
  components: { ProductItem }
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