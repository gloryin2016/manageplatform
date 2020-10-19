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

export const clearSongInfo = ({ commit }) => {
  commit(types.CLEAR_SONG)
}

//存入搜索列表
export const setSongList = ({ commit }, songList) => {
  commit(types.SONGS_SET,songList)
}

//存入搜索列表
export const pushSongRecord = ({ commit }, pushSongRecord) => {
  commit(types.RECORD_SET,pushSongRecord)
}

//存入当前播放歌曲
export const setSongInfo = ({ commit }, songInfo) => {
  commit(types.SONGS_INFO,songInfo)
}
