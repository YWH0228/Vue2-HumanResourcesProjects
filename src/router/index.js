import Vue from "vue"
import VueRouter from "vue-router"
import HomeView from "../views/HomeView.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    redirect: "/index" // 重定向:重新指向其它path,会改变网址
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue")
  },
  {
    path: "/index",
    name: "index",
    component: () => import("../views/IndexView.vue")
  }
]

const router = new VueRouter({
  routes
})

//路由守卫，进行路由鉴权
router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem("token") || to.path == "/login") {
    next()
  } else {
    next("/login")
  }
})

//配置router ，防止出现跳转同意路由地址出现页面报错现象
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
export default router
