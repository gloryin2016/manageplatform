<style lang="less" scoped>
.student-data {
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  position: relative;
  background-image: url(http://shp.qpic.cn/ishow/2735020717/1517994115_84828260_10060_sProdImgNo_7.jpg/0);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 99;
  canvas {
    max-width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0.3;
    z-index: 9999;
  }
}
</style>
<style type="text/css">
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

a,
img {
  border: 0;
}

body {
  font: 12px/180% Arial, Helvetica, sans-serif, "新宋体";
}

body {
  display: block;
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-image: url(http://m.qpic.cn/psb?/fa3d9744-75c1-4da7-a1f3-ff21702d9381/lqTahQgT7KCWX6XRUZL.xWALcY6s5qNKslgtIORKxys!/b/dAUBAAAAAAAA&bo=gAc4BIAHOAQRBzA!&rf=viewer_4);
  /* background-image: url(http://shp.qpic.cn/ishow/2735020717/1517994115_84828260_10060_sProdImgNo_7.jpg/0); */
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

/* canvas {
  max-width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  opacity: 0.3;
  z-index: 9999;
} */
</style>
<template>
  <div class="student-data">
    <canvas id="sakura"></canvas>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      value: "",
    };
  },
  created() {
    document.title = "硬核";
    if(this.$route.query.menuName == 'sakura') {
      // this.$router.go(0)
    }
  },
  mounted() {},
};
</script>
