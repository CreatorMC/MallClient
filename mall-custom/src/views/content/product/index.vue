<template>
  <div style="background-color: #e8ded9; padding-bottom: 40px;">
    <TopSearchComponent />
    <el-main class="container">
      <div class="info-container">
        <div class="left-pic-container">
          <el-image class="show-item" :src="showImage" fit="contain" />
          <div ref="thumbnails" class="pic-thumbnails">
            <div v-for="i in 5">
              <el-image class="thumbnail" :src="srcList[i - 1]" fit="contain" @mouseenter="handleMouseEnter" />
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
import TopSearchComponent from '@/components/content/TopSearchComponent.vue';
export default {
  data() {
    return {
      showImage: "",
      srcList: [
        '/img/banner_0.jpg',
        '/img/banner_1.jpg',
        '/img/default_fail_pic.png',
        '/img/404.png',
        '/img/default_head.png'
      ]
    };
  },
  methods: {
    /**
     * 监听鼠标滑入图片
     */
    handleMouseEnter(event) {
      let cs = this.$refs['thumbnails'].childNodes;
      for(let i = 1; i < cs.length - 1; i++) {
        cs[i].firstChild.classList.remove('pic-active');
      }
      event.target.parentNode.classList.add('pic-active');
      this.showImage = event.target.src;
    }
  },
  mounted() {
    //初始化展示图片
    let cs = this.$refs['thumbnails'].childNodes;
    cs[1].firstChild.classList.add('pic-active');
    this.showImage = this.srcList[0];
  },
  components: { TopSearchComponent }
}
</script>

<style lang="scss" scoped>
.container {
  width: $mainWidth;
  border-radius: 24px;
  background-color: white;
  margin: 0 auto;
  padding: 12px;
  .info-container {
    display: flex;
    .left-pic-container {
      width: 450px;
      .show-item {
        height: 450px;
      }
      .pic-thumbnails {
        margin-top: 12px;
        display: flex;
        justify-content: space-between;
        .thumbnail {
          width: 68px;
          height: 68px;
          border-radius: 6px;
          overflow: hidden;
        }
        .thumbnail:hover {
          cursor: pointer;
        }
      }
    }
  }
}

.pic-active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: 6px;
  border: 4px solid #f9f7f3;
  z-index: 1;
}

.pic-active::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: 6px;
  border: 1px solid #ff5000;
  z-index: 2;
  background-color: rgba(0,0,0,.02);
}
</style>