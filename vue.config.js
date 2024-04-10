const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_BASE_URL, // 目标服务器地址
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          // "^/api": "" // 重写路径，这里的意思是去掉路径中的'/api'前缀
          ["^" + process.env.VUE_APP_BASE_API]: " "
        }
      }
    }
  }
})
