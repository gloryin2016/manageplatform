<style lang="less" scoped>
.main-page {
  width: 100%;
  height: 100%;
  position: relative;
  background: rgba(15, 15, 15, 0.4);
  overflow: hidden;
  .background-flitter {
    position: absolute;
    z-index: 0;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: 50%;
    filter: blur(8px);
    opacity: 0.7;
    overflow: hidden;
    box-sizing: border-box;
  }
  .play-mini {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 72px;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 6px 0;
    box-sizing: border-box;
    z-index: 10;
    .songInfo {
      min-width: 360px;
      max-width: 480px;
      position: relative;
      padding: 0 18px;
      box-sizing: border-box;
      display: flex;
      .poster {
        width: 52px;
        height: 52px;
        border-radius: 5px;
        margin-top: 4px;
        margin-right: 20px;
      }
      .info {
        min-width: 280px;
        height: 100%;
        line-height: 30px;
        font-size: 16px;
      }
    }
    .controls {
      width: 280px;
      height: 100%;
      display: flex;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
      }
      .status {
        width: 40px;
        height: 40px;
        margin-left: 36px;
        margin-right: 36px;
      }
    }
    .progress-bar {
      position: absolute;
      z-index: 10;
      top: -5px;
      width: 100%;
      height: 5px;
      background: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      .progress-box {
        height: 100%;
        background: #40ce8f;
        position: relative;
        .play-point {
          transition: -webkit-transform 0.2s linear;
          transition: transform 0.2s linear;
          transition: transform 0.2s linear, -webkit-transform 0.2s linear;
          position: absolute;
          width: 18px;
          height: 12px;
          border-radius: 3px;
          top: -4px;
          background: #fff;
          cursor: pointer;
          img {
            position: absolute;
            top: -2px;
            width: 18px;
          }
        }
      }
    }
    .right-botton {
      position: relative;
      width: 420px;
      height: 100%;
      display: flex;
      align-items: center;
      .text-div {
        height: 100%;
        line-height: 60px;
        margin-left: 10px;
        margin-right: 10px;
      }
      a {
        color: #333;
      }
    }
  }
  .song-cover-lyric {
    position: relative;
    width: 100%;
    height: 100%;
    padding-bottom: 72px;
    box-sizing: border-box;
    display: flex;
    overflow: hidden;
    .disc-continer {
      width: 50%;
      height: 100%;
      position: relative;
      .poster {
        position: relative;
        width: 280px;
        height: 280px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        left: 50%;
        top: 80px;
        margin-left: -140px;
        box-shadow: 0 0 0 12px rgba(255, 255, 255, 0.4);
        animation: animations1 12s linear infinite forwards;
        animation-play-state: paused;
        overflow: hidden;
        margin-bottom: 120px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .song-name {
        width: 100%;
        height: 40px;
        text-align: center;
        font-size: 32px;
        font-weight: 600;
        color: #fff;
        line-height: 40px;
      }
      .song-artistsName {
        width: 100%;
        height: 40px;
        text-align: center;
        font-size: 28px;
        font-weight: 600;
        color: #fff;
        line-height: 40px;
        margin-top: 24px;
      }
      @keyframes animations1 {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
    .lyric {
      width: 50%;
      height: 600px;
      position: relative;
      overflow: hidden;
    }
  }
}
</style>
<style lang="less">
.ivu-drawer-body {
  .list-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;
    .songInfo {
      width: 100%;
      height: 42px;
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      cursor: pointer;
      img {
        width: 36px;
        height: 36px;
        border-radius: 5px;
        margin-right: 12px;
      }
      .info {
        position: relative;
        width: 240px;
        height: 36px;
        line-height: 18px;
        .name {
          width: 100%;
          height: 18px;
          font-size: 14px;
          font-weight: 600;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          line-height: 18px;
        }
        .singer {
          width: 100%;
          height: 18px;
          font-size: 12px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          line-height: 18px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="main-page">
    <audio :src="songInfo.url" id="audio"></audio>
    <div
      class="background-flitter"
      :style="`background-image: url(${songInfo.cover})`"
    ></div>
    <div class="play-mini">
      <div class="progress-bar" @click="handleProgressClick" ref="track">
        <div class="progress-box" :style="{ width: audioProgressPercent }">
          <div
            class="play-point"
            :style="{ transform: 'translateX(' + thumbTranslateX + 'px)' }"
          >
            <img src="@assets/icon_01.png" alt="" />
          </div>
        </div>
      </div>
      <div class="songInfo">
        <img class="poster" :src="songInfo.cover" alt="" />
        <div class="info">
          <p style="font-weight: 600">{{ songInfo.name }}</p>
          <p style="font-size: 14px;">{{ songInfo.artistsName }}</p>
        </div>
      </div>
      <div class="controls">
        <img @click="skipBack" src="@assets/arrow_01.png" alt="" />
        <img
          @click="playMusic"
          class="status"
          v-show="!playing"
          src="@assets/play_icon.png"
          alt=""
        />
        <img
          class="status"
          @click="playMusic"
          v-show="playing"
          src="@assets/play-02.png"
          alt=""
        />
        <img @click="skipForward" src="@assets/arrow_02.png" alt="" />
      </div>
      <div class="right-botton">
        <div class="text-div">音量</div>
        <Slider
          style="width: 80px;"
          @on-input="changeVolum"
          v-model="volume"
        ></Slider>
        <div class="text-div"></div>
        <Dropdown @on-click="SetPlaySequence">
          <a href="javascript:void(0)">
            {{ showPlayType }}
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem :name="1">列表循环</DropdownItem>
            <DropdownItem :name="2">随机播放</DropdownItem>
            <DropdownItem :name="3">单曲循环</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div class="text-div">播放列表</div>
        <a href="javascript:;"> <Icon @click="drawer = true" size="36" type="ios-list"/></a>
      </div>
    </div>
    <div class="song-cover-lyric">
      <div class="disc-continer">
        <div class="poster" ref="rotate">
          <img :src="songInfo.cover" alt="" />
        </div>
        <div class="song-name">{{ songInfo.name }}</div>
        <div class="song-artistsName">{{ songInfo.artistsName }}</div>
      </div>
      <div class="lyric">
        <mscroll
          ref="lyric"
          :color="color"
          :colorLight="colorLight"
          :lineHeight="lineHeight"
          :paddingTop="paddingTop"
          :fontSize="fontSize"
          :lyricIndex="lyricIndex"
          :lyricsList="lyricInfo"
        ></mscroll>
      </div>
    </div>
    <Drawer
      title="播放列表"
      placement="left"
      width="320"
      :closable="false"
      v-model="drawer"
    >
      <div class="list-container">
        <div class="songInfo" v-for="(item, index) in songList" :key="index" @click="PlayListMusic(index)">
          <img :src="item.cover" alt="" />
          <div class="info">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistsName }}</div>
          </div>
        </div>
      </div>
    </Drawer>
  </div>
</template>
<script>
import Mscroll from "@/components/lyricScroll";
import axios from "axios";
export default {
  data() {
    return {
      playing: false,
      drawer: false,
      playIndex: 0,
      songInfo: {},
      songList: [],
      volume: 80, // 音量
      lyricInfo: [],
      playType: 1, // 播放类型：1-列表循环，2-随机播放，3-单曲循环
      showPlayType: "列表循环",
      audioProgress: 0,
      thumbTranslateX: 0,
      lyricIndex: 0,
      color: "#fff", //文案默认颜色
      colorLight: "#40ce8f", //文案高亮色
      fontSize: "16px", //文案字体大小
      lineHeight: "42", //每段行高
      paddingTop: "300px", //高亮文案部分居中
    };
  },
  created() {},
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Mscroll,
  },
  computed: {
    audioProgressPercent() {
      return `${this.audioProgress * 100}%`;
    },
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    const audio = document.getElementById("audio");
    this.Init();
  },
  methods: {
    Init() {
      this.GetSongList();
    },
    GetSongList() {
      axios.get('/api/songList.json')
          .then(this.GetSongListInfo)
    },
    GetSongListInfo(res) {
      console.log(res)
      let myList = res.data.data.songList
      this.songList = myList
      this.songInfo = this.songList[0];
      this.audioInit();
      this.GetLyric(this.songInfo.id);
    },
    audioInit() {
      let that = this;
      let progressL = this.$refs.track.offsetWidth; // 进度条总长
      // 音频或视频文件已经就绪可以开始，在点击播放时触发
      // eslint-disable-next-line no-undef
      audio.addEventListener("canplay", () => {
        // eslint-disable-next-line no-undef
        that.videoDuration = that.timeToString(audio.duration);
      });
      // eslint-disable-next-line no-undef
      audio.addEventListener("timeupdate", () => {
        // 当前播放时间
        // eslint-disable-next-line no-undef
        let compareTime = audio.currentTime;
        for (let i = 0; i < that.lyricInfo.length; i++) {
          if (compareTime > parseInt(that.lyricInfo[i].time)) {
            const index = that.lyricInfo[i].index;
            if (i === parseInt(index)) {
              that.lyricIndex = i;
              // console.log(that.lyricIndex)
            }
          }
        }
        // eslint-disable-next-line no-undef
        that.currentTime = that.timeToString(audio.currentTime);
        // eslint-disable-next-line no-undef
        that.audioProgress = audio.currentTime / audio.duration;
        that.thumbTranslateX = (that.audioProgress * progressL).toFixed(3);
      });
      // eslint-disable-next-line no-undef
      audio.addEventListener("ended", () => {
        switch (parseInt(that.playType)) {
          case 1: // 列表循环
            that.playIndex =
              that.playIndex + 1 >= that.songList.length
                ? 0
                : that.playIndex + 1;
            break;
          case 2: // 随机播放
            that.playIndex = Math.floor(Math.random() * that.songList.length);
            break;
          case 3: // 单曲循环
            break;
        }
        that.songInfo = that.songList[that.playIndex];
        this.GetLyric(that.songInfo.id);
        setTimeout(() => {
          this.$refs.rotate.style.animationPlayState = "running";
          // eslint-disable-next-line no-undef
          audio.play();
        }, 100);
      });
    },
    //播放与暂停
    playMusic() {
      if (this.playing) {
        // 播放中,点击则为暂停
        this.playing = false;
        this.$refs.rotate.style.animationPlayState = "paused";
        // eslint-disable-next-line no-undef
        audio.pause();
      } else {
        // 暂停中,点击则为播放
        this.playing = true;
        this.$refs.rotate.style.animationPlayState = "running";
        // eslint-disable-next-line no-undef
        audio.play();
      }
    },
    PlayListMusic(index) {
      this.playIndex = index
      this.songInfo = this.songList[this.playIndex];
      this.GetLyric(this.songInfo.id);
      this.playing = true;
      this.drawer = false;
      setTimeout(() => {
        this.$refs.rotate.style.animationPlayState = "running";
        // eslint-disable-next-line no-undef
        audio.play();
      }, 100);
    },
    //点击进度条
    handleProgressClick(event) {
      let progressL = this.$refs.track.offsetWidth; // 进度条总长
      let clickX = event.offsetX;
      let time = (clickX / progressL).toFixed(2);
      this.setProgress(time);
    },
    setProgress(x) {
      // eslint-disable-next-line no-undef
      audio.currentTime = audio.duration * x;
    },
    // 上一首
    skipBack() {
      this.skipFn("skipBack");
    },
    // 下一首
    skipForward() {
      this.skipFn("skipForward");
    },
    //上下首封装
    skipFn(type) {
      switch (parseInt(this.playType)) {
        case 2: // 随机播放
          this.playIndex = Math.floor(Math.random() * this.songList.length);
          break;
        default:
          if (type == "skipBack") {
            this.playIndex - 1 >= 0 ? this.playIndex-- : 0;
          } else {
            this.playIndex =
              this.playIndex + 1 >= this.songList.length
                ? this.songList.length - 1
                : this.playIndex + 1;
          }
          break;
      }
      this.songInfo = this.songList[this.playIndex];
      this.GetLyric(this.songInfo.id);
      this.playing = true;
      setTimeout(() => {
        this.$refs.rotate.style.animationPlayState = "running";
        // eslint-disable-next-line no-undef
        audio.play();
      }, 100);
    },
    //调节音量
    changeVolum(c) {
      // eslint-disable-next-line no-undef
      audio.volume = c / 100;
    },
    SetPlaySequence(val) {
      console.log(val);
      this.playType = val;
      if (val == 1) {
        this.showPlayType = "列表循环";
      } else if (val == 2) {
        this.showPlayType = "随机播放";
      } else if (val == 3) {
        this.showPlayType = "单曲循环";
      }
    },
    GetLyric(id) {
      let that = this;
      // eslint-disable-next-line no-undef
      axios
        .get("https://api.mtnhao.com/lyric", {
          params: {
            id: id,
          },
        })
        .then(function(response) {
          let lrc = response.data.lrc.lyric;
          that.GetLyricList(lrc);
        });
    },
    GetLyricList(lrc) {
      let lyricsObjArr = [];
      const regNewLine = /\n/;
      const lineArr = lrc.split(regNewLine); // 每行歌词的数组
      // console.log("歌词", lrc);
      const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/;
      lineArr.forEach((item) => {
        if (item === "") return;
        const obj = {};
        const time = item.match(regTime);

        obj.lyric =
          item.split("]")[1].trim() === "" ? "" : item.split("]")[1].trim();
        obj.time = time
          ? this.FormatLyricTime(time[0].slice(1, time[0].length - 1))
          : 0;
        obj.uid = Math.random()
          .toString()
          .slice(-6);
        if (obj.lyric === "") {
          console.log("这一行没有歌词");
        } else {
          lyricsObjArr.push(obj);
        }
      });
      this.lyricInfo = lyricsObjArr.map((item, index) => {
        item.index = index;
        return {
          ...item,
        };
      });
      console.log("歌词信息", this.lyricInfo);
    },
    FormatLyricTime(time) {
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
    },
    // 秒值转字符串
    timeToString(param) {
      param = parseInt(param);
      // eslint-disable-next-line no-unused-vars
      let hh = "",
        mm = "",
        ss = "";
      if (param >= 0 && param < 60) {
        param < 10 ? (ss = "0" + param) : (ss = param);
        return "00:" + ss;
      } else if (param >= 60 && param < 3600) {
        mm = parseInt(param / 60);
        mm < 10 ? (mm = "0" + mm) : mm;
        param - parseInt(mm * 60) < 10
          ? (ss = "0" + String(param - parseInt(mm * 60)))
          : (ss = param - parseInt(mm * 60));
        return mm + ":" + ss;
      }
    },
  },
};
</script>
