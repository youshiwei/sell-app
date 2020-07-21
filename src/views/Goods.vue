<template>
  <div class="goodsList">
    <div class="cates" id="cates">
      <ul>
        <li
          v-for="item in goodsList"
          @click="ChangeActive(item.name)"
          :class="{active: curActive === item.name }"
          :key="item.name"
        >{{item.name}}</li>
      </ul>
    </div>
    <div id="foods" class="foods">
      <div>
        <div :id="item.name" v-for="item in goodsList" :key="item.name" class="food">
          <h2 class="name">{{ item.name}}</h2>
          <ul>
            <li v-for="v in item.foods" :key="v.id">
              <img width="80" height="80" :src="v.imgUrl" alt />
              <div class="content">
                <p class="title">{{v.name}}</p>
                <p class="rate">月售{{v.sellCount}}份 好评率{{v.rating}}%</p>
                <p class="desc">{{v.goodsDesc}}</p>
                <p class="price">￥{{v.price}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BeScroll from "better-scroll";
export default {
  props: ["goodsList"],
  data() {
    return {
      curActive: "新品专享",
      rightScroll: {},
      hArr: []
    };
  },
  methods: {
    ChangeActive(name) {
      this.curActive = name;
      this.rightScroll.scrollToElement(document.getElementById(name), 300);
    }
  },
  updated() {
    let total = 0;
    for (let cate of this.goodsList) {
      let h = document.getElementById(cate.name).offsetHeight;
      this.hArr.push({
        min: total,
        max: total + h,
        name: cate.name
      });
      total = total + h;
    }
  },
  mounted() {
    // 左侧滚动丝滑
    new BeScroll("#cates", {
      click: true
    });
    // 右侧滚动丝滑
    this.rightScroll = new BeScroll("#foods", {
      click: true, //可以点击
      probeType: 3 // 可以派发滚动事件
    });
    // 绑定滚动事件
    this.rightScroll.on("scroll", pos => {
      let y = Math.abs(pos.y);
      for (let item of this.hArr) {
        if (y >= item.min && y < item.max) {
          this.curActive = item.name;
        }
      }
    });
  }
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
      border-bottom: 1px solid #fff;
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
          border-bottom: 1px solid #ccc;
          display: flex;
          padding: 10px;
          line-height: 1.5;
          box-sizing: border-box;
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
}
</style>