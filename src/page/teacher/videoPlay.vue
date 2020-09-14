<style lang="less" scoped>
.main-page {
  width: 100%;
  height: 100%;
  position: relative;
  .video-play {
    min-width: 600px;
    max-width: 840px;
    display: flex;
  }
}
</style>
<template>
  <div class="main-page">
    <div class="video-play">
      <mvideo :videoSrc.sync="url"></mvideo>
    </div>
    <Button @click="ChangeUrl">切换</Button>
  </div>
</template>
<script>
import Mvideo from "@/components/videoPlay";
export default {
  data() {
    return {
      url:
        "https://cdn.qupeiyin.cn/2020-07-07/c9c62e15012f7349e4f3ada49708144a.mp4",
    };
  },
  created() {},
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Mvideo,
  },
  mounted() {},
  methods: {
    ChangeUrl() {
      this.url =
        "https://cdn.qupeiyin.cn/ugcdev/2020-09-04/a66e47cb434d2cb25236b9e51b99c05f.mp4";
      console.log(this.url);
    },
  },
};
</script>
