<template>
  <div class="header" :style="{background: 'url( '+ seller.avatar +')'}">
    <div class="body">
      <img width="60" height="60" :src="seller.avatar" alt />
      <div class="info">
        <h2>{{seller.name}}</h2>
        <p>{{seller.description}}\{{seller.deliveryTime}}分钟送达</p>
        <p v-if="seller.supports">
          <i style="color:red" class="iconfont icon-te"></i>
          {{seller.supports[1]}}
        </p>
      </div>
      <span class="supports" v-if="seller.supports">
        {{seller.supports.length}}个
        <i
          @click="isVisible = true"
          class="iconfont icon-arrow-right"
          style="font-size:12px;"
        ></i>
      </span>
    </div>
    <div class="bottom">
      <i class="iconfont icon-gonggao1"></i>
      <span>{{seller.bulletin}}</span>
      <i @click="isVisible = true" class="iconfont icon-arrow-right" style="font-size:12px;"></i>
    </div>

    <DetailModel :seller="seller" @handleClose="isVisible = false" v-show="isVisible" />
  </div>
</template>

<script>
import DetailModel from "@/components/DetailModel.vue";
export default {
  components: {
    DetailModel
  },
  props: ["seller"],
  data() {
    return {
      isVisible: true
    };
  }
};
</script>

<style lang="less" scoped>
.header {
  flex: 0 0 130px;
  display: flex;
  flex-direction: column;
  .body {
    position: relative;
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    img {
      flex: 0 0 60px;
      margin-right: 10px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #fff;
      h2 {
        font-weight: bold;
        font-size: 14px;
      }
      p {
        font-size: 12px;
      }
    }
    .supports {
      position: absolute;
      padding: 5px;
      color: #fff;
      line-height: 16px;
      border-radius: 14px;
      right: 20px;
      font-size: 12px;
      bottom: 20px;
      box-sizing: border-box;
      background: rgba(0, 0, 0, 0.6);
    }
  }
  .bottom {
    line-height: 30px;
    flex: 0 0 30px;
    padding: 0 10px;
    box-sizing: border-box;
    color: #fff;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    .icon-gonggao1 {
      flex: 0 0 20px;
    }
    span {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .icon-arrow-right {
      flex: 0 0 20px;
    }
  }
}
</style>