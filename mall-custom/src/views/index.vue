<template>
  <div>
    <el-container>
      <el-header class="header">
        <TopBarComponent />
      </el-header>
      <div>
        <router-view></router-view>
      </div>
      <FooterComponent />
    </el-container>
  </div>
</template>

<script>
import TopBarComponent from '@/components/main/TopBarComponent.vue';
import FooterComponent from '@/components/main/FooterComponent.vue';
export default {
  data() {
    return {

    };
  },
  methods: {

  },
  mounted() {
  },
  components: { TopBarComponent, FooterComponent }
}
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  z-index: 500;
  width: 100%;
  height: $headHeight;
  left: 0;
  top: 0;
  background-color: #f5f5f5;
  border-bottom: 1px solid #eee;
  padding: 0px;
}
</style>