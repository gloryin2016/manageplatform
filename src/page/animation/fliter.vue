<style lang="less" scoped>
.main-page {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(https://peiyinimg.qupeiyin.cn/1616481679791-466.jpg);
  background-size: 100%;
  //   background-position: center;
  .container {
    width: 450px;
    height: 120px;
    box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.126),
      0 0.9px 1.7px rgba(0, 0, 0, 0.179), 0 1.8px 3.5px rgba(0, 0, 0, 0.224),
      0 3.7px 7.3px rgba(0, 0, 0, 0.277), 0 10px 20px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(20px);
    transition: 0.5s ease;
    &:hover {
      box-shadow: 0 0.7px 1px rgba(0, 0, 0, 0.157),
        0 1.7px 2.6px rgba(0, 0, 0, 0.224), 0 3.5px 5.3px rgba(0, 0, 0, 0.28),
        0 7.3px 11px rgba(0, 0, 0, 0.346), 0 20px 30px rgba(0, 0, 0, 0.5);
    }
    .title {
      text-align: center;
      padding-left: 0.375em;
      font-size: 3.6em;
      //   font-family: Lato, sans-serif;
      font-weight: 200;
      letter-spacing: 0.75em;
      color: white;
      @media (max-width: 640px) {
        font-size: 2em;
      }
    }
  }
}
</style>
<template>
  <div class="main-page">
    <div class="container">
      <div class="title">sakura</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
};
</script>
