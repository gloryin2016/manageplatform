import Compressor from "compressorjs";
import api from "@lib/api/songs/index";

/**
 *                                         ,s555SB@@&                          
 *                                      :9H####@@@@@Xi                        
 *                                     1@@@@@@@@@@@@@@8                       
 *                                   ,8@@@@@@@@@B@@@@@@8                      
 *                                  :B@@@@X3hi8Bs;B@@@@@Ah,                   
 *             ,8i                  r@@@B:     1S ,M@@@@@@#8;                 
 *            1AB35.i:               X@@8 .   SGhr ,A@@@@@@@@S                
 *            1@h31MX8                18Hhh3i .i3r ,A@@@@@@@@@5               
 *            ;@&i,58r5                 rGSS:     :B@@@@@@@@@@A               
 *             1#i  . 9i                 hX.  .: .5@@@@@@@@@@@1               
 *              sG1,  ,G53s.              9#Xi;hS5 3B@@@@@@@B1                
 *               .h8h.,A@@@MXSs,           #@H1:    3ssSSX@1                  
 *               s ,@@@@@@@@@@@@Xhi,       r#@@X1s9M8    .GA981               
 *               ,. rS8H#@@@@@@@@@@#HG51;.  .h31i;9@r    .8@@@@BS;i;          
 *                .19AXXXAB@@@@@@@@@@@@@@#MHXG893hrX#XGGXM@@@@@@@@@@MS        
 *                s@@MM@@@hsX#@@@@@@@@@@@@@@@@@@@@就知道改需求@@@@@@@@@&,      
 *              :GB@#3G@@Brs ,1GM@@@@@@@@@@@@@@就知道改需求@@@@@@@@@@@@@B,     
 *            .hM@@@#@@#MX 51  r;iSGAM@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8     
 *          :3B@@@@@@@@@@@&9@h :Gs   .;sSXH@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:    
 *      s&HA#@@@@@@@@@@@@@@M89A;.8S.       ,r3@@@@@@@@@@@@@@@@@@@@@@@@@@@r    
 *   ,13B@@@@@@@@@@@@@@@@@@@5 5B3 ;.         ;@@@@@@@@@@@@@@@@@@@@@@@@@@@i    
 *  5#@@#&@@@@@@@@@@@@@@@@@@9  .39:          ;@@@@@@@@@@@@@@@@@@@@@@@@@@@;    
 *  9@@@X:MM@@@@@@@@@@@@@@@#;    ;31.         H@@@@@@@@@@@@@@@@@@@@@@@@@@:    
 *   SH#@B9.rM@@@@@@@@@@@@@B       :.         3@@@@@@@@@@@@@@@@@@@@@@@@@@5    
 *     ,:.   9@@@@@@@@@@@#HB5                 .M@@@@@@@@@@@@@@@@@@@@@@@@@B    
 *           ,ssirhSM@&1;i19911i,.             s@@@@@@@@@@@@@@@@@@@@@@@@@@S   
 *              ,,,rHAri1h1rh&@#353Sh:          8@@@@@@@@@@@@@@@@@@@@@@@@@#:  
 *            .A3hH@#5S553&@@#h   i:i9S          #@@@@@@@@@@@@@@@@@@@@@@@@@A.
 *
 *
 */

const formateDate = ({
  time,
  success
}) => {
  var y = time.getFullYear();
  var m = time.getMonth() + 1; // 注意 JavaScript 月份+1
  var d = time.getDate();
  var h = time.getHours();
  var min = time.getMinutes();
  var s = time.getSeconds();
  let newDate = y + "-" + m + "-" + d + " " + h + ":" + min + ":" + s;
  success({
    time: newDate
  })
}

//压缩图片
function clipAndCompressCover({
  media,
  currentWidth,
  currentHeight,
  success
}) {
  const that = this;
  const canvas = document.createElement("canvas");
  const area = canvas.getContext("2d");
  const currentScale = currentWidth / currentHeight;
  const targetScale = 750 / 420;
  let targetWidth = 0;
  let targetHeight = 0;
  let clipWidth = 0;
  let clipHeight = 0;
  let quality = 0.95; // 不要用1，会额外增大base64大小。

  // 根据视频宽高，决定截图大小
  if (currentScale >= targetScale) {
    targetHeight = currentHeight > 420 ? 420 : currentHeight;
    targetWidth = targetHeight * currentScale;
  } else {
    targetWidth = currentWidth > 750 ? 750 : currentWidth;
    targetHeight = targetWidth / currentScale;
  }
  clipWidth = targetWidth > 750 ? 750 : targetWidth;
  clipHeight = targetHeight > 420 ? 420 : currentHeight;
  canvas.width = clipWidth;
  canvas.height = clipHeight;

  area.drawImage(
    media,
    (clipWidth - targetWidth) / 2,
    (clipHeight - targetHeight) / 2,
    targetWidth,
    targetHeight
  );
  var handler = function () {
    const base64 = canvas.toDataURL("image/jpeg", quality);
    getMediaSize({
      src: base64
    }).then(response => {
      if (response.size / 1024 > 100) {
        quality -= 0.1;

        if (quality > 0.2) {
          handler();
        }
      } else {
        success && success(base64);
      }
    });
  };
  handler();
}

//绘制视频封面图片
const GetVideoCover = ({
  url,
  time,
  success
}) => {
  const video1 = document.createElement("video");
  video1.src = url;
  video1.style.cssText = "position:fixed; top:0; left:-100%; visibility:hidden";
  video1.onloadeddata = function () {
    let currentTime = time; //截图时间点
    let duration = video1.duration
    video1.addEventListener("timeupdate", function () {
      clipAndCompressCover({
        media: video1,
        currentWidth: video1.videoWidth,
        currentHeight: video1.videoHeight,
        success: function (base64) {
          video1.remove(video1);
          success({
            base64: base64
          })
        }
      });
    });
    video1.currentTime = currentTime * duration;
  };
  // edge浏览器必须要追加到dom中，才能顺利执行相关事件。
  document.body.appendChild(video1);
};

// 获取媒体资源的大小，返回一个Promise对象。用于解决无法直接获取视频或图片的文件大小。
function getMediaSize({
  src
}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = _ => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          resolve({
            size: xhr.response.size
          });
        } else {
          reject();
        }
      }
    };

    xhr.open('get', URL.createObjectURL(transformBase64ToBlob(src)));
    xhr.responseType = 'blob';
    xhr.send();
  });
}

function transformBase64ToBlob(base64) {
  let byteString;

  if (base64.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(base64.split(',')[1]);
  } else {
    byteString = unescape(base64.split(',')[1]);
  }

  const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
  const ia = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ia], {
    type: mimeString
  });

  return blob;
}

/**
 * @author Der
 * @time 2020年10月20日
 *
 * 获取封面
 * @name GetSongCover
 * @example 
 * @param {int} id 专辑id
 */
const GetSongCover = ({ id, success }) => {
  api.GetAlbumInfo({
    id,
    success: response => {
      success({
        songCover: response.res.album.picUrl
      });
    }
  });
};

export default {
  formateDate,
  clipAndCompressCover,
  GetVideoCover,
  GetSongCover
};