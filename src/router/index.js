import Vue from "vue"
import VueRouter from "vue-router"
import HomeView from "../views/HomeView.vue"
import { GetCookie } from "../utils/auth"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    redirect: "/index" // 重定向:登陆后直接跳转主页
  },
  {
    //登录页路由配置
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue")
  },
  {
    //主页路由配置
    path: "/index",
    name: "index",
    component: () => import("../views/IndexView.vue"),
    redirect: "/indexs",
    children: [
      {
        path: "/approval",
        name: "approval",
        component: () => import("../views/demo-compent/ApprovalView.vue")
      },
      {
        path: "/attendance",
        name: "attendance",
        component: () => import("../views/demo-compent/AttendanceView.vue")
      },
      {
        path: "/company",
        name: "company",
        component: () => import("../views/demo-compent/CompanySettings.vue")
      },
      {
        path: "/indexs",
        name: "indexs",
        component: () => import("../views/demo-compent/IndexsView.vue")
      },
      {
        path: "/organization",
        name: "organization",
        component: () => import("../views/demo-compent/OrganizationView.vue")
      },
      {
        path: "/permission",
        name: "permission",
        component: () => import("../views/demo-compent/PermissionSettings.vue")
      },
      {
        path: "/social",
        name: "social",
        component: () => import("../views/demo-compent/SocialSecurity.vue")
      },
      {
        path: "/staff",
        name: "staff",
        component: () => import("../views/demo-compent/StaffView.vue")
      },
      {
        path: "/wages",
        name: "wages",
        component: () => import("../views/demo-compent/WagesView.vue")
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

//路由守卫，进行路由鉴权
router.beforeEach((to, from, next) => {
  if (GetCookie() || to.path == "/login") {
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
