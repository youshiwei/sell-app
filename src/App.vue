<template>
  <div class="app">
    <Header :seller="seller" />
    <Nav />
    <Main :goodsList="goodsList" :seller="seller" />
    <shop-cart />
  </div>
</template>

<script>
import Moment from "moment";
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
    // 处理营业时间
    data.date = data.date
      .map(v => {
        return Moment(v)
          .format("YYYY-MM-DD HH:mm:ss")
          .substr(11);
      })
      .join("-");
    this.goodsList = goodsList.reverse();
    this.seller = data;
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