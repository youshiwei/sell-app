import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Goods from "@/views/Goods.vue"

// 路由配置
const routes = [
  {
    path: "/",
    redirect: "/goods"
  },
  {
    path: "/goods",
    component: Goods
  },
  {
    path: "/ratings",
    component: () => import("@/views/Ratings.vue")
  },
  {
    path: "/seller",
    component: () => import("@/views/Seller.vue")
  },
]

const router = new VueRouter({
  routes
})

export default router
