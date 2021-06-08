<template>
  <div>
    <iframe
      src="https://www.bilibili.com/?spm_id_from=333.999.b_696e7465726e6174696f6e616c486561646572.1"
      id="blink"
      scrolling="no"
      frameborder="0"
      style="position:absolute;top:64px;left: 260px;right:0px;bottom:0;"
    ></iframe>
  </div>
</template>
<script>
export default {
  data() {},
  mounted() {
    /**
     * iframe-宽高自适应显示
     */
    function changeMobsfIframe() {
      const blink = document.getElementById("blink");
      const deviceWidth = document.body.clientWidth;
      const deviceHeight = document.body.clientHeight;
      blink.style.width = Number(deviceWidth) - 260 + "px"; //数字是页面布局宽度差值
      blink.style.height = Number(deviceHeight) - 64 + "px"; //数字是页面布局高度差
    }

    changeMobsfIframe();

    window.onresize = function() {
      changeMobsfIframe();
    };
  },
};
</script>
