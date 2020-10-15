import request from '@lib/request'

// 获取banner信息
function GetBannerList() {
  return request.get('/banner?type=0').then((result) => {
    return result.data
  })
}

// 获取新歌推荐信息
function GetNewSongList() {
  return request.get('/personalized/newsong').then((result) => {
    return result.data
  })
}

// 获取MV信息
function GetMvList() {
  return request.get('/personalized/mv').then((result) => {
    return result.data
  })
}

// 获取歌曲列表
function GetSongsList({ }) {
  return request 
    .get('/personalized', {
      params: {
        limit: 10,
      },
    })
    .then((result) => {
      return result.data
    })
}

const PLAYLIST_LIMIT = 1000
// 获取教师列表
function GetUserMenuList({ uid }) {
  return request
    .get('/user/playlist', {
      params: {
        uid,
        limit: PLAYLIST_LIMIT,
      },
    })
    .then((result) => {
      return result.data
    })
}

export default {
  GetBannerList,
  GetNewSongList,
  GetMvList,
  GetSongsList,
  GetUserMenuList,
}
