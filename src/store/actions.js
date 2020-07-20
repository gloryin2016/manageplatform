import loginapi from '@lib/api/user/login.js'
import * as types from './mutation-types.js'

import { HTTP_CODE } from '@lib/const.js'

export const login = ({ commit }, user) => {
  return loginapi.Login(user).then(result => {
    if (parseInt(result.status) === HTTP_CODE.StatusOK) {
      commit(types.MEMCACHE_LOGIN, result.data)
      commit(types.ACCOUNT_LOGIN, user)
    }
    return {
      success: parseInt(result.status) === HTTP_CODE.StatusOK,
      message: result.msg
    }
  })
}


export const signOut = ({ commit }) => {
  commit(types.LOGIN_OUT)
}
