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
  #video {
    width: 1000px;
    position: absolute;
    top: -1000px;
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
    <Button @click="cutVideoCover(0)">裁剪</Button>
    <div class="myCover">
      <div class="pic" v-for="(item, index) in showCoverArr" :key="index">
        <img :src="item" />
      </div>
    </div>
    <video id="video" src=""></video>
    <canvas style="display:none;" id="canvasCamera"></canvas>
  </div>
</template>
<script>
// import schoolApi from '@/lib/api/school'
import utilsTool from "@/lib/utils/index";
import { setTimeout } from 'timers';
export default {
  name: "",
  data() {
    return {
      videoInfo: {
        url: "",
        play: false,
      },
      cutTime: ["10", "18"],
      showCoverArr: [],
      //手动剪裁绘制
      videoWidth: 750,
      videoHeight: 420,
      imgSrc: "", //裁剪后的base64编码，确定之后需要再调用方法上传到七牛
      Canvas: null,
      thisContext: null,
      thisVideo: null,
    };
  },
  created() {
    document.title = "教师管理";
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    const video = document.getElementById("video");
  },

  methods: {
    UploadVideo(file) {
      this.showCoverArr = [];
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
      // eslint-disable-next-line no-undef
      video.src = url;
      // eslint-disable-next-line no-undef
      video.play();
    },
    // eslint-disable-next-line no-unused-vars
    // 视频封面截图（传入截屏时间点）
    cutVideoCover(index) {
      let that = this;
      // eslint-disable-next-line no-undef
      video.onloadeddata = function() {
        console.log("准备就绪");
      };
      let currentTime = that.cutTime[index]; //截图时间点
      console.log("currentTime", currentTime);
      // eslint-disable-next-line no-undef
      video.currentTime = currentTime;
      setTimeout(()=>{
        this.GetPic(index);
      },100)
    },
    GetPic(index) {
      let that = this
      utilsTool.clipAndCompressCover({
        // eslint-disable-next-line no-undef
        media: video,
        // eslint-disable-next-line no-undef
        currentWidth: video.videoWidth,
        // eslint-disable-next-line no-undef
        currentHeight: video.videoHeight,
        success: function(base64) {
          that.showCoverArr.push(base64);
          if (that.showCoverArr.length < that.cutTime.length) {
            that.cutVideoCover((index += 1));
          } else {
            that.$Message.success("裁剪完成");
          }
        },
      });
    },
    //手动裁剪
    CanvasCutVideo(canvasId = "canvasCamera", videoId = "video", callback) {
      let canvas_dom = document.getElementById(canvasId);
      this.Canvas = canvas_dom;
      this.thisContext = canvas_dom.getContext("2d");
      let video_dom = document.getElementById(videoId);
      this.thisVideo = video_dom;
      canvas_dom.width = video_dom.videoWidth;
      canvas_dom.height = video_dom.videoHeight;
      this.videoWidth = video_dom.videoWidth;
      this.videoHeight = video_dom.videoHeight;
      let that = this;
      //canvas画图----开始绘制
      that.thisContext.drawImage(
        that.thisVideo,
        0,
        0,
        that.videoWidth,
        that.videoHeight
      );
      // 获取图片base64链接
      let image = canvas_dom.toDataURL("image/png");
      this.imgSrc = image;
      this.$emit("refreshDataList", this.imgSrc);
      if (callback && typeof callback == "function") {
        callback(image);
      }
    },
  },
};
</script>
