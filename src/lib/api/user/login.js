// 登录相关api
import request from '@/lib/request'

// 登录
// @username 用户名
// @password 密码
//@/manageplatform/login 自定义的后端接口路由--按需替换
// =>token 返回token
function Login({ username, password }) {
  return request
    .post('/manageplatform/login', {
      account: username,
      password: password,
    })
    .then((response) => {
      return response.data
    })
}

export default {
  Login,
}
