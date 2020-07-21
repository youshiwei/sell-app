<template>
  <div class="ratings">
    <div class="overall-rating">
      <div class="left">
        <h2>3.9</h2>
        <p>综合评分</p>
        <span>高于周边商家62.9%</span>
      </div>
      <div class="right">
        <div>
          服务态度：
          <van-rate v-model="value" :size="14" color="#ffd21e" void-icon="star" void-color="#eee" />
          <span>3.9</span>
        </div>
        <div>
          商品质量：
          <van-rate v-model="value" :size="14" color="#ffd21e" void-icon="star" void-color="#eee" />
          <span>4.0</span>
        </div>
        <div>送达时间：44分钟</div>
      </div>
    </div>
    <div class="blank"></div>
    <div class="action">
      <div class="filter">
        <van-button size="small" type="info">全部57</van-button>
        <van-button size="small" type="primary">满意47</van-button>
        <van-button size="small" type="danger">不满意10</van-button>
      </div>
      <div class="check">
        <van-checkbox v-model="checked" icon-size="24px">只看有内容的评价</van-checkbox>
      </div>
    </div>
    <Comment v-for="(v,i) in ratings" :key="i" :rating="v" />
  </div>
</template>

<script>
import { getRatings } from "@/api";
import Comment from "@/components/Comment.vue";
import Vue from "vue";
import Moment from "moment";
import { Button, Checkbox, CheckboxGroup } from "vant";
Vue.use(Button);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
export default {
  components: {
    Comment
  },
  data() {
    return {
      value: 4.0,
      ratings: [],
      checked: true
    };
  },
  async created() {
    let { data } = await getRatings();
    data.forEach(v => {
      v.rateTime = Moment(v.rateTime).format("YYYY-MM-DD HH:mm");
    });
    this.ratings = data;
  }
};
</script>

<style lang="less" scoped>
.ratings {
  .overall-rating {
    display: flex;
    padding: 20px;
    .left {
      border-right: 1px solid #ccc;
      line-height: 20px;
      text-align: center;
      flex: 0 0 120px;
      h2 {
        font-size: 20px;
        color: orange;
      }
      p {
        font-size: 14px;
      }
      span {
        font-size: 12px;
        display: block;
        width: 100%;
        color: #aaa;
      }
    }
    .right {
      flex: 1;
      padding-left: 20px;
      div {
        line-height: 25px;
        span {
          color: orange;
        }
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
  .action {
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
    .filter {
      padding: 20px 0;
      display: flex;
      button {
        margin-right: 10px;
      }
      border-bottom: 1px solid #ccc;
    }
    .check {
      padding: 15px 0;
    }
  }
}
</style>