<template>
  <div class="app">
    <Header :seller="seller" />
    <Nav />
    <Main :goodsList="goodsList" :seller="seller" />
    <shop-cart />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";
import Main from "@/components/Main.vue";
import ShopCart from "@/components/ShopCart.vue";

import { getGoods, getSeller } from "@/api";
export default {
  components: {
    Header,
    Nav,
    Main,
    ShopCart
  },
  data() {
    return {
      seller: {},
      goodsList: [],
      value: 3
    };
  },
  async created() {
    let { goodsList } = await getGoods();
    let { data } = await getSeller();
    this.goodsList = goodsList;
    this.seller = data;
    console.log(this.seller);
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