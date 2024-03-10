<template>
  <div>
    <el-container>
      <el-header class="header">
        <TopBarComponent />
      </el-header>
      <div>
        <router-view></router-view>
      </div>
      <el-footer class="footer">
        <div>
          <p>
            <router-link to="/index/link">友情链接</router-link>
            <router-link to="/index/protocol">网站协议</router-link>
            <router-link to="/index/about">关于我</router-link>
          </p>
          <div>
            <a href="https://beian.miit.gov.cn/" target="_blank">鲁ICP备xxxxxxxxxx号</a>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import TopBarComponent from '@/components/main/TopBarComponent.vue';
export default {
  data() {
    return {
      backgroundImg: ""
    };
  },
  methods: {
    rightClick(e) {
      //禁止右键保存图片
      e.preventDefault();
    }
  },
  mounted() {
  },
  components: { TopBarComponent }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 500;
  width: 100%;
  height: $headHeight;
  left: 0;
  top: 0;
  background-color: #f5f5f5;
  border-bottom: 1px solid #eee;
  padding: 0px;
}

.footer {
  --el-footer-padding: 20px;
  text-align: center;
  color: #888a8f;
  height: 100px;
  background-color: #323335;
  font-size: 0.9em;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    color: inherit;
    text-decoration: none;
  }

  p {
    margin-block-start: 0em;

    >a+a:before {
      content: "";
      width: 4px;
      height: 4px;
      margin: 0 0.5em;
      border-radius: 50%;
      display: inline-block;
      vertical-align: 0.2em;
      background-color: #888a8f;
    }
  }
}
</style>