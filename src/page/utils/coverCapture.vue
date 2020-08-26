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
import utilsTool from "@/lib/utils/index";
export default {
  name: "",
  data() {
    return {
      videoInfo: {
        url: "",
        play: false,
      },
      cutTime: ['3', '20', '66'],
      showCoverArr: [],
    };
  },
  created() {
    document.title = "教师管理";
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
      this.cutVideoCover(url, 0);
    },
    // eslint-disable-next-line no-unused-vars
    // 视频封面截图（传入截屏时间点）
    cutVideoCover(url, index) {
      utilsTool.GetVideoCover({
        url: url,
        time: this.cutTime[index],
        success: (res) => {
          this.showCoverArr.push(res.base64); //给展示列表传入截图的URL
          console.log(
            "第",index+1,"张",
            "总",this.cutTime.length,"张"
          );
          if(parseInt(index)<parseInt(this.cutTime.length)){
            this.cutVideoCover(url, index+=1);
          }else {
            console.log(this.showCoverArr)
          }
        },
      });
    },
  },
};
</script>
