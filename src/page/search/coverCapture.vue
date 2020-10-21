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
    <div class="myCover">
      <div class="pic" v-for="(item, index) in showCoverArr" :key="index">
        <img :src="item" />
      </div>
    </div>
    <div>
      <Upload
        style="width:200px"
        :before-upload="UploadPic"
        action="//jsonplaceholder.typicode.com/posts/"
      >
        <Button icon="ios-cloud-upload-outline">上传图片</Button>
      </Upload>
      <img :src="preImage" alt="" />
    </div>
  </div>
</template>
<script>
// import schoolApi from '@/lib/api/school'
import Compressor from "compressorjs";
import utilsTool from "@/lib/utils/index";
import commonJs from "@lib/tools/common";
import homeApi from "@/lib/api/homePage";
export default {
  name: "",
  data() {
    return {
      videoInfo: {
        url: "",
        play: false,
      },
      cutTime: [0.05, 0.13, 0.26],
      showCoverArr: [],
      preImage: "",
    };
  },
  created() {
    document.title = "视频封面裁剪";
  },
  mounted() {
    this.GetCoverPic(75612550)
    this.GetDay()
  },

  methods: {
    GetCoverPic(id){
      utilsTool.GetSongCover({
        id: id,
        success: (res) => {
          console.log(res)
        },
      });
    },
    GetDay() {
      let x;
      let d = new Date().getDay();
      switch(d) {
        case 0:x="周日";
        break;
        case 1:x="周一";
        break;
        case 2:x="周二";
        break;
        case 3:x="周三";
        break;
        case 4:x="周四";
        break;
        case 5:x="周五";
        break;
        case 6:x="周六";
        break;
      }
      console.log(x)
    },
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
      this.cutVideoCover(url, 0);
    },
    UploadPic(file) {
      console.log("file", file);
      return new Promise((resolve, reject) => {
        let isLt1M = file.size / 1024 / 1024 < 1;
        if (isLt1M) {
          console.log("图片不超过1M不压缩");
          resolve(file); // 在请求签名成功后再返回图片file对象，这里图片不超过1M就不用压缩直接返回file
        } else {
          console.log("图片压缩前", file.size);
          new Compressor(file, {
            width: 750, // 压缩完成的宽度，高度会自适应
            quality: 0.6, // 压缩的质量，不加上面的宽度话压缩效果很不理想，体积基本没有变化，一定要加个宽或者高度
            success: (res) => {
              console.log("图片压缩", res);
              let url = URL.createObjectURL(res);
              this.preImage = url
            },
            error(err) {
              reject(err);
            },
          });
        }
      });
    },
    // 视频封面截图（传入截屏时间点）
    cutVideoCover(url, index) {
      utilsTool.GetVideoCover({
        url: url,
        time: this.cutTime[index],
        success: (res) => {
          this.showCoverArr.push(res.base64); //给展示列表传入截图的URL
          console.log("第", index + 1, "张", "总", this.cutTime.length, "张");
          if (parseInt(index + 1) < parseInt(this.cutTime.length)) {
            this.cutVideoCover(url, (index += 1));
          } else {
            console.log(this.showCoverArr);
          }
        },
      });
    },
    GetPic(index) {
      let that = this;
      utilsTool.clipAndCompressCover({
        media: video,
        currentWidth: video.videoWidth,
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
