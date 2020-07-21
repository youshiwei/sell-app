<template>
  <div class="detail-model">
    <h1>{{seller.name}}</h1>
    <p style="text-align:center;">
      <van-rate
        style="margin:0 auto;"
        gutter="20px"
        v-model="seller.score"
        color="yellow"
        allow-half
        void-icon="star"
        void-color="#eee"
      />
    </p>
    <van-divider>优惠信息</van-divider>
    <ul class="supports" v-for="(v,i) in seller.supports" :key="i">
      <li class="supports-item">
        <i style="color:white" class="iconfont icon-zhe"></i>
        {{v}}
      </li>
    </ul>
    <van-divider>商家公告</van-divider>
    <p class="bulletin">{{ seller.bulletin }}</p>
    <div class="close">
      <i @click="close">×</i>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Rate, Divider } from "vant";
Vue.use(Rate);
Vue.use(Divider);
export default {
  props: ["seller"],
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("handleClose");
    }
  }
};
</script>

<style lang="less" scoped>
.detail-model {
  color: #ccc;
  padding: 40px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  h1 {
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .van-divider {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
  }
  .supports {
    .supports-item {
      margin-bottom: 15px;
    }
  }
  .bulletin {
    line-height: 30px;
  }
  .close {
    text-align: center;
    line-height: 40px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    font-size: 50px;
    transform: translateX(-50%);
  }
}
</style>