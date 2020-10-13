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
      <mvideo :videoSrc.sync="videoUrl"></mvideo>
    </div>
  </div>
</template>
<script>
import Mvideo from "@/components/videoPlay";
import videoUrl from "@assets/20200916.mp4";
export default {
  data() {
    return {
      videoUrl,
    };
  },
  created() {},
  components: {
    Mvideo,
  },
  mounted() {},
  methods: {
  },
};
</script>
