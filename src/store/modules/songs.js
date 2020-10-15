import { SONGS_SET } from '../mutation-types'

import { setSongList } from '../actions'

const state = {
  songList: localStorage.songList ? JSON.parse(localStorage.songList) : null,
}

const getters = {
}

const actions = {
  setSongList,
}

const mutations = {
  [SONGS_SET](state, songList) {
    localStorage.songList = JSON.stringify(songList)
    state.songList = songList
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
