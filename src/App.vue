<template>
  <div class="app">
    <Header :seller="seller" />
    <Nav />
    <Main :seller="seller" />
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
import { mapMutations } from "vuex";
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
    // 给每个食品添加数量字段,使用双重循环
    for (let v of goodsList) {
      for (let food of v.foods) {
        food.count = 0;
      }
    }
    this.$store.commit("GET_GOODS", goodsList.reverse());
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