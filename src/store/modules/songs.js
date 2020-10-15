import { SONGS_SET, SONGS_INFO } from '../mutation-types'

import { setSongList, setSongInfo } from '../actions'

const state = {
  songList: localStorage.songList ? JSON.parse(localStorage.songList) : null,
  songInfo: localStorage.songInfo ? JSON.parse(localStorage.songInfo) : null,
}

const getters = {
}

const actions = {
  setSongList,
  setSongInfo
}

const mutations = {
  [SONGS_SET](state, songList) {
    localStorage.songList = JSON.stringify(songList)
    state.songList = songList
  },
  [SONGS_INFO](state, songInfo) {
    localStorage.songInfo = JSON.stringify(songInfo)
    state.songInfo = songInfo
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
