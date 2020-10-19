<style lang="less" scoped>
.main-container {
  width: 100%;
  position: relative;
  .video-player {
    width: 100%;
    display: flex;
  }
  .offestDiv {
    width: 100%;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.8s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .controller {
    flex-direction: column;
    height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    .controller_btn-wrapper {
      position: relative;
      height: 50px;
      display: flex;
      align-items: center;
      color: #fff;
      padding: 0 18px;
      .controller_btn {
        cursor: pointer;
        transition: 0.5s;
        margin: 7px 20px;
        .play-icon {
          margin-top: 2px;
          width: 36px;
          height: 36px;
        }
      }
      .fullScreen {
        transition: 0.5s;
        position: absolute;
        right: 0;
        top: 0;
        width: 80px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 36px;
          height: 36px;
          cursor: pointer;
        }
      }
      .controller_btn:hover {
        color: #409eff;
      }
      .controller_time {
        width: 100px;
        height: 100%;
        line-height: 50px;
      }
    }
    .process-container {
      position: absolute;
      width: 100%;
      top: -2.5px;
      height: 5px;
      background: rgba(255, 255, 255, 0.5);
      z-index: 100;
      cursor: pointer;
      .progress_box {
        z-index: 99;
        position: relative;
        background: #409eff;
        height: 5px;
        .play_point {
          transition: -webkit-transform 0.2s linear;
          transition: transform 0.2s linear;
          transition: transform 0.2s linear, -webkit-transform 0.2s linear;
          position: absolute;
          top: -7px;
          left: 0;
          width: 20px;
          background: #fff;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 18px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .bottom-gif {
    position: absolute;
    transition: -webkit-transform 0.2s linear;
    transition: transform 0.2s linear;
    transition: transform 0.2s linear, -webkit-transform 0.2s linear;
    bottom: 0;
    transform: rotateY(180deg);
    width: 28px;
  }
}
</style>

<template>
  <div
    class="main-container"
    @pointermove.prevent="handleMouseMove($event)"
    @pointerleave="handleMouseLeave"
    @pointerenter="handleMouseEnter"
    ref="vcontainer"
  >
    <video class="video-player" preload="preload" id="video" ref="v">
      <source :src="videoSrc" />
    </video>
    <div class="offestDiv" ref="track" style="width: 100%"></div>
    <transition name="fade">
      <div class="controller" v-show="isControlVisible">
        <div class="controller_btn-wrapper">
          <div class="controller_btn" @click="Playing">
            <img
              v-show="isPaused"
              class="play-icon"
              src="@assets/play_icon.png"
            />
            <img
              v-show="!isPaused"
              class="play-icon"
              src="@assets/play-02.png"
            />
          </div>
          <div class="controller_time">
            {{ currentTime }} / {{ videoDuration }}
          </div>
          <div class="fullScreen">
            <img @click="ToggleFullscreen" src="@assets/icon_02.png" alt="" />
          </div>
        </div>
        <div
          class="process-container"
          id="progress"
          @click="handleProgressClick($event)"
          @pointerup="stopDragging"
        >
          <div class="progress_box" :style="{ width: videoProgressPercent }">
            <div
              class="play_point"
              :style="{ transform: 'translateX(' + thumbTranslateX + 'px)' }"
              @pointerdown="startDragging($event)"
            >
              <img src="@assets/dot_01.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </transition>
    <img
      class="bottom-gif"
      :style="{ transform: 'translateX(' + thumbTranslateX + 'px)' }"
      src="@assets/icon_03.png"
    />
  </div>
</template>
<script>
import videoUrl from "@assets/20200916.mp4";
import commonJs from "@lib/tools/common";
export default {
  name: "MyVideo",
  props: {
    videoSrc: {
      type: String,
      default: videoUrl,
    },
  },
  data() {
    return {
      isControlVisible: false,
      isPaused: true,
      isDragging: false,
      currentTime: "00:00",
      videoDuration: 0,
      videoProgress: 0,
      thumbTranslateX: 0, // 进度条滑块位置
      hidingEvent: null,
      progress: null,
    };
  },
  created() {},
  mounted() {
    const video = document.getElementById("video");
    // this.init();
    this.videoInit();
  },
  computed: {
    videoProgressPercent() {
      return `${this.videoProgress * 100}%`;
    },
    getUrl() {
      return this.videoSrc;
    },
  },
  watch: {
    getUrl(curval, oldval) {
      this.PlayNew(curval);
    },
  },
  methods: {
    videoInit() {
      let that = this;
      let progressL = this.$refs.track.offsetWidth; // 进度条总长
      // 音频或视频文件已经就绪可以开始，在点击播放时触发
      video.addEventListener("canplay", () => {
        that.videoDuration = commonJs.TimeToString(video.duration);
      });
      video.addEventListener("timeupdate", () => {
        // 当前播放时间
        that.currentTime = commonJs.TimeToString(video.currentTime);
        that.videoProgress = video.currentTime / video.duration;
        that.thumbTranslateX = (that.videoProgress * progressL).toFixed(3);
      });
      video.addEventListener("ended", () => {
        setTimeout(() => {
          video.play();
        }, 100);
      });
    },
    //url地址变化后重新加载视频
    PlayNew(val) {
      this.isPaused = false;
      video.src = this.videoSrc;
      setTimeout(() => {
        this.totalTime = "00:00";
        video.play();
      }, 100);
    },
    Playing() {
      if (video.paused) {
        this.PlayVideo();
      } else {
        this.PauseVideo();
      }
    },
    handleEnd() {
      this.PauseVideo();
    },
    //播放
    PlayVideo() {
      this.isPaused = false;
      video.play();
    },
    //暂停
    PauseVideo() {
      this.isPaused = true;
      video.pause();
    },
    //隐藏显示控制条
    handleMouseEnter() {
      this.showControlBar();
    },
    handleMouseMove(event) {
      this.showControlBar();
      this.showCursor();
      if (this.hidingEvent !== null) {
        clearInterval(this.hidingEvent);
      }
      this.hidingEvent = setInterval(this.hideControlBar, 3000);
      this.moveDragging(event);
    },
    handleMouseLeave() {
      this.hideControlBar();
    },
    //展示控制条
    showControlBar() {
      this.isControlVisible = true;
    },
    //关闭控制条
    hideControlBar() {
      const isFullscreen = document.webkitIsFullScreen || document.fullscreen;
      if (isFullscreen) {
        this.hideCursor();
      }
      this.isControlVisible = false;
    },
    hideCursor() {
      document.body.style.cursor = "none";
    },
    showCursor() {
      document.body.style.cursor = "default";
    },
    //点击进度条
    handleProgressClick(event) {
      let progressL = this.$refs.track.offsetWidth; // 进度条总长
      let clickX = event.offsetX;
      let time = (clickX / progressL).toFixed(2);
      this.setProgress(time);
    },
    setProgress(x) {
      video.currentTime = video.duration * x;
    },
    //拖拽进度条
    startDragging(event) {
      this.PauseVideo();
      this.isDragging = true;
    },
    moveDragging(event) {},
    stopDragging() {
      this.isDragging = false;
      this.PlayVideo();
    },
    ToggleFullscreen() {
      const isFullscreen = document.webkitIsFullScreen || document.fullscreen;
      if (isFullscreen) {
        const exitFunc =
          document.exitFullscreen || document.webkitExitFullscreen;
        exitFunc.call(document);
      } else {
        const element = this.$refs.vcontainer;
        const fullscreenFunc =
          element.requestFullscreen || element.webkitRequestFullScreen;
        fullscreenFunc.call(element);
      }
    },
  },
};
</script>
