<style lang="less" scoped>
.camera_outer {
  .header {
    position: relative;
    width: 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    height: 48px;
    background: #fff;
    padding: 9px 10px;
    box-sizing: border-box;
    display: flex;
  }
  .content {
    width: 100%;
    min-height: 100px;
    background: #fff;
    padding: 20px 10px;
    box-sizing: border-box;
    .control {
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
    }
    .video_part {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .img_bg_camera {
      width: 500px;
      height: auto;
      img {
        width: 100%;
      }
    }
  }
  .footer {
    position: relative;
    height: 144px;
    width: 100%;
    background: #fff;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 48px 10px;
    box-sizing: border-box;
  }
}
</style>
<template>
  <div class="camera_outer">
    <div class="header">
      快来开启你的直播吧
    </div>
    <div class="content">
      <div class="control">
        <Slider v-model="value4" @on-change="VideoWidth()"></Slider>
      </div>
      <div class="video_part">
        <video
          id="videoCamera"
          v-show="startVideo"
          :width="videoWidth"
          :height="videoHeight"
          autoplay
        ></video>
        <canvas
          style="display:none;"
          id="canvasCamera"
          :width="videoWidth"
          :height="videoHeight"
        ></canvas>
      </div>
      <div v-if="imgSrc" class="img_bg_camera">
        <img :src="imgSrc" alt="" class="tx_img" />
      </div>
    </div>

    <div class="footer">
      <Button @click="getCompetence()">打开摄像头</Button>
      <Button @click="stopNavigator()">关闭摄像头</Button>
      <Button @click="ClearImg()">删除照片</Button>
      <Button @click="setImage()">拍照</Button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value4: 100,
      startVideo: false,
      videoWidth: 1000,
      videoHeight: 618,
      imgSrc: "",
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
    };
  },
  // beforeRouteLeave(to, from, next) {
  //   const role = "user";
  //   let roles = to.meta.roles.join('');
  //   console.log(roles,roles.includes(role))
  //   if (roles.includes(role) === true) {
  //     next(); //放行
  //   } else {
  //     next({
  //       path: "/404",
  //     }); //跳到404页面
  //   }
  // },
  // beforeRouteEnter(to, from, next) {
  //   let role = 3
  //   if (role != 1 && role != 2) {
  //     next({
  //       path: "/404",
  //     }); //跳到404页面
  //   }else {
  //     next(); //放行
  //   }
  // },
  methods: {
    // 调用权限（打开摄像头功能）
    getCompetence() {
      this.startVideo = true;
      var _this = this;
      this.thisCancas = document.getElementById("canvasCamera");
      this.thisContext = this.thisCancas.getContext("2d");
      this.thisVideo = document.getElementById("videoCamera");
      // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia =
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.getUserMedia;
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      var constraints = {
        audio: false,
        video: {
          width: this.videoWidth,
          height: this.videoHeight,
          transform: "scaleX(-1)",
        },
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
          // 旧的浏览器可能没有srcObject
          if ("srcObject" in _this.thisVideo) {
            _this.thisVideo.srcObject = stream;
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream);
          }
          _this.thisVideo.onloadedmetadata = function(e) {
            console.log(e);
            _this.thisVideo.play();
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //  绘制图片（拍照功能）
    setImage() {
      var _this = this;
      // 点击，canvas画图
      _this.thisContext.drawImage(
        _this.thisVideo,
        0,
        0,
        _this.videoWidth,
        _this.videoHeight
      );
      // 获取图片base64链接
      var image = this.thisCancas.toDataURL("image/png");
      _this.imgSrc = image;
      this.$emit("refreshDataList", this.imgSrc);
    },
    // base64转文件
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(",");
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    // 关闭摄像头
    stopNavigator() {
      this.startVideo = false;
      this.thisVideo.srcObject.getTracks()[0].stop();
    },
    ClearImg() {
      this.imgSrc = "";
    },
    VideoWidth() {
      console.log(this.value4);
      this.videoWidth = this.value4 * 10;
      this.videoHeight = this.value4 * 6.18;
    },
  },
};
</script>
