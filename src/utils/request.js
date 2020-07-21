/**
 * created by youshiwei on 2020/07/20
 * 
 */

// 引入axios 和 qs
import axios from "axios";
import qs from "qs";

// 服务器地址 写上以后 所有的请求 会自动在前面拼接这个地址
axios.defaults.baseURL = "http://127.0.0.1:5000";
axios.defaults.timeout = 5000; // 超时

// 通用的get请求和post请求
export default {
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios
                .get(url, { params })
                .then((response) => {
                    resolve(response.data); // 成功
                })
                .catch((err) => {
                    reject(err); // 失败
                });
        });
    },
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios
                .post(url, qs.stringify(params))
                .then((response) => {
                    resolve(response.data); // 成功
                })
                .catch((err) => {
                    reject(err); // 失败
                });
        });
    },
};
