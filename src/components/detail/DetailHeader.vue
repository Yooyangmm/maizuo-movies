<template>
  <div class="header">
    <i class="iconfont icon-xiajiantou" @click="handleBack"></i>
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    handleBack () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 17px;
    background-color: #fff;
    i {
      font-size: 20px;
      position: fixed;
      top: 0;
      left: 20px;
    }
  }
</style>
