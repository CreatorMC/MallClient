<template>
  <div class="top-search-container">
    <div class="main">
      <router-link to="/">
        <img src="/img/logo.png" alt="首页">
      </router-link>
      <div class="flex-grow" />
      <el-input
        v-model="searchText"
        class="search"
        placeholder="搜索商品"
        prefix-icon="Search"
      />
      <div>
        <el-button class="search-button" round>搜索淘金</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopSearchComponent',
  data() {
    return {
      searchText: ""
    };
  }
}
</script>

<style lang="scss" scoped>
.top-search-container {
  width: 100%;
  height: 80px;
  background: white;
  margin-bottom: 12px;
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
    .search {
      width: 305px;
      height: 42px;
      :deep(.el-input__wrapper) {
        border-radius: 100px;
      }
      :deep(.el-input__prefix-inner) {
        font-size: larger;
      }
    }
    .search-button {
      width: 103px;
      height: 42px;
      margin-left: 10px;
    }
  }
}

.flex-grow {
  flex-grow: 1;
}
</style>