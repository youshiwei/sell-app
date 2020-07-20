<template>
  <div class="app">
    <Header />
    <Nav />
    <Main />
    <shop-cart />
  </div>
</template>

<script>
import Vue from "vue";
import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";
import Main from "@/components/Main.vue";
import ShopCart from "@/components/ShopCart.vue";
import { Button } from "vant";
Vue.use(Button);
export default {
  components: {
    Header,
    Nav,
    Main,
    ShopCart
  }
};
</script>

<style lang="less" scoped>
.app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>