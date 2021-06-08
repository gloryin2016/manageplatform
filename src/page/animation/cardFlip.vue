<style lang="less" scoped>
.main-page {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: space-between;
  background: rgb(0, 0, 0);
  .card {
    position: relative;
    width: 240px;
    height: 300px;
    cursor: pointer;
    transition: 1s ease-in-out;
    transform-style: preserve-3d;
    &:hover {
      transform: rotateY(0.5turn);
    }
    .card-face {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      transition: 1s ease-in-out;
      -webkit-box-reflect: below 0
        linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.8));
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      &.back {
        transform: rotateY(0.5turn);
      }
    }
  }
}
</style>
<template>
  <div class="main-page">
    <div class="card">
      <div class="card-face front">
        <img src="https://i.loli.net/2019/11/16/FLnzi5Kq4tkRZSm.jpg" />
      </div>
      <div class="card-face back">
        <img src="https://i.loli.net/2019/11/16/cqyJiYlRwnTeHmj.jpg" />
      </div>
    </div>
    <div class="card">
      <div class="card-face front">
        <img src="https://peiyinimg.qupeiyin.cn/1616480195386-822.jpg" />
      </div>
      <div class="card-face back">
        <img src="https://peiyinimg.qupeiyin.cn/1618201358124-293.jpg" />
      </div>
    </div>
    <div class="card">
      <div class="card-face front">
        <img src="https://i.loli.net/2019/11/16/FLnzi5Kq4tkRZSm.jpg" />
      </div>
      <div class="card-face back">
        <img src="https://i.loli.net/2019/11/16/cqyJiYlRwnTeHmj.jpg" />
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
    //  利用冒泡法为下面的数组排序： [1, 0, 3, 5, 8, -6, 22, 27]
    var arr = [1, 0, 3, 5, 8, -6, 22, 27];
    for (var i = 1; i <= arr.length - 1; i++) {
      //表示轮数
      for (var j = 1, k = 0; j <= arr.length - i; j++, k++) {
        //表示每一轮中比较的次数
        if (arr[k] > arr[k + 1]) {
          var temp = arr[k];
          arr[k] = arr[k + 1];
          arr[k + 1] = temp;
          console.log('arr[k]',arr[k+1])
        }
      }
    }
    console.log(arr);
  },
  mounted() {
    function e(m,n,Callback){  
    var d = m+n;  
    alert("一个从父函数e 产生的参数将要被传递给回调函数 ，这个参数是:"+d);  
     
    //这里才写你想调用的函数---参数要正确  
    Callback(d);   
}  
function callback(data){  
        alert("我是回调函数，我的名字叫:callback ,我接收到来自父函数的参数，参数是:"+data);   
}
e(1,2,callback)  
  },
};
</script>
