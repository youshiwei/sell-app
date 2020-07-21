<template>
  <div class="comment">
    <div class="avatar">
      <van-image round width="2rem" height="2rem" :src="rating.avatar" />
    </div>
    <div class="right">
      <div class="head">
        <div class="name-rate">
          <div class="name">{{rating.username}}</div>
          <div class="rate">
            <van-rate
              v-model="rating.score"
              :size="12"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
            <span>{{ rating.deliveryTime ? rating.deliveryTime : "**"}}分钟送达</span>
          </div>
        </div>
        <span class="time">{{ rating.rateTime | formatTime}}</span>
      </div>
      <div class="text">{{rating.text}}</div>
      <div class="recommend">
        <div class="hand">
          <i v-if="rating.score >= 4" style="color:red" class="iconfont icon-zan"></i>
          <i v-else style="color:gray" class="iconfont icon-buzan"></i>
        </div>
        <div class="recommend-item">
          <van-button
            v-for="(v,i) in rating.recommend"
            :key="i"
            style="display:inline-block; margin:0 3px 3px 0;"
            type="default"
            size="mini"
          >{{v}}</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Moment from "moment";
import { Image as VanImage } from "vant";
Vue.use(VanImage);
export default {
  props: ["rating"],
  data() {
    return {
      value: 4.0
    };
  },
  filters: {
    formatTime(time) {
      return Moment(time).format("YYYY-MM-DD HH:mm");
    }
  }
};
</script>

<style lang="less" scoped>
.comment {
  border-bottom: 1px solid #ccc;
  padding: 20px;
  display: flex;
  .avatar {
    flex: 0 0 50px;
  }
  .right {
    font-size: 12px;
    flex: 1;
    .head {
      display: flex;
      justify-content: space-between;
    }
    .text {
      margin: 10px 0;
    }
    .recommend {
      display: flex;
      .hand {
        flex: 0 0 20px;
      }
    }
  }
}
</style>