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
//组织结构添加

export const addOrganizationApi = (params) => {
  console.log(params, "123456789")
  return axios.post("/company/department", params)
}

//获取员工列表

export const getEmployeeApi = (params) => {
  return axios.get("/sys/user", { params })
}

//获取角色列表
export const getRoleListApi = (params) => {
  return axios.get("/sys/role", { params })
}

//增加角色
export const addRoleApi = (params) => {
  return axios.post("/sys/role", params)
}
//编辑角色
export const editRoleApi = (id, params) => {
  console.log(params)
  return axios.put("/sys/role/" + id, params)
}

//删除角色
export const deleteRoleApi = (id) => {
  console.log(id)
  return axios.delete("/sys/role/" + id)
}

//获取所有权限
export const getPermissionListApi = (params) => {
  return axios.get("/sys/permission", { params })
}

//获取所有权限点
export const getPermissionPointListApi = (params) => {
  return axios.get("/sys/permission", { params })
}

//添加权限点
export const addPermissionPointApi = (params) => {
  return axios.post("/sys/permission", params)
}

//删除权限点
export const deletePermissionPointApi = (id, params) => {
  console.log(id)
  return axios.delete(`"/sys/permission/"` + id, params)
}

//获取社保列表
export const getSocialSecurityListApi = (params) => {
  return axios.post("/social_securitys/list", params)
}
