const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // 配置反向代理
  devServer: {
    proxy: {
      // 1. 普通写法
      // '/ajax': {
      //   target: 'https://i.maoyan.com',
      //   changeOrigin: true
      // }
      // 2. 防止重名的写法
      '/yang': {
        target: 'https://i.maoyan.com',
        changeOrigin: true,
        pathReWrite: {
          '^/yang': ''
        }
      }
    }
  }
})
