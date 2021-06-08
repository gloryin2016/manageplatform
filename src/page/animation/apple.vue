<style lang="less" scoped>
.main-page {
  width: 100%;
  height: auto;
  position: relative;
  z-index: 1;
  background-image: linear-gradient(to right, #243949 0%, #517fa4 100%);
  .apple-bar {
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 60px;
    background: rgba(29, 29, 31, 0.72);
    backdrop-filter: saturate(180%) blur(20px);
    padding: 0 428px 0 168px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
        font-size: 20px;
        font-weight: 600;
        color: #fff;
    }
    .right {
        font-size: 18px;
        color: #fff;
    }
  }
  .container {
    width: 100%;
    height: 100%;
    // padding: 60px 12px 24px 12px;
    // box-sizing: border-box;
    position: relative;
    .header {
      width: 100%;
      height: 600px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url(https://i.loli.net/2019/11/16/FLnzi5Kq4tkRZSm.jpg);
      background-size: 100%;
      background-repeat: no-repeat;
    //   .box {
    //     background: #fff;
    //     border-radius: 24px;
    //     width: 200px;
    //     height: 100px;
    //   }
    }
    .flex-box {
      margin-top: 80px;
      width: 100%;
      height: 100px;
      display: flex;
      .yellow {
        width: 200px;
        height: 100%;
        margin-right: 20px;
        background: yellow;
      }
      .auto-box {
        flex: 1;
        height: 100%;
        background: #fff;
      }
    }
  }
}
</style>
<template>
  <div class="main-page">
    <div class="apple-bar">
        <div class="left">this.new()</div>
        <div class="right">
            技术规格&nbsp;&nbsp;&nbsp; 立即购买&nbsp;&nbsp;&nbsp; 以旧换新
        </div>
    </div>
    <div class="container">
      <div class="header">
        <div class="box"></div>
      </div>
      <div class="flex-box">
        <div class="yellow"></div>
        <div class="auto-box"></div>
      </div>
      <div style="height: 1000px"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    let date = new Date()
    let res = date.toLocaleDateString()
    let local = window.location
    console.log(local.pathname)
  },
  methods: {},
};
</script>
