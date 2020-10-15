import request from '@lib/request'

function SearchSongs({
    pageSize,
    start,
    keywords
}) {
    return request
        .get('/search', {
            params: {
                limit: pageSize,
                offset: start,
                keywords,
            },
        })
        .then((result) => {
            return result.data
        })
}

function GetAlbumInfo({
    id
}) {
    return request
        .get('/album', {
            params: {
                id,
            },
        })
        .then((result) => {
            return result.data
        })
}

export default {
    SearchSongs,
    GetAlbumInfo
}