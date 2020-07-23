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
        <button
          @click="change(v.name)"
          :class="{active:curActive === v.name}"
          v-for="v in this.rateCate"
          :key="v.name"
        >{{v.name}}{{v.items.length}}</button>
      </div>
      <div class="check">
        <van-checkbox v-model="checked" icon-size="24px">只看有内容的评价</van-checkbox>
      </div>
    </div>
    <Comment v-for="(v,i) in fetchRate" :key="i" :rating="v" />
  </div>
</template>

<script>
import { getRatings } from "@/api";
import { mapState } from "vuex";
import Comment from "@/components/Comment.vue";
import Vue from "vue";
import Moment from "moment";
import { Button, Checkbox, CheckboxGroup } from "vant";
Vue.use(Button);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
export default {
  components: {
    Comment,
  },
  data() {
    return {
      value: 4.0,
      curRate: [],
      allRate: [],
      goodRate: [],
      badRate: [],
      rateCate: [],
      checked: false,
      curActive: "全部",
    };
  },
  methods: {
    change(name) {
      this.curActive = name;
    },
  },
  computed: {
    ...mapState(["goodsList"]),
    // 计算动态要显示的评论
    fetchRate() {
      this.rateCate.forEach((v) => {
        if (v.name === this.curActive) {
          this.curRate = v.items;
        }
      });
      if (this.checked) {
        return this.curRate.filter((v) => v.text != "");
      }
      return this.curRate;
    },
  },
  async created() {
    let { data } = await getRatings();
    data.forEach((v) => {
      v.rateTime = Moment(v.rateTime).format("YYYY-MM-DD HH:mm");
    });
    // 获取各评论类型的数量
    data.forEach((v) => {
      if (v.score >= 4) {
        this.goodRate.push(v);
      } else {
        this.badRate.push(v);
      }
    });
    this.allRate = [...this.goodRate, ...this.badRate];
    this.rateCate = [
      { name: "全部", items: this.allRate },
      { name: "满意", items: this.goodRate },
      { name: "不满意", items: this.badRate },
    ];
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