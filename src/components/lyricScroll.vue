<template>
  <!--歌词-->
  <div
    ref="musicLyric"
    class="music-lyric"
    :style="{ 'padding-top': paddingTop }"
  >
    <div class="music-lyric-items" :style="lyricTop">
      <template v-if="lyricsList.length > 0">
        <p
          v-for="(item, index) in lyricsList"
          :key="index"
          :data-index="index"
          ref="lyric"
          :style="{
            color: lyricIndex === index ? colorLight : color,
            'font-size': fontSize,
          }"
        >
          {{ item.lyric }}
        </p>
      </template>
      <p style="color: #fff" v-else>文案加载失败！</p>
    </div>
  </div>
</template>

<script>
const COMPONENT_NAME = "scroll";

export default {
  name: COMPONENT_NAME,
  props: {
    // 歌词列表
    lyricsList: {
      type: Array,
      default: () => [],
    },
    // 当前歌词下标索引
    lyricIndex: {
      type: Number,
      default: 0,
    },
    // 歌词默认色
    color: {
      type: String,
      default: "#fff",
    },
    // 歌词高亮色
    colorLight: {
      type: String,
      default: "#40ce8f",
    },
    fontSize: {
      type: String,
      default: "16px",
    },
    lineHeight: {
      type: String,
      default: "42",
    },
    paddingTop: {
      type: String,
      default: "300px",
    },
  },
  data() {
    return {
      top: 0, // 文案居中
      //文案list示例
      lyricListDemo: [
        {
          index: 0,
          lyric: "作曲 : CMJ",
          time: 0,
        },
        {
          index: 1,
          lyric: "作词 : 桃玖",
          time: 0.29,
        },
        {
          index: 2,
          lyric: "你听啊秋末的落叶",
          time: 0.89,
        },
        {
          index: 3,
          lyric: "你听它叹息着离别",
          time: 5.14,
        },
        {
          index: 4,
          lyric: "只剩我独自领略",
          time: 9.39,
        },
        {
          index: 5,
          lyric: "海与山 风和月",
          time: 13.14,
        },
      ],
    };
  },
  mounted() {},
  watch: {
    lyricIndex(newVal, oldVal) {},
  },
  computed: {
    lyricTop() {
      return `transform :translate3d(0, ${(0 - this.lineHeight) *
        (this.lyricIndex - this.top)}px, 0);color: ${this.color};line-height: ${
        this.lineHeight
      }px`;
    },
  },
  methods: {},
};
</script>
<style lang="less" scoped>
/*歌词部分*/
.music-lyric {
  // position: absolute;
  // top: 1.9rem;
  // right: 0;
  // bottom: 0;
  // left: 0;
  padding-top: 300px;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
  mask-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.6) 5%,
    rgba(255, 255, 255, 1) 15%,
    rgba(255, 255, 255, 1) 85%,
    rgba(255, 255, 255, 0.6) 95%,
    rgba(255, 255, 255, 0) 100%
  );
  .music-lyric-items {
    text-align: center;
    font-size: 16px;
    color: #fff;
    transform: translate3d(0, 0, 0);
    transition: transform 0.6s ease-out;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    .on {
      color: #40ce8f;
    }
  }
}
</style>
