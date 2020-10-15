const songsJs = {}
import songsApi from "@/lib/api/songs";

/**
 * @author Der
 * @time 2020年10月15日
 *
 * 获取歌曲封面
 * @name GetCover
 * @example 
 * @param {id} id 歌曲id
 */
const GetCover = (id) => {
    songsApi
        .GetAlbumInfo({
            id: id,
        })
        .then((res) => {
            console.log(res)
            return res.album.picUrl;
        });
}

songsJs.GetCover = GetCover

export default songsJs