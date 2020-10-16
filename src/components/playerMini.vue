<style lang="less" scoped>
.player-container {
  position: absolute;
  width: 200px;
  height: 72px;
  background: #fff;
  border-radius: 36px;
  bottom: 20px;
  padding: 6px 24px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 10;
  .songInfo {
    width: 60px;
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
<template>
  <div v-drag id="drag" class="player-container">
    <audio :src="songInfo.url" id="audio"></audio>
    <div class="songInfo">
      <Button v-show="playing" @click="playMusic">暂停</Button>
      <Button v-show="!playing" @click="playMusic">播放</Button>
    </div>
  </div>
</template>
<script>
let audio = "";
export default {
  name: "MyMusics",
  props: {
    // 歌词列表
    songsList: {
      type: Array,
      default: () => [],
    },
    audioSrc: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      playing: false,
      songInfo: {},
    };
  },
  directives: {
    drag: {
      // 指令的定义
      bind: function(el) {
        let oDiv = el; // 获取当前元素
        oDiv.onmousedown = (e) => {
          console.log("onmousedown");
          // 算出鼠标相对元素的位置
          let disX = e.clientX - oDiv.offsetLeft;
          let disY = e.clientY - oDiv.offsetTop;

          document.onmousemove = (e) => {
            // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = e.clientX - disX;
            let top = e.clientY - disY;

            oDiv.style.left = left + "px";
            oDiv.style.top = top + "px";
          };
          document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      },
    },
  },
  computed: {
    //同步了store中state内的songInfo值
    gePlayInfo() {
      return this.$store.state.songs.songInfo;
    },
  },
  watch: {
    //当搜索后播放列表变化，重新给songList赋值
    gePlayInfo(curval, oldval) {
      console.log(curval, oldval);
      // this.GetNewSongList(curval);
    },
  },
  created() {},
  mounted() {
    audio = document.getElementById("audio");
  },
  methods: {
    GetNewSongList(info) {
      this.songInfo = info;
      this.playing = true;
      setTimeout(() => {
        audio.play();
      }, 100);
    },
    //播放与暂停
    playMusic() {
      if (this.playing) {
        // 播放中,点击则为暂停
        this.playing = false;
        // this.$refs.rotate.style.animationPlayState = "paused";
        audio.pause();
      } else {
        // 暂停中,点击则为播放
        this.playing = true;
        // this.$refs.rotate.style.animationPlayState = "running";
        audio.play();
      }
    },
  },
};
</script>
