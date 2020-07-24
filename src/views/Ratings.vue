<template>
  <div id="ratings" style="width:100%;height:100%;overflow:hidden">
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
            <van-rate
              v-model="value"
              :size="14"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
            <span>3.9</span>
          </div>
          <div>
            商品质量：
            <van-rate
              v-model="value"
              :size="14"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
            <span>4.0</span>
          </div>
          <div>送达时间：44分钟</div>
        </div>
      </div>
      <div class="blank"></div>
      <div class="action">
        <div class="filter">
          <button @click="state = 'all'" :class="{active:state === 'all'}">全部{{all}}</button>
          <button @click="state = 'ok'" :class="{active:state === 'ok'}">满意{{ok}}</button>
          <button @click="state = 'no'" :class="{active:state === 'no'}">不满意{{no}}</button>
        </div>
        <div class="check">
          <van-checkbox v-model="checked" icon-size="24px">只看有内容的评价</van-checkbox>
        </div>
      </div>
      <Comment v-for="(v,i) in RateType" :key="i" :rating="v" />
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { getRatings } from "@/api";
import { mapState } from "vuex";
import Comment from "@/components/Comment.vue";
import Vue from "vue";
import Moment from "moment";
import { Checkbox } from "vant";
Vue.use(Checkbox);
export default {
  components: {
    Comment,
  },
  data() {
    return {
      value: 4.0,
      state: "all",
      checked: false,
      ratings: [],
    };
  },
  methods: {},
  computed: {
    ...mapState(["goodsList"]),
    // 计算动态要显示的评论
    RateType() {
      if (this.state === "all") {
        if (this.checked) {
          return this.ratings.filter((v) => v.text != "");
        }
        return this.ratings;
      } else if (this.state === "ok") {
        if (this.checked) {
          return this.ratings
            .filter((v) => v.score >= 4)
            .filter((v) => v.text != "");
        }
        return this.ratings.filter((v) => v.score >= 4);
      } else if (this.state === "no") {
        if (this.checked) {
          return this.ratings
            .filter((v) => v.score < 4)
            .filter((v) => v.text != "");
        }
        return this.ratings.filter((v) => v.score < 4);
      }
    },
    // 全部评论
    all() {
      return this.ratings.length;
    },
    // 满意评论

    ok() {
      return this.ratings.filter((v) => v.score >= 4).length;
    },
    // 不满意评论

    no() {
      return this.ratings.filter((v) => v.score < 4).length;
    },
  },
  async created() {
    let { data } = await getRatings();
    this.ratings = data;
  },
  mounted() {
    new BScroll("#ratings", {
      click: true, // 允许点击【better-scroll默认把点击禁止了】
    });
  },
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
      padding: 15px 0;
    }
  }
}
</style>