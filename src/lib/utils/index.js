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
function clipAndCompressCover({ media, currentWidth, currentHeight, success }) {
    // eslint-disable-next-line no-unused-vars
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
    var handler = function() {
      const base64 = canvas.toDataURL("image/jpeg", quality);
      getMediaSize({ src: base64 }).then(response => {
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
  const GetVideoCover = ({ url, time, success }) => {
    const video1 = document.createElement("video");
    video1.src = url;
    video1.style.cssText = "position:fixed; top:0; left:-100%; visibility:hidden";
    video1.onloadeddata = function() {
      let currentTime = time; //截图时间点
      video1.addEventListener("timeupdate", function() {
        clipAndCompressCover({
          media: video1,
          currentWidth: video1.videoWidth,
          currentHeight: video1.videoHeight,
          success: function(base64) {
            video1.remove(video1);
            success({
              base64: base64
            })
          }
        });
      });
      video1.currentTime = currentTime < 0 ? 1 : currentTime;
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

        // eslint-disable-next-line no-unused-vars
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

export default {
    formateDate,
    clipAndCompressCover,
    GetVideoCover,
};