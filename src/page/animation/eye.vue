<style lang="less" scoped>
.main-page {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .left {
    width: 250px;
    height: 120px;
    background-color: rgb(255, 255, 255);
    border-bottom: 5px solid rgb(70, 70, 70);
    overflow: hidden;
    position: relative;
    transform: translateX(-135px);
    border-radius: 0 120px 0 120px;
    box-shadow: inset 3px 2px 3px rgba(17, 17, 17, 0.8);
  }
  .left::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 95px;
    height: 95px;
    border-radius: 50%;
    border: 1px solid #000;
    animation: colour 2s linear forwards;
  }
  @keyframes colour {
    0%,
    30% {
      background-color: rgb(0, 0, 0);
    }
    100% {
      background-color: rgb(255, 4, 4);
    }
  }
  .pupil {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0px;
    height: 0px;
    border-radius: 50%;
    background-color: rgb(0, 0, 0);
    z-index: 1;
    animation: da 3s linear forwards;
  }
  @keyframes da {
    100% {
      width: 15px;
      height: 15px;
    }
  }
  .circle {
    position: absolute;
    top: -25px;
    left: -25px;
    bottom: -25px;
    right: -25px;
    border-radius: 50%;
    border: 2px solid rgb(0, 0, 0);
    animation: zhuan 2s linear 2s forwards;
    opacity: 0;
  }
  @keyframes zhuan {
    100% {
      opacity: 1;
      transform: rotate(720deg);
    }
  }
  .circle .magatama {
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: rgb(0, 0, 0);
  }
  .circle .magatama::after {
    content: "";
    position: absolute;
    top: -6px;
    left: -1px;
    width: 6px;
    height: 20px;
    border-radius: 50%;
    border-left: 6px solid rgb(0, 0, 0);
  }
  .circle .magatama:nth-child(1) {
    animation: yu1 2s ease-in 2s forwards;
  }
  @keyframes yu1 {
    0% {
      opacity: 0;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0.1);
    }
    100% {
      left: 50%;
      top: -9%;
      transform: scale(1) rotate(80deg);
    }
  }
  .circle .magatama:nth-child(2) {
    animation: yu2 2s ease-in 2s forwards;
  }
  @keyframes yu2 {
    0% {
      opacity: 0;
      left: 50%;
      top: 50%;

      transform: translate(-50%, -50%) scale(0.1);
    }
    100% {
      top: 60%;
      left: -9%;
      transform: scale(1) rotate(-60deg);
    }
  }
  .circle .magatama:nth-child(3) {
    animation: yu3 2s ease-in 2s forwards;
  }
  @keyframes yu3 {
    0% {
      opacity: 0;
      right: 50%;
      top: 50%;

      transform: translate(-50%, -50%) scale(0.1);
    }
    100% {
      top: 60%;
      right: -9%;
      transform: scale(1) rotate(180deg);
    }
  }
  .left::before,
  .right::before {
    content: "";
    position: absolute;
    left: 38%;
    top: 30%;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: rgb(255, 255, 255);
    z-index: 10;
  }
}
</style>
<template>
  <div class="main-page">
    <div class="left">
      <div class="pupil">
        <div class="circle">
          <span class="magatama"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
      
  },
};
</script>
