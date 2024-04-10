import Cookies from "js-cookie"

/**后面的名字要和接口文档对齐 */
const token = "Authorization"
/***
 * 需求: 是将token风道cookie中,
 * set 设置
 * get 读取
 * remove 移除
 */
//cookie储存方法封装
export const SetCookie = (value) => {
  return Cookies.set(token, value)
}

//cookie获取方法封装

export const GetCookie = () => {
  return Cookies.get(token)
}

//cookie清除方法封装
export const RemoveCookie = () => {
  return Cookies.remove(token)
}
