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
  .drag {
    position: absolute;
    left: 40%;
    top: 30%;
    /*transform: translate(-50%,-50%);*/
    width: 420px;
    height: 200px;
    text-align: center;
    background: inherit;
    z-index: 11;
    // box-shadow: 0 0 10px 6px rgba(0, 0, 0, 0.5);
  }
  .dataURL {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 200px;
  }
  .test-btn {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9999;
  }
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
</style>
<template>
  <div id="capture" class="bg">
    <img class="dataURL" :src="dataUrltext" alt="" />
    <transition
      enter-active-class="animated swing"
      leave-active-class="animated shake"
    >
      <div v-show="status" class="drag">like window</div>
    </transition>
    <Button class="test-btn" @click="status = !status">点我</Button>
  </div>
</template>
<script>
import bg1 from "@assets/background/bg_01.jpg";
import bg2 from "@assets/background/bg_02.jpg";
import html2canvas from "html2canvas";
export default {
  name: "",
  data() {
    return {
      bg1,
      bg2,
      testPic1: "https://img.qupeiyin.cn/ugctest/1603698465518/aipktq.jpg",
      testPic2: "https://img.qupeiyin.cn/ugctest/1603698241418/kgwcop.jpg",
      dataURL: "",
      dataUrltext: "",
      status: false,
    };
  },
  created() {},
  mounted() {
    this.initimg();
  },

  methods: {
    //初始化生成图片
    initimg() {
      let that = this;
      html2canvas(document.querySelector("#capture"), {
        backgroundColor: null,
        logging: false, //日志开关，便于查看html2canvas的内部执行流程
        useCORS: true, // 【重要】开启跨域配置
        // allowTaint:true
      }).then((canvas) => {
        let dataURL = canvas.toDataURL("image/png");
        // 本地查看图片用this.dataUrltext
        this.dataUrltext = dataURL;
        // 分享上传pic用this.dataURl
        this.dataURL = dataURL.slice(22);
      });
    },
  },
};
</script>
