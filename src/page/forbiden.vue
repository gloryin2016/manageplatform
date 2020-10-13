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
      background-color: #3B65BB;
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
      <div class="title">非法操作</div>
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
