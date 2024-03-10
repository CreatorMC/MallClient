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
        Main
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: ""
    }
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: $mainWidth;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
}

@media screen and (max-width: 1200px) {
  .container {
    width: 990px;
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
</style>