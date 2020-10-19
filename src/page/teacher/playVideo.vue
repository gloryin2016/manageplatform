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
      .player-bar {
        width: 100%;
        height: 72px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: #5ec2a6;
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
  .chart-m-l-c {
    width: 100%;
    height: 60px;
    padding: 10px 0;
    float: left;
    label {
      line-height: 40px;
      float: left;
      font-size: 13px;
      font-weight: 600;
    }
    .count {
      height: 60px;
      float: left;
      // padding: 0 5px;
      b {
        width: 16px;
        height: 40px;
        float: left;
        // border: 1px solid #ddd;
        color: #000;
        text-align: center;
        line-height: 40px;
        // margin: 0 2px;
        position: relative;
        z-index: 3;
        overflow: hidden;
        div {
          width: 100%;
          height: 400px;
          position: absolute;
          left: 0;
          top: 0;
          transition: all 0.8s ease-in-out;
          i {
            width: 100%;
            height: 40px;
            float: left;
            font-style: normal;
            font-size: 14px;
            color: #333;
          }
        }
      }
    }
    span {
      line-height: 40px;
      float: left;
    }
    span.iconfont {
      width: 40px;
      height: 40px;
      line-height: 40px;
      float: right;
      text-align: center;
      cursor: pointer;
      color: #0071ff;
    }
    span.iconfont:hover {
      color: #5ec2a6;
    }
  }
}
</style>
<template>
  <div class="student-data">
    <div class="video-content">
      <div class="video-part">
        <video id="video" :src="videoUrl" autoplay controls></video>
        <div class="srt-info" v-for="(item, index) in srtInfoList" :key="index">
          <div
            class="text"
            v-if="srtTime > item.startTime && srtTime < item.endTime"
          >
            {{ item.text }}
          </div>
        </div>
        <!-- <div class="player-bar"></div> -->
      </div>
    </div>
    <div class="chart-m-l-c">
      <div class="count">
        <b v-for="(item, index) in prosecutorArr" :key="index">
          <div :style="{ top: -item * 40 + 'px' }">
            <i v-for="(ic, indexc) in 10" :key="indexc">{{ ic - 1 }}</i>
          </div>
        </b>
      </div>
    </div>
    <Button @click="MoreNum">点击</Button>
    <Button @click="shareToQq">分享</Button>
  </div>
</template>
<script>
// import schoolApi from '@/lib/api/school'
import axios from "axios";
import commonJs from "@lib/tools/common";
import videoUrl from "@assets/20200916.mp4";
export default {
  data() {
    return {
      isplay: false,
      videoUrl,
      testVideoSrc: "http://cdn2.qupeiyin.cn/1602298610/imageToVideo237811.mp4",
      srtInfoList: [],
      srtTime: "",
      prosecutorArr: ["0"],
      shareObj: {
        title: "测试",
        url: "www.baidu.com",
        pic:
          "http://aladdin-vray.oss-cn-beijing.aliyuncs.com/Other/80de988c-ad11-449b-af48-b5341c957668.jpg",
      },
      //这里的数字数组是个8位数，只是占位，不能直接使用，看需求有可能是10位或11、12、20等等
      numbers: 2098,
      //这个参数是后台传给我们的，也不能直接使用，需要转换
    };
  },
  created() {
    let testArr = JSON.stringify(this.numbers);
    console.log(testArr);
    this.prosecutorArr = testArr.split("");
    console.log(this.prosecutorArr);
  },
  mounted() {
    this.plusNPrAll();
    var myVid = document.getElementById("video");
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
                startTime: commonJs.ToSeconds(textItem[1].split(" --> ")[0]),
                endTime: commonJs.ToSeconds(textItem[1].split(" --> ")[1]),
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
    // ToSeconds(t) {
    //   console.log("时间转换秒",t)
    //   var s = 0.0;
    //   if (t) {
    //     var p = t.split(":");
    //     for (let i = 0; i < p.length; i++) {
    //       s = s * 60 + parseFloat(p[i].replace(",", "."));
    //     }
    //   }
    //   return s;
    // },
    PrefixInteger(num, length) {
      //给数字前面补零 比如‘59832’补成8位即位‘00059832’
      return (Array(length).join("0") + num).slice(-length);
    },
    getRandomNumber(min, max) {
      //为了看效果，refreshLeft触发增加数字看效果，和后台数据过来效果一样，不管增加或减少
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    plusNPrAll() {
      //为了看效果，点击上面html中的iconfont触发，refreshLeft方法（我真啰嗦~）
      const res = this.PrefixInteger(this.numbers, this.prosecutorArr.length);
      this.prosecutorArr = res.toString().split("");
    },
    refreshLeft() {
      //刷新数据，我这里因为静态看效果，联调时将请求写在里面就好了
      this.numbers = parseInt(this.numbers) + this.getRandomNumber(1, 100);
      this.plusNPrAll();
    },
    MoreNum() {
      this.numbers += 18;
      this.plusNPrAll();
    },
    //分享到qq空间
    shareToQq() {
      let data = this.shareObj;
      var shareqqzonestring =
        "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=" +
        data.title +
        "&url=" +
        data.url +
        "&pics=" +
        data.pic;
      window.open(
        shareqqzonestring,
        "newwindow",
        "height=400,width=400,top=100,left=100"
      );
    },
    subinfo() {
      shareToQq(
        "测试标题",
        "www.baidu.com",
        "http://aladdin-vray.oss-cn-beijing.aliyuncs.com/Other/80de988c-ad11-449b-af48-b5341c957668.jpg"
      );
    },
  },
};
</script>
