<template>
  <div class="goodsList">
    <div class="cates">
      <ul>
        <li
          v-for="item in goodsList"
          @click="curActive = item.name"
          :class="{active: curActive === item.name }"
          :key="item.name"
        >{{item.name}}</li>
      </ul>
    </div>
    <div class="foods">
      <div v-for="item in goodsList" :key="item.name" class="food">
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
</template>

<script>
export default {
  props: ["goodsList"],
  data() {
    return {
      curActive: "新品专享"
    };
  }
};
</script>

<style lang="less" scoped>
.goodsList {
  height: 100%;
  display: flex;
  .cates {
    flex: 0 0 80px;
    background: #ccc;
    overflow: scroll;
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
    overflow: scroll;
    flex: 1;
    .food {
      .name {
        background: #ccc;
        height: 20px;
        border-left: 2px solid orange;
        line-height: 20px;
        font-size: 12px;
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