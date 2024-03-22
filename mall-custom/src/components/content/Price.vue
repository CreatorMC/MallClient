<template>
  <div class="price-wrapper">
    <span class="price-value">
      <em>¥</em>
      <span>{{ price }}</span>
      <span class="price-value-original">{{ originalPrice != null ? originalPrice : '' }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Price',
  props: {
    // 现价（如果没有优惠价，就是原价。如果有优惠价，则是优惠价）
    price: {
      type: String,
      required: true
    },
    // 原价（只有商品有优惠价时才需要传递此属性）
    originalPrice: {
      type: String
    }
  },
  data() {
    return {

    };
  }
}
</script>

<style lang="scss" scoped>
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
</style>