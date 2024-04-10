import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import e from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "@/assets/iconfont/iconfont.css"

Vue.config.productionTip = false
Vue.use(e)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
