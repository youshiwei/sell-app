<template>
  <div class="main">
    <router-view :goodsList="goodsList" :seller="seller" />
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: ["goodsList", "seller"],
};
</script>

<style lang="less" scoped>
.main {
  flex: 1;
  background: #fff;
  overflow-y: scroll;
}
</style>