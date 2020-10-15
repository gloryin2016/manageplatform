const commonJs = {}

/**
 * @author Der
 * @time 2020年10月12日
 *
 * 秒值转时分秒
 * @name TimeToString
 * @example 秒值转时分秒
 * @param {String} seconds 秒
 */
const TimeToString = (seconds) => {
    let param = parseInt(seconds);
    let hh = "",
        mm = "",
        ss = "";
    if (param >= 0 && param < 60) {
        param < 10 ? (ss = "0" + param) : (ss = param);
        return "00:" + ss;
    } else if (param >= 60 && param < 3600) {
        mm = parseInt(param / 60);
        mm < 10 ? (mm = "0" + mm) : mm;
        param - parseInt(mm * 60) < 10 ?
            (ss = "0" + String(param - parseInt(mm * 60))) :
            (ss = param - parseInt(mm * 60));
        return mm + ":" + ss;
    }
}

/**
 * @author Der
 * @time 2020年10月13日
 *
 * 00:00.00转秒
 * @name TimeToSeconds
 * @example 00:00.00转秒
 * @param {String} time 秒
 */
const TimeToSeconds = (time) => {
    // 格式化歌词的时间 转换成 sss:ms
    const regMin = /.*:/;
    const regSec = /:.*\./;
    const regMs = /\./;

    const min = parseInt(time.match(regMin)[0].slice(0, 2));
    let sec = parseInt(time.match(regSec)[0].slice(1, 3));
    const ms = time.slice(
        time.match(regMs).index + 1,
        time.match(regMs).index + 3
    );
    if (min !== 0) {
        sec += min * 60;
    }
    return Number(sec + "." + ms);
}

/**
 * @author Der
 * @time 2020年10月14日
 *
 * 00:00.00转秒
 * @name ToSeconds
 * @example 00:00.00转秒
 * @param {String} t 秒
 */
const ToSeconds = (t) => {
    var s = 0.0;
      if (t) {
        var p = t.split(":");
        for (let i = 0; i < p.length; i++) {
          s = s * 60 + parseFloat(p[i].replace(",", "."));
        }
      }
      return s;
}

/**
 * @author Der
 * @time 2020年10月14日
 *
 * 获取歌曲地址
 * @name GetSongPlayUrl
 * @example 获取歌曲地址
 * @param {number} id 歌曲id
 */
const GetSongPlayUrl = (id) => {
    return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}


commonJs.TimeToString = TimeToString
commonJs.TimeToSeconds = TimeToSeconds
commonJs.ToSeconds = ToSeconds
commonJs.GetSongPlayUrl = GetSongPlayUrl

export default commonJs