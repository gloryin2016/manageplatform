const commonJs = {}
import songsApi from "@/lib/api/songs";

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

/**
 * @author Der
 * @time 2020年10月19日
 *
 * 判断浏览器类型
 * @name MyBrowser
 * @example 判断浏览器类型
 */
const MyBrowser = () => {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 &&
        userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 &&
        userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1 &&
        userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return "IE7";
        } else if (fIEVersion == 8) {
            return "IE8";
        } else if (fIEVersion == 9) {
            return "IE9";
        } else if (fIEVersion == 10) {
            return "IE10";
        } else if (fIEVersion == 11) {
            return "IE11";
        } else {
            return "0";
        } //IE版本过低
        return "IE";
    }
    if (isOpera) {
        return "Opera";
    }
    if (isEdge) {
        return "Edge";
    }
    if (isFF) {
        return "FF";
    }
    if (isSafari) {
        return "Safari";
    }
    if (isChrome) {
        return "Chrome";
    }

}

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

/**
 * @author Der
 * @time 2020年10月19日
 *
 * 获取用户环境
 * @name GetUserApp
 * @example 
 */
const GetUserApp = () => {
    let ua = window.navigator.userAgent.toLowerCase();
    let isWx = ua.indexOf("micromessenger") != -1;
    let isQQ = ua.indexOf("qq") != -1;
    let isWeibo = ua.indexOf("weibo") != -1;
    let app = isWx ? "wx" : isQQ ? "qq" : isWeibo ? "weibo" : "wx";
    return app
}

/**
 * @author Der
 * @time 2020年10月27日
 *
 * 获取两个时间差
 * @name TimeSpan
 * @example 
 */
const TimeSpan = (before, after) => {
    let dateBegin = new Date(before)
    let dateEnd = new Date(after)
    let dateDiff = dateEnd.getTime() - dateBegin.getTime()
    let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)) //计算出相差天数
    let dayMSSpan = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    let hours = Math.floor(dayMSSpan / (3600 * 1000)) //计算出小时数
    //计算相差分钟数
    let hourMSSpan = dayMSSpan % (3600 * 1000) //计算小时数后剩余的毫秒数
    let minutes = Math.floor(hourMSSpan / (60 * 1000)) //计算相差分钟数
    //计算相差秒数
    let minutesMSSpan = hourMSSpan % (60 * 1000) //计算分钟数后剩余的毫秒数
    let seconds = Math.round(minutesMSSpan / 1000)
    return {
        days: dayDiff,
        hours,
        minutes,
        seconds
    }
}

/**
 *
 * @author qianzhaoliang
 * @time 2019年10月15日
 *
 * 时间转换格式化日期
 * @name timestampToDate
 * @param {Number | String} time 时间字符串或时间戳
 * @param {String} fmt 转化之后的时间格式
 * @description 年(y)可以用 1-4 个占位符， 月(M)、日(d)、小时(h)、分(m)、秒(s) 可以用 1-2 个占位符， 毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @example DateFormat(1571124804201)
 * @return
 * '2019-10-15 15:33:24'
 */
const DateFormat = function (fmt = 'yyyy-MM-dd hh:mm:ss') {
    let o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'h+': this.getHours(), //小写小时
        'H+': this.getHours(), //大写小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            )
        }
    }
    return fmt
}

/**
 * @author wangqi
 * @time 2019年10月24日
 * @name LoadJs
 * @description 动态加载js
 * @callback  function
 */
const LoadJs = (url, callback) => {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    if (typeof callback == 'function') {
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == 'loaded' || script.readyState == 'complete') {
                    script.onreadystatechange = null
                    callback()
                }
            }
        } else {
            script.onload = function () {
                callback()
            }
        }
    }
    script.src = url
    document.body.appendChild(script)
}


commonJs.TimeToString = TimeToString
commonJs.TimeSpan = TimeSpan
commonJs.DateFormat = DateFormat
commonJs.TimeToSeconds = TimeToSeconds
commonJs.ToSeconds = ToSeconds
commonJs.GetSongPlayUrl = GetSongPlayUrl
commonJs.MyBrowser = MyBrowser
commonJs.GetCover = GetCover
commonJs.GetUserApp = GetUserApp
commonJs.LoadJs = LoadJs

export default commonJs