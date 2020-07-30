<style lang="less" scoped>
.student-data {
  width: 100%;
  height: 100%;
  padding: 18px;
  box-sizing: border-box;
  background: #f3f3f3;
  position: relative;
  .video-content {
    position: relative;
    width: 100%;
    height: auto;
    padding: 12px;
    box-sizing: border-box;
    background: #fff;
    .video-part {
      width: 520px;
      position: relative;
      video {
        position: relative;
        width: 520px;
      }
      .srt-info {
        width: 100%;
        position: absolute;
        bottom: 24px;
        .text {
          width: 420px;
          position: relative;
          left: 50%;
          margin-left: -210px;
          text-align: center;
          line-height: 20px;
          color: #fff;
        }
      }
    }
  }
}
</style>
<template>
  <div class="student-data">
    <div class="video-content">
      <div class="video-part">
        <video id="video" :src="videoSrc1" controls></video>
        <div class="srt-info" v-for="(item, index) in srtInfoList" :key="index">
          <div
            class="text"
            v-if="srtTime > item.startTime && srtTime < item.endTime"
          >
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import schoolApi from '@/lib/api/school'
import axios from "axios";
export default {
  data() {
    return {
      videoSrc:
        "https://cdn.qupeiyin.cn/ugcdev/2020-07-27/7f5fa6ef44fb26b57047e15a2ea0012a.mp4",
      videoSrc1:
        "https://cdn.qupeiyin.cn/ugcdev/2020-07-18/9217d43fffdf3f608d29a0b17cf6fe95.mp4",
      srt:
        "https://cdn.qupeiyin.cn/ugcdev/2020-07-27/1c42181ff8647c8d4d53c5a2bfbbf503.srt",
      srt1:
        "https://cdn.qupeiyin.cn/ugcdev/2020-07-18/d520e9745e7042b2a6433a24a87c6536.srt",
      isplay: false,
      srtInfoList: [],
      srtTime: "",
    };
  },
  created() {
    this.GetSrtInfo(this.srt1);
  },
  mounted() {
    var myVid = document.getElementById("video");
    // eslint-disable-next-line no-unused-vars
    let that = this;
    myVid.addEventListener(
      "timeupdate",
      function() {
        console.log(myVid.currentTime);
        that.srtTime = myVid.currentTime;
      },
      false
    );
  },
  methods: {
    //获取字幕信息
    GetSrtInfo(srtUrl) {
      this.forCount = 0;
      let that = this;
      axios
        .get(`${srtUrl}`)
        .then(function(response) {
          let textList = response.data
            .split(/\n\s\n/)
            .filter((item) => item != "")
            .map((item, index) => {
              let textItem = item.split(/\n/);
              return {
                index: index,
                sort: textItem[0],
                text: textItem[2],
                startTime: that.ToSeconds(textItem[1].split(" --> ")[0]),
                endTime: that.ToSeconds(textItem[1].split(" --> ")[1]),
                timeLine: textItem[1],
              };
            });
          that.srtInfoList = textList;
          console.log("字幕内容", that.srtInfoList);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //将时间转化为秒
    ToSeconds(t) {
      var s = 0.0;
      if (t) {
        var p = t.split(":");
        for (let i = 0; i < p.length; i++) {
          s = s * 60 + parseFloat(p[i].replace(",", "."));
        }
      }
      return s;
    },
  },
};
</script>
