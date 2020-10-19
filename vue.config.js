var path = require('path')

const ENV = process.env.NODE_ENV
// console.log(ENV)

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  //关闭eslint规范
  lintOnSave: false,
  devServer: {
    port: 8090,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://localhost:8090',
        pathRewrite: {
          '^/api': '/hock'
        }
      }
    }
  },
  chainWebpack: config => {
    // 参考 https://cli.vuejs.org/zh/guide/webpack.html#%E9%93%BE%E5%BC%8F%E6%93%8D%E4%BD%9C-%E9%AB%98%E7%BA%A7
    // git: https://github.com/neutrinojs/webpack-chain
    // 通用配置区域

    // 配置别名
    config.resolve.alias
      .set('@src', resolve('src')) // 代码根目录
      .set('@components', resolve('src/components')) // 代码组件目录
      .set('@lib', resolve('src/lib')) // 代码接口层根目录
      .set('@style', resolve('src/style')) // 代码通用样式目录
      .set('@page', resolve('src/page')) // 业务代码目录
      .set('@assets', resolve('src/assets')) // 资源目录
      .set('@public', resolve('public'))
    // 环境配置区域
    if (ENV == 'development') {
      // 开发环境配置
    } else if (ENV == 'production') {
      // 部署环境配置
    }
  }
}
