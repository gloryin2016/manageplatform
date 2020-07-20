import { MEMCACHE_LOGIN, LOGIN_OUT, ACCOUNT_LOGIN } from '../mutation-types'

import { login, signOut } from '../actions'
import { isLogin } from '../getters'

const state = {
  user: localStorage.user ? JSON.parse(localStorage.user) : null,
}

const getters = {
  isLogin,
}

const actions = {
  login,
  signOut,
}

const mutations = {
  [MEMCACHE_LOGIN](state, user) {
    localStorage.user = JSON.stringify(user)
    state.user = user
  },
  [LOGIN_OUT](state) {
    localStorage.removeItem('user')
    state.user = null
  },
  [ACCOUNT_LOGIN](state, account) {
    localStorage.account = JSON.stringify(account)
    state.account = account
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
