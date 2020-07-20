<template>
  <div class="header">{{ seller}}</div>
</template>

<script>
export default {
  props: ["seller"],
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.header {
  flex: 0 0 130px;
  background: pink;
  overflow: hidden;
}
</style>