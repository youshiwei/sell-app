<template>
  <div class="shop-cart">
    <div class="cart-wrap">
      <div @click="visible=!visible" class="left-box">
        <div class="icon-box">
          <div class="cart-icon" :class="{active:Carts.newArr.length}">
            <span class="iconfont icon-gouwuche"></span>
            <span v-show="Carts.newArr.length" class="all-total">{{Carts.allTotal}}</span>
          </div>
        </div>
        <div class="price" :class="{active:Carts.newArr.length}">
          <span>{{Carts.newArr.length ? '￥'+Carts.allPrice:"未选购商品"}}</span>
        </div>
      </div>
      <div class="right-box" :class="{active:Carts.allPrice >= 15}">
        <span v-if="Carts.allPrice >= 15">去结算</span>
        <span v-else-if="Carts.allPrice >0">差￥{{(15-Carts.allPrice).toFixed(2)}}起送</span>
        <span v-else>￥15起送</span>
      </div>
    </div>
    <!-- 蒙层 -->
    <transition name="fade">
      <div @click="visible= false" v-show="isVisible" class="model"></div>
    </transition>
    <!-- 购物车列表 -->
    <transition name="slide">
      <div v-show="isVisible" class="goods-list">
        <h2 class="title">
          <span>已选商品</span>
          <span>
            <span @click="CLEARALL" class="iconfont icon-qingkong"></span>清空
          </span>
        </h2>
        <ul>
          <li v-for="item in Carts.newArr" :key="item.id">
            <div class="left">
              <span class="name">{{ item.name }}</span>
              <span class="price">￥{{(item.price*item.count).toFixed(2)}}</span>
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
    </transition>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    // 改变商品数量
    change(num) {
      this.$store.commit("CHANGE_COUNT", num);
    },
    // 清空购物车
    ...mapMutations(["CLEARALL"]),
  },
  computed: {
    // 购物车数据
    Carts() {
      return this.$store.getters.SHOP_CART;
    },
    // 购物车列表是否显示
    isVisible() {
      if (!this.Carts.newArr.length) {
        this.visible = false;
      }
      return this.visible;
    },
  },
};
</script>

<style lang="less" scoped>
.shop-cart {
  flex: 0 0 40px;
  .cart-wrap {
    display: flex;
    height: 100%;
    background: transparent;
    position: relative;
    z-index: 101;
    .left-box {
      flex: 1;
      background-color: #505052;
      display: flex;
      opacity: 0.9;
      .icon-box {
        flex: 0 0 60px;
        position: relative;
        .cart-icon {
          position: absolute;
          left: 50%;
          transform: translate(-50%, -20%);
          width: 40px;
          background: #363636;
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: #959595;
          border-radius: 50%;
          &.active {
            background: #2f90e7;
            color: #fff;
          }
          .iconfont {
            font-size: 26px;
          }
          .all-total {
            height: 16px;
            line-height: 15px;
            padding: 0 5px;
            font-size: 10px;
            border-radius: 8px;
            position: absolute;
            right: -6px;
            top: 0;
            background: red;
            color: #fff;
          }
        }
      }
      .price {
        flex: 1;
        font-size: 12px;
        line-height: 40px;
        color: #959595;
        padding: 0 10px;
        box-sizing: border-box;
      }
      .active {
        color: #fff;
        font-size: 16px;
      }
    }
    .right-box {
      flex: 0 0 100px;
      font-size: 14px;
      color: #fff;
      background-color: #535356;
      display: flex;
      justify-content: center;
      align-items: center;
      &.active {
        color: #fff;
        background: #35cb72;
      }
    }
  }
  .model {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .goods-list {
    background: #fff;
    position: fixed;
    bottom: 40px;
    z-index: 100;
    width: 100%;
    left: 0;
    display: flex;
    flex-direction: column;
    .title {
      flex: 0 0 30px;
      font-size: 12px;
      height: 30px;
      line-height: 30px;
      color: #67686a;
      background: #edeef1;
      display: flex;
      padding: 0 10px;
      box-sizing: border-box;
      justify-content: space-between;
      .iconfont {
        font-size: 12px;
      }
    }
    ul {
      flex: 1;
      box-sizing: border-box;
      max-height: 300px;
      overflow: scroll;
      li {
        width: 100%;
        display: flex;
        padding-left: 10px;
        box-sizing: border-box;
        height: 50px;
        border-bottom: 1px solid #ddd;
        .left {
          flex: 1;
          display: flex;
          .name {
            flex: 0 0 200px;
            overflow: hidden;
            width: 200px;
            line-height: 50px;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .price {
            flex: 1;
            display: flex;
            color: red;
            justify-content: flex-start;
            align-items: center;
          }
        }
        .control {
          flex: 0 0 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            font-size: 20px;
            padding: 5px;
            &.iconfont {
              color: #1989fa;
            }
          }
        }
      }
    }
  }
  // 淡入/淡出
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  // 滑入/滑出
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.5s;
  }
  .slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(100%);
  }
}
</style>