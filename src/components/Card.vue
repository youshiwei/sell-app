<template>
  <div class="card">
    <div class="blank"></div>
    <div class="container">
      <h2 class="name">
        <slot name="name" />
      </h2>
      <slot />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.card {
  .blank {
    width: 100%;
    height: 20px;
    box-sizing: border-box;
    background-color: #f4f5f7;
    border: 1px solid #e5e6e8;
  }
  .container {
    padding: 20px;
    .name {
      font-weight: bold;
    }
  }
}
</style>