//引入axiso接口封装文件
import axios from "./http"

//封装登录接口Api
export const loginApi = (params) => {
  return axios.post("/sys/login", params)
}
