<template>
  <div class="goods-detail">
    <img width="100%" :src="curFood.imgUrl" alt />
    <div class="title">
      <h2 class="name">{{curFood.name}}</h2>
      <p class="rate">
        月销{{curFood.sellCount}}份
        <span>好评率{{curFood.rating}}%</span>
      </p>
      <div class="horizon">
        <span class="price">￥{{curFood.price}}</span>
        <div @click="addToCart(curFood.name)" class="cart">加入购物车</div>
      </div>
    </div>
    <Card>
      <h2 slot="name">商品介绍</h2>
      <p style="line-height:1.5;color:#ccc;">{{curFood.goodsDesc}}</p>
    </Card>
    <Card class="comments">
      <h2 slot="name">商品评价</h2>
      <div class="action">
        <div class="filter">
          <button>全部</button>
        </div>
        <div class="check">
          <van-checkbox v-model="checked" icon-size="18px">只看有内容的评价</van-checkbox>
        </div>
      </div>
      <Comment v-for="(v,i) in curFood.ratings" :rating="v" :key="i" />
    </Card>
    <i @click="close">×</i>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import Comment from "@/components/Comment.vue";
import { mapState } from "vuex";
import Vue from "vue";
import { Checkbox } from "vant";
Vue.use(Checkbox);

export default {
  components: {
    Card,
    Comment,
  },
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    close() {
      this.$emit("handleClose");
    },
    addToCart(name) {
      this.$emit("handleClose");
      this.$store.commit("ADD_CART", name);
    },
  },
  computed: {
    ...mapState(["curFood"]),
  },
};
</script>

<style lang="less" scoped>
.goods-detail {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: scroll;
  background-color: #fff;
  .title {
    line-height: 1.5;
    padding: 20px;
    .name {
      font-weight: bold;
    }
    .rate {
      font-size: 12px;
      color: #ccc;
    }
    .horizon {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price {
        color: red;
      }
      .cart {
        background-color: #1989fa;
        padding: 5px 10px;
        font-size: 12px;
        color: #fff;
        border-radius: 22px;
      }
    }
  }
  .comments {
    .action {
      padding: 0 20px;
      border-bottom: 1px solid #ccc;
      .filter {
        padding: 20px 0;
        display: flex;
        button {
          margin-right: 10px;
          border: 1px solid #1989fa;
          border-radius: 4px;
          color: #aaa;
          background: #fff;
          padding: 10px;
          &.active {
            background-color: #1989fa;
            color: #fff;
          }
        }
        border-bottom: 1px solid #ccc;
      }
      .check {
        padding: 10px 0;
      }
    }
  }
  i {
    font-size: 24px;
    position: fixed;
    text-align: center;
    color: #ccc;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    background-color: #999;
    top: 5px;
    right: 5px;
  }
}
</style>