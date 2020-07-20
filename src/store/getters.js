import { IsNullOrEmpty } from '@lib/common'

export const isLogin = (state) => {
  return state && state.user && !IsNullOrEmpty(state.user.token)
}
