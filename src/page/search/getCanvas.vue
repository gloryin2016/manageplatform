<style lang="less" scoped>
/*背景模糊*/
.bg {
  width: 100%;
  height: 100%;
  position: relative;
  background: url("https://img.qupeiyin.cn/ugctest/1603698465518/aipktq.jpg");
  padding: 1px;
  box-sizing: border-box;
  background-size: 100%;
  z-index: 1;
}
.bg:after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: inherit;
  filter: blur(2px);
  z-index: 2;
}
.drag {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  text-align: center;
  color: #fff;
  font-size: 24px;
  z-index: 11;
}
</style>
<template>
  <div class="bg">
    <div class="drag">like window</div>
  </div>
</template>
<script>
import bg1 from "@assets/background/bg_01.jpg";
import bg2 from "@assets/background/bg_02.jpg";
export default {
  name: "",
  data() {
    return {
      bg1,
      bg2,
      testPic1: "https://img.qupeiyin.cn/ugctest/1603698465518/aipktq.jpg",
      testPic2: "https://img.qupeiyin.cn/ugctest/1603698241418/kgwcop.jpg",
    };
  },
  created() {},
  mounted() {},

  methods: {},
};
</script>
