<template>
  <el-footer class="footer">
    <div>
      <p>
        <a href="https://www.12315.cn">全国12315平台</a>
        <router-link to="/index/protocol">网站协议</router-link>
        <router-link to="/index/about">关于我们</router-link>
      </p>
      <div>
        <a href="https://beian.miit.gov.cn/" target="_blank">鲁ICP备xxxxxxxxxx号</a>
      </div>
    </div>
  </el-footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
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