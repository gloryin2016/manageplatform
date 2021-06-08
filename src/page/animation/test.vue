<style lang="less" scoped>
.main-page {
  width: 100%;
  height: 100%;
  background: #fff;
  .box-container {
    margin-top: 30px;
    margin-left: 20px;
    width: 74px;
    height: 38px;
    background: #333;
    border-radius: 18px;
    padding: 1px;
    box-sizing: border-box;
    transition: all 0.7s ease;
    -webkit-transition: all 0.7s ease;
    cursor: pointer;
    .circle1 {
      position: relative;
      width: 36px;
      height: 36px;
      border-radius: 18px;
      font-weight: 600;
      font-size: 18px;
      background: #fff;
      text-align: center;
      line-height: 36px;
      color: #333;
      transform: translateX(0px);
      transition: all 0.7s ease;
      -webkit-transition: all 0.7s ease;
    }
    .circle2 {
      position: relative;
      width: 36px;
      height: 36px;
      border-radius: 18px;
      font-weight: 600;
      font-size: 18px;
      background: #fff;
      text-align: center;
      line-height: 36px;
      color: #00a1d6;
      transform: translateX(36px);
      transition: all 0.7s ease;
      -webkit-transition: all 0.7s ease;
    }
    &.active {
      background: #00a1d6;
    }
  }
  .img-list {
    width: 100%;
    padding: 18px 12px;
    box-sizing: border-box;
    .img-container {
      position: relative;
      width: 120px;
      height: 120px;
      img {
          width: 100%;
          height: 100%;
          display: block;
      }
      animation: myfirst 1s ease-out;
      @keyframes myfirst /* Safari and Chrome */ {
        0% {
          transform: translateY(-30px);
          opacity: 0.2;
        }
        100% {
          transform: translateY(0);
          opacity: 0.5;
        }
      }
    }
  }
}
</style>
<template>
  <div class="main-page">
    <div @click="show = !show" :class="`box-container ${show ? 'active' : ''}`">
      <div :class="{ circle1: !show, circle2: show }">
        弹
      </div>
    </div>
    <div class="img-list">
        <div class="img-container">
            <img src="https://peiyinimg.qupeiyin.cn/1595298884368-10.jpg" alt="">
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
