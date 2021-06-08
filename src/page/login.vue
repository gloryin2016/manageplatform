<style lang="less">
.login {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -10;
    img {
      width: 100%;
    }
  }
  .change_bg {
    position: absolute;
    top: 20px;
    right: 32px;
  }
  .logCenter {
    width: 550px;
    padding: 30px 50px;
    box-sizing: border-box;
    background: rgba(224, 224, 224, 0.3);
    border-radius: 12px;
    .title {
      width: 100%;
      text-align: center;
      color: #fff;
      font-weight: 800;
      font-size: 30px;
      margin-bottom: 40px;
    }
    .inputOut {
      background-image: linear-gradient(to right, #e8198b, #3b65bb);
      height: 45px;
      width: 100%;
      margin-bottom: 20px;
      border-radius: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.3s;
      .input {
        background-color: rgb(41, 45, 62);
        border: 0px;
        width: 100%;
        text-align: center;
        font-size: 15px;
        color: aliceblue;
        outline: none;
        height: calc(100% - 4px);
        width: calc(100% - 4px);
        border-radius: 25px;
        font-size: 20px;
      }
    }
    .loginButton {
      width: 60%;
      border: 2px solid #3b65bb;
      margin: 0 auto;
      text-align: center;
      line-height: 40px;
      text-transform: uppercase;
      border-radius: 25px;
      cursor: pointer;
      transition: 0.3s;
      color: #fff;
      font-size: 20px;
    }
    .loginButton:hover {
      background-color: #3b65bb;
    }
    .call {
      margin-top: 10px;
      width: 100%;
      height: 48px;
      border-radius: 6px;
      text-align: center;
      line-height: 48px;
      background: #fff;
    }
    .cyberpunk {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      .banner {
        margin: 25px auto;
        width: 400px;
        height: 100px;
        border: 5px solid white;
        box-shadow: 0 0 10px red;
      }
      .banner:hover {
        box-shadow: 0 0 10px green;
      }
      .banner:hover::before {
        animation: trouble-effect 2s;
      }
      .banner::before,
      .banner::after {
        content: "登录 2077";
        color: white;
        font: bold 2.5em "yahei";
        position: absolute;
        text-align: center;
        display: block;
        width: 400px;
        line-height: 100px;
        text-shadow: -5px -5px orange, 3px 3px #00ffb3;
      }
      .banner::before {
        z-index: 999;
      }
      @keyframes trouble-effect {
        00% {
          clip-path: inset(35% 0% 55% 0%);
          transform: translate(5px, 2px);
        }
        10% {
          clip-path: inset(40% 0% 50% 0%);
          transform: translate(-5px, 2px);
        }
        20% {
          clip-path: inset(45% 0% 45% 0%);
          transform: translate(5px, 2px);
        }
        30% {
          clip-path: inset(50% 0% 40% 0%);
          transform: translate(5px, 2px);
        }
        40% {
          clip-path: inset(55% 0% 35% 0%);
          transform: translate(-15px, 2px);
        }
        50% {
          clip-path: inset(60% 0% 20% 0%);
          transform: translate(5px, 2px);
        }
        60% {
          clip-path: inset(65% 0% 15% 0%);
          transform: translate(-5px, 2px);
        }
        70% {
          clip-path: inset(70% 0% 20% 0%);
          transform: translate(15px, 2px);
        }
        80% {
          clip-path: inset(75% 0% 15% 0%);
          transform: translate(-5px, 2px);
        }
        90% {
          clip-path: inset(80% 0% 10% 0%);
          transform: translate(5px, 2px);
        }
        100% {
          clip-path: inset(85% 0% 5% 0%);
          transform: translate(-15px, 2px);
        }
      }
    }
  }
}
</style>
<template>
  <div class="login">
    <div class="background">
      <img v-show="myBackground" :src="bg1" alt="" />
      <img v-show="!myBackground" :src="bg2" alt="" />
    </div>
    <div class="change_bg">
      <Button @click="myBackground = !myBackground" type="info"
        >切换背景</Button
      >
    </div>
    <div class="logCenter">
      <div class="title">{{ date }}</div>
      <div class="inputOut">
        <input
          type="text"
          placeholder="请输入用户名"
          class="input"
          v-model="username"
        />
      </div>
      <div class="inputOut">
        <input
          type="password"
          placeholder="请输入密码"
          class="input"
          v-model="password"
        />
      </div>
      <!-- <div class="loginButton" @click="LoginMyPage">登录</div> -->
      <div class="cyberpunk" @click="LoginMyPage">
        <div class="banner"></div>
      </div>
    </div>
  </div>
</template>

<script>
import userImg from "@assets/figure.png";
// import store from '@src/store'
import passwdImg from "@assets/password.png";
import backgroundImg1 from "@assets/bg_01.png";
import backgroundImg2 from "@assets/bg_02.png";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      userImg: userImg,
      passwdImg: passwdImg,
      bg1: backgroundImg1,
      bg2: backgroundImg2,
      myBackground: false,
      date: new Date(),
    };
  },
  created() {
    this.$Message.config({
      top: 50,
      duration: 3,
    });
  },
  mounted() {
    let _this = this;
    this.timer = setInterval(function() {
      _this.date = new Date().toLocaleString();
    });
  },
  beforeDestroy: function() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    //有真实接口请求的时候使用该登录方法
    Login() {
      if (this.username == "" || this.password == "") {
        this.$Message.warning("账号密码不能为空");
      } else {
        this.$store
          .dispatch("login", {
            username: this.username,
            password: this.password,
          })
          .then((result) => {
            if (result.success == true) {
              //请求成功则进入主页
              this.$router.push({ name: "home" });
            } else {
              //抛出异常信息
              this.$Message.error(result.message);
            }
          });
      }
    },
    //模板不做真实接口请求，点击登录直接进入页面
    LoginMyPage() {
      this.$router.push({ name: "home" }); //vue路由跳转的方法之一
    },
  },
};
</script>
