import axios from "axios"
import { Loading } from "element-ui"
import { GetCookie, RemoveCookie } from "./auth"
import router from "@/router"
const baseURLs = process.env.VUE_APP_BASE_API
// 搭建实例
const instance = axios.create({
  baseURL: baseURLs,
  timeout: 1000 * 8,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
})

//设置响应拦截器和请求拦截器

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers["Authorization"] = "Bearer" + " " + GetCookie()
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.code === 10002 && response.status == 200) {
      router.push({
        path: "/login"
      })
      RemoveCookie()
    }
    Loading.service().close()
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default instance
