<template>
  <div class="shop-cart">
    <div class="container">
      <span></span>
    </div>
    <span class="iconfont icon-gouwuche"></span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.shop-cart {
  background-color: #222;
  flex: 0 0 40px;
  z-index: 100;
  position: relative;
  .iconfont {
    position: absolute;
    padding: 10px;
    left: 21px;
    color: #ccc;
    top: -7px;
    font-size: 20px;
    background: #333;
    border-radius: 50%;
  }
}
</style>