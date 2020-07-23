<template>
  <div class="goodsList">
    <div class="cates" id="cates">
      <ul>
        <li
          v-for="goods in goodsList"
          @click="ChangeActive(goods.name)"
          :class="{active: curActive === goods.name }"
          :key="goods.name"
        >{{goods.name}}</li>
      </ul>
    </div>
    <div id="foods" class="foods">
      <div>
        <div :id="goods.name" v-for="goods in goodsList" :key="goods.name" class="food">
          <h2 class="name">{{ goods.name}}</h2>
          <ul>
            <li @click="fetchDetail(item)" v-for="item in goods.foods" :key="item.id">
              <img width="80" height="80" :src="item.imgUrl" alt />
              <div class="content">
                <p class="title">{{item.name}}</p>
                <p class="rate">月售{{item.sellCount}}份 好评率{{item.rating}}%</p>
                <p class="desc">{{item.goodsDesc}}</p>
                <p class="price">￥{{item.price}}</p>
              </div>
              <div class="control">
                <span
                  v-show="item.count>0"
                  @click.stop="change({name:item.name,num:-1})"
                  class="iconfont icon-jianshao1"
                ></span>
                <span v-show="item.count>0">{{item.count}}</span>
                <span @click.stop="change({name:item.name,num:+1})" class="iconfont icon-zengjia"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 商品详情 -->
    <transition name="slide">
      <goods-detail @handleClose="isVisible = false" v-show="this.isVisible" />
    </transition>
  </div>
</template>

<script>
import BeScroll from "better-scroll";
import { mapState } from "vuex";
import GoodsDetail from "@/components/GoodsDetail.vue";
export default {
  components: {
    GoodsDetail,
  },
  data() {
    return {
      curActive: "新品专享",
      rightScroll: {},
      hArr: [],
      isVisible: false,
    };
  },
  created() {
    this.$nextTick(() => {
      this.calcArr();
    });
  },

  methods: {
    ChangeActive(name) {
      this.curActive = name;
      this.rightScroll.scrollToElement(document.getElementById(name), 300);
    },
    fetchDetail(cur) {
      this.isVisible = true;
      this.$store.commit("SET_CUR", cur);
    },
    // 计算各分类高度数组
    calcArr() {
      let total = 0;
      for (let cate of this.goodsList) {
        let h = document.getElementById(cate.name).offsetHeight;
        this.hArr.push({
          min: total,
          max: total + h,
          name: cate.name,
        });
        total = total + h;
      }
    },
    // 改变商品数量
    change(num) {
      this.$store.commit("CHANGE_COUNT", num);
    },
  },
  computed: {
    ...mapState(["goodsList"]),
  },
  updated() {
    this.calcArr();
  },
  mounted() {
    // 左侧滚动丝滑
    new BeScroll("#cates", {
      click: true,
    });
    // 右侧滚动丝滑
    this.rightScroll = new BeScroll("#foods", {
      click: true, //可以点击
      probeType: 3, // 可以派发滚动事件
    });
    // 绑定滚动事件
    this.rightScroll.on("scroll", (pos) => {
      let y = Math.abs(pos.y);
      for (let goods of this.hArr) {
        if (y >= goods.min && y < goods.max) {
          this.curActive = goods.name;
        }
      }
    });
  },
};
</script>

<style lang="less" scoped>
.goodsList {
  height: 100%;
  display: flex;
  .cates {
    flex: 0 0 80px;
    background: #f4f5f7;
    overflow: hidden;
    li {
      font-size: 14px;
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;
      &.active {
        background-color: #fff;
      }
    }
  }
  .foods {
    overflow: hidden;
    flex: 1;
    .food {
      .name {
        background: #f4f5f7;
        height: 25px;
        border-left: 2px solid orange;
        line-height: 25px;
        font-size: 14px;
        padding-left: 10px;
        box-sizing: border-box;
      }
      ul {
        padding: 10px;
        box-sizing: border-box;
        li {
          position: relative;
          border-bottom: 1px solid #ccc;
          display: flex;
          padding: 10px;
          line-height: 1.5;
          box-sizing: border-box;
          .control {
            position: absolute;
            bottom: 0;
            right: 0;
            span {
              font-size: 20px;
              padding: 5px;
              &.iconfont {
                color: #1989fa;
              }
            }
          }
          img {
            margin-right: 5px;
          }
          .content {
            .title {
              font-weight: bold;
              width: 160px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .rate {
              font-size: 12px;
              color: #ccc;
            }
            .desc {
              width: 160px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .price {
              color: red;
            }
          }
        }
      }
    }
  }
  // 进入动画和离开动画的过程
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s;
  }

  // 进入动画的瞬间 和 离开动画的瞬间
  .slide-enter,
  .slide-leave-to {
    transform: translateY(100%);
  }
}
</style>