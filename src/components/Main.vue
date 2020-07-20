<template>
  <div class="main">
    <router-view :goodsList="goodsList" :seller="seller" />
  </div>
</template>

<script>
export default {
  props: ["goodsList", "seller"]
};
</script>

<style lang="less" scoped>
.main {
  flex: 1;
  background: lightblue;
  overflow-y: scroll;
}
</style>