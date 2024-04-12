//引入axiso接口封装文件
import axios from "../utils/http"

//封装登录接口Api
export const loginApi = (params) => {
  return axios.post("/sys/login", params)
}

//获取用户基本信息

export const getUserInfoApi = (params) => {
  return axios.post("/sys/profile", params)
}

//获取组织结构列表
export const getOrganizationListApi = (params) => {
  return axios.get("/company/department", { params })
}
