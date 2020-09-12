const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : '/'

module.exports = {
  publicPath: BASE_URL,
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('vue$', resolve('node_modules/vue/dist/vue.js'))
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
    config.module
      .rule('js')
      .test(/\.jsx?$/)
      .exclude
      .add(resolve('src/assets/iview-pro'))
      .end()
  },
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    proxy: ''
  },
  /**
   * 开启Vue.js devtools调试
   */
  configureWebpack: {
    devtool: 'souce-map'
  }
}
