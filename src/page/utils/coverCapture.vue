<style lang="less" scoped>
.homePage {
  width: 100%;
  height: 100%;
  padding: 18px;
  border-radius: 12px;
  box-sizing: border-box;
  background: #fff;
  position: relative;
  .upload {
    width: 100%;
    height: 120px;
  }
  .myCover {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    .pic {
      width: 375px;
      height: 210px;
      margin-right: 18px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
<template>
  <div class="homePage">
    <div class="upload">
      <Upload
        multiple
        type="drag"
        style="width:200px"
        :before-upload="UploadVideo"
        action=""
      >
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #24345f"></Icon>
          <p>点击或拖拽上传</p>
        </div>
      </Upload>
    </div>
    <div class="myCover">
      <div class="pic" v-for="(item, index) in showCoverArr" :key="index">
        <img :src="item" />
      </div>
    </div>
  </div>
</template>
<script>
// import schoolApi from '@/lib/api/school'
export default {
  name: "",
  data() {
    return {
      videoInfo: {
        url: "",
        play: false,
      },
      cutTime: [2, 10, 30],
      base64Arr: [],
      showCoverArr: [],
    };
  },
  created() {
    document.title = "教师管理";
  },

  methods: {
    UploadVideo(file) {
      this.base64Arr = [];
      this.showCoverArr = []
      console.log(file);
      if (!/^video\/mp4$/.test(file.type)) {
        this.$Message.warning("视频格式不正确，只支持“.mp4”");
        return false;
      }
      if (file.size / 1024 / 1024 > 100) {
        this.$Message.warning("视频大小不能超过100M");
        return false;
      }
      let url = URL.createObjectURL(file);
      this.videoInfo.src = url;
      console.log(url);
      this.cutTime.forEach((item, index) => {
        this.GetCoverPic(url, item, index);
      });
    },
    // eslint-disable-next-line no-unused-vars
    GetCoverPic(url, time, index) {
      let that = this;
      var video = document.createElement("video");
      video.src = url;
      video.style.cssText =
        "position:fixed; top:0; left:-100%; visibility:hidden";
      video.onloadeddata = function() {
        video.currentTime = time;
        video.addEventListener("timeupdate", function() {
          that.clipAndCompressCover({
            media: video,
            currentWidth: video.videoWidth,
            currentHeight: video.videoHeight,
            success: function(base64) {
              video.remove(video);
              that.base64Arr.push(base64);
              if (that.base64Arr.length == that.cutTime.length) {
                that.$Message.success("完成");
                that.showCoverArr = that.base64Arr;
              }
            },
          });
        });
        // video.currentTime = currentTime < 0 ? 1 : currentTime;
      };
      console.log(this.base64Arr);
    },
    clipAndCompressCover({ media, currentWidth, currentHeight, success }) {
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
        0,
        0,
        targetWidth,
        targetHeight
      );
      const base64 = canvas.toDataURL("image/jpeg", quality);
      success(base64);
    },
  },
};
</script>
