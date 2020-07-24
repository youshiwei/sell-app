<template>
  <div id="seller" style="width:100%;height:100%;overflow:scroll;">
    <div class="seller">
      <div class="head">
        <div class="left">
          <h2>{{seller.name}}</h2>
          <van-rate
            style="margin:0 auto;"
            gutter="10px"
            v-model="seller.score"
            color="yellow"
            size="14px"
            allow-half
            void-icon="star"
            void-color="#eee"
          />
          <span>(699)月售 {{seller.sellCount}} 单</span>
        </div>
        <div class="right">
          <van-icon color="red" name="like" />
          <div>已收藏</div>
        </div>
      </div>
      <ul class="delivery">
        <li>
          <p>起送价</p>
          <div>
            <span>{{seller.minPrice}}</span>
            元
          </div>
        </li>
        <li>
          <p>商家配送</p>
          <div>
            <span>{{seller.deliveryPrice}}</span>
            元
          </div>
        </li>
        <li>
          <p>平均配送时间</p>
          <div>
            <span>{{seller.deliveryTime}}</span>
            分钟
          </div>
        </li>
      </ul>
      <div class="blank"></div>
      <div class="block">
        <h2 class="title">公告与活动</h2>
        <div class="content">
          <p>{{ seller.bulletin }}</p>
          <ul v-for="(v,i) in seller.supports" :key="i">
            <li>{{v}}</li>
          </ul>
        </div>
      </div>
      <div class="blank"></div>
      <div class="block">
        <h2 class="title">商家实景</h2>
        <div id="pics" style="padding:20px; overflow:hidden ">
          <div style="width:450px">
            <img
              style="margin-right:10px"
              v-for="(v,i) in seller.pics"
              :key="i"
              width="80"
              height="80"
              :src="v"
              alt
            />
          </div>
        </div>
      </div>
      <div class="blank"></div>
      <div class="block">
        <h2 class="title">商家信息</h2>
        <div class="content">
          <ul>
            <li>该商家支持开发票，请在下单时填写好发票抬头</li>
            <li>品类：其他菜系，包子粥店</li>
            <li>地址：成都市武侯区府城大道天府新谷1号楼606号</li>
            <li>营业时间：{{ seller.date }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Rate, Icon } from "vant";
import BScroll from "better-scroll";
Vue.use(Rate);
Vue.use(Icon);

export default {
  props: ["seller"],
  mounted() {
    new BScroll("#pics", {
      // 可以写id this.$refs.xx  document.getElmentById()
      click: true, // 允许点击【better-scroll默认把点击禁止了】
      probeType: 3, // 可以派发滚动事件
      scrollX: true, // 开启横向滚动
    });
    new BScroll("#seller", {
      // 可以写id this.$refs.xx  document.getElmentById()
      click: true, // 允许点击【better-scroll默认把点击禁止了】
      probeType: 3, // 可以派发滚动事件
      scrollX: true, // 开启横向滚动
    });
  },
};
</script>

<style lang="less" scoped>
.seller {
  .head {
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    .left {
      flex: 1;
      h2 {
        margin-bottom: 10px;
      }
    }
    .right {
      flex: 0 0 48px;
      text-align: center;
    }
  }
  .delivery {
    margin: 0 20px;
    border-top: 1px solid #ccc;
    background: #fff;
    display: flex;
    li {
      text-align: center;
      color: #ccc;
      font-size: 14px;
      flex: 1;
      margin: 20px 0;
      border-right: 1px solid #ccc;
      &:last-child {
        border-right: none;
      }
      p {
        line-height: 30px;
      }
      span {
        color: #000;
        font-size: 20px;
      }
    }
  }
  .blank {
    height: 20px;
    box-sizing: border-box;
    border-top: 1px solid #e7e7e8;
    border-bottom: 1px solid #e7e7e8;
    background: #f4f5f7;
  }
  .block {
    .title {
      line-height: 30px;
      font-size: 16px;
      font-weight: bold;
      text-indent: 20px;
    }
    .content {
      padding: 0 20px;
      box-sizing: border-box;
      p {
        color: red;
        line-height: 40px;
        padding-left: 20px;
      }
      ul {
        li {
          padding-left: 20px;
          line-height: 50px;
          font-size: 14px;
          border-top: 1px solid #ccc;
        }
      }
    }
  }
}
</style>