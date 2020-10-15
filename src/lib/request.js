import axios from 'axios'
import store from '@src/store'
import { HTTP_CODE } from '@lib/const.js'
import Vue from 'vue'
import Router from '@src/router'
import { LOGIN_OUT } from '@src/store/mutation-types'
// import auth from '@lib/utils/auth.js'
const env = process.env.NODE_ENV
function IsTest() {
  let hostUrl = window.location.href
  return hostUrl.indexOf('vue.manageplatform.com') == -1
}
//请求的接口地址--自定义
const HOST =
  env === 'development'
    ? 'https://api.mtnhao.com/'
    : IsTest() == true
    ? 'https://api.mtnhao.com/'
    : 'https://api.mtnhao.com/'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

const request = axios.create({
  baseURL: HOST,
  timeout: 30000
})

request.defaults.headers.post['Content-Type'] = 'application/json'

request.interceptors.request.use(config => {
  if (config.cancel) {
    config.cancelToken = source.token
    source.cancel()
  }

  config.url = subSplash(config.url)
  // token验证
  if (store.getters.isLogin == true) {
    const token = store.state.user.user.token
    if (token && config.noToken !== true) {
      if (config.method === 'get') {
        config.params = { ...config.params, token }
      } else if (config.method === 'post') {
        if (config.headers['Content-Type'] == 'multipart/form-data') {
          config.data.append('token', token)
        } else {
          config.data = { ...config.data, token }
        }
      }
    }
  }

//   if (config.needSign) {
//     if (!config.data) {
//       config.params = auth.Auth(config.params)
//     } else {
//       config.data = auth.Auth(config.data)
//     }
//   }

  return config
})

request.interceptors.response.use(
  response => {
    // 错误统一拦截
    if (parseInt(response.data.status) === HTTP_CODE.Unauthorized) {
      store.commit(LOGIN_OUT)
      new Vue().$Message.error({
        content: '登录已过期，请重新登录',
        onClose: () => {
          Router.push({
            name: 'index'
          })
        }
      })
      return Promise.reject(response.data.msg)
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

// 删除restapi末尾的反斜杠
function subSplash(url) {
  return url.endsWith('/') ? url.slice(0, -1) : url
}

export default request
