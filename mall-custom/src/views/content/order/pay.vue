<template>
  <div>

  </div>
</template>

<script>
export default {
  props: [
    'id'
  ],
  data() {
    return {

    }
  },
  mounted() {
    if(this.id == null) {
      this.$router.push("/");
    }
  }
}
</script>

<style lang="scss" scoped>
</style>