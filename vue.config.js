const path = require("path")

function resolve(dir) {
  return path.join(__dirname, dir)
}
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
  },
  chainWebpack(config) {
    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("prefetch")
    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end()
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end()
  }
})
