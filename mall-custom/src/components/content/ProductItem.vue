<template>
    <router-link class="product-container" to="/">
      <div>
        <el-image class="img" fit="fill" :src="img"></el-image>
        <div class="product-right">
          <div class="info-wrapper">
            <div class="title">
              {{ title }}
            </div>
          </div>
          <div class="price-wrapper">
            <span class="price-value">
              <em>¥</em>
              <span>{{ price }}</span>
              <span class="price-value-original">{{ originalPrice != null ? originalPrice : '' }}</span>
            </span>
          </div>
        </div>
      </div>
    </router-link>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    title: {
      type: String,
      required: true
    },
    // 现价（如果没有优惠价，就是原价。如果有优惠价，则是优惠价）
    price: {
      type: String,
      required: true
    },
    // 原价（只有商品有优惠价时才需要传递此属性）
    originalPrice: {
      type: String
    },
    // 商品封面图
    img: {
      type: String,
      required: true
    }
  },
  data() {
    return {

    };
  }
}
</script>

<style lang="scss" scoped>
.product-container {
  display: block;
  width: 100%;
  height: 174px;
  border-radius: 12px;
  background-color: #F7F9FA;
  border: 1px solid #f7f9fa;
  transition: all 0.5s;
  text-decoration: none;
  overflow: hidden;
  > div {
    display: flex;
    width: calc(100% - 22px);
    height: calc(100% - 22px);
    padding: 11px;
    .img {
      width: 150px;
      height: 150px;
      border-radius: 10px;
    }
    .product-right {
      margin-left: 12px;
      flex: 1;
      .info-wrapper {
        height: 116px;
        .title {
          max-height: 46px;
          margin: 6px 0 2px 0;
          overflow: hidden;
          color: #333;
          font-size: 16px;
          line-height: 23px;
        }
        .title:hover {
          color: #ff915e;
        }
      }
      .price-wrapper {
        color: #ff5000;
        .price-value {
          display: inline-block;
          font-size: 22px;
          line-height: 22px;
          em {
            margin-right: 4px;
            font-size: 14px;
            font-family: "Microsoft Yahei";
            vertical-align: middle;
            font-style: normal;
          }
          .price-value-original {
            margin-left: 4px;
            font-size: 14px;
            text-decoration: line-through;
          }
        }
      }
    }
  }
}

.product-container:hover {
  background-color: #fff;
  border-color: #ff915e;
  box-shadow: 0 8px 12px 0 rgba(255, 80, 0, 0.06);
  -webkit-box-shadow: 0 8px 12px 0 rgba(255, 80, 0, 0.06);
  -moz-box-shadow: 0 8px 12px 0 rgba(255, 80, 0, 0.06);
}
</style>