import { SONGS_SET, RECORD_SET, SONGS_INFO, CLEAR_SONG } from '../mutation-types'

import { setSongList, pushSongRecord, setSongInfo, clearSongInfo } from '../actions'

const state = {
  songList: localStorage.songList ? JSON.parse(localStorage.songList) : null,
  songHistory: localStorage.songHistory ? JSON.parse(localStorage.songHistory) : [],
  songInfo: localStorage.songInfo ? JSON.parse(localStorage.songInfo) : null,
}

const getters = {
}

const actions = {
  setSongList,
  pushSongRecord,
  setSongInfo,
  clearSongInfo
}

const mutations = {
  [SONGS_SET](state, songList) {
    localStorage.songList = JSON.stringify(songList)
    state.songList = songList
  },
  [RECORD_SET](state, pushSongRecord) {
    localStorage.songHistory = JSON.stringify(pushSongRecord)
    state.songHistory = pushSongRecord
  },
  [SONGS_INFO](state, songInfo) {
    localStorage.songInfo = JSON.stringify(songInfo)
    state.songInfo = songInfo
  },
  [CLEAR_SONG](state) {
    localStorage.removeItem('songHistory')
    state = null
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
