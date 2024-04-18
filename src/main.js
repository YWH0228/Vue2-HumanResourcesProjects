import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import e from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "@/icons"
import ElementLocale from "element-ui/lib/locale"
import i18n from "./language/index"
import "../src/utils/theme/index.css"

ElementLocale.i18n((key, value) => i18n.t(key, value))
Vue.config.productionTip = false
Vue.use(e)

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount("#app")
