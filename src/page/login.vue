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
      width: 100%;
      height: 49px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0px 20px 0px 10px;
      background-color: rgba(0, 0, 0, 0.3);
      margin-bottom: 22px;
      border-radius: 6px;
      .figure {
        width: 20px;
        height: 20px;
      }
      .input {
        width: 380px;
        color: #111;
        height: 47px;
        box-sizing: border-box;
        padding: 12px 5px 12px 15px;
      }
    }
    .loginButton {
      width: 100%;
      height: 48px;
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
      <div class="title">{{date}}</div>
      <div class="inputOut">
        <img :src="userImg" class="figure" />
        <input
          type="text"
          placeholder="请输入用户名"
          class="input"
          v-model="username"
        />
      </div>
      <div class="inputOut">
        <img :src="passwdImg" class="figure" />
        <input
          type="password"
          placeholder="请输入密码"
          class="input"
          v-model="password"
        />
      </div>
      <Button type="primary" class="loginButton" @click="LoginMyPage"
        >登录</Button
      >
    </div>
  </div>
</template>

<script>
import userImg from '@assets/figure.png'
// import store from '@src/store'
import passwdImg from '@assets/password.png'
import backgroundImg1 from '@assets/bg_01.png'
import backgroundImg2 from '@assets/bg_02.png'
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      userImg: userImg,
      passwdImg: passwdImg,
      bg1: backgroundImg1,
      bg2: backgroundImg2,
      myBackground: false,
      date: new Date(),
    }
  },
  created() {
    this.$Message.config({
      top: 50,
      duration: 3,
    })
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
      if (this.username == '' || this.password == '') {
        this.$Message.warning('账号密码不能为空')
      } else {
        this.$store
          .dispatch('login', {
            username: this.username,
            password: this.password,
          })
          .then((result) => {
            if (result.success == true) {
              //请求成功则进入主页
              this.$router.push({ name: 'home' })
            } else {
              //抛出异常信息
              this.$Message.error(result.message)
            }
          })
      }
    },
    //模板不做真实接口请求，点击登录直接进入页面
    LoginMyPage() {
      this.$router.push({ name: 'home' }) //vue路由跳转的方法之一
    },
  },
}
</script>
