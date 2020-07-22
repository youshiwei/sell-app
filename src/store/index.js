import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goodsList: []
  },
  mutations: {
    // 获取商品列表
    GET_GOODS(state, payload) {
      state.goodsList = payload
    },
    // 改变商品数量
    CHANGE_COUNT(state, payload) {
      for (let v of state.goodsList) {
        for (let food of v.foods) {
          if (food.name === payload.name) {
            food.count += payload.num;
          }
        }
      }
    },
    // 清空购物车（商品数量）
    CLEARALL(state) {
      for (let v of state.goodsList) {
        for (let food of v.foods) {
          food.count = 0;
        }
      }
    }

  },
  getters: {
    // 购物车数据
    SHOP_CART(state) {
      let arr = []
      for (let v of state.goodsList) {
        for (let food of v.foods) {
          if (food.count > 0) {
            arr.push(food)
          }
        }
      }
      // 数组对象去重
      let newArr = []
      let newobj = {}
      for (let v of arr) {
        if (!newobj[v.name]) {
          newobj[v.name] = "xxx"
          newArr.push(v)
        }
      }
      // 计算总价
      let allPrice = 0
      newArr.forEach(v => {
        allPrice += v.price * v.count
      })
      allPrice = allPrice.toFixed(2)
      // 计算商品总数量
      let allTotal = 0
      newArr.forEach(v => {
        allTotal += v.count
      })

      return { newArr, allPrice, allTotal }

    }
  },
  actions: {
  },
  modules: {
  }
})
