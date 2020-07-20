/**
 * 封装ajax请求函数
 */
import req from "@/utils/request"

// 获取商品列表
export function getGoods() {
    return req.get("/goods/goods_list")
}
export function getSeller() {
    return req.get("/shop/seller")
}
export function getRatings() {
    return req.get("/shop/ratings")
}