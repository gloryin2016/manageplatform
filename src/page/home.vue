<style lang="less">
.index {
  width: 100%;
  min-width: 1080px;
  min-height: 100%;
  .head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    min-width: 1080px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #2e384a;
    box-sizing: border-box;
    padding-left: 20px;
    z-index: 2;
    .organ-logo {
      position: absolute;
      left: 15px;
      height: 54px;
      border-radius: 50%;
    }
    .headLeft {
      font-size: 0.16px;
      color: #fff;
      width: auto;
      padding: 0px 20px;
      box-sizing: border-box;
      margin-left: 40px;
      .foundation {
        height: 58px;
        line-height: 58px;
        text-align: center;
        cursor: pointer;
        font-size: 28px;
        text-shadow: 0 0 0.5em #6eb9d9, -0 -0 0.5em #6eb9d9;
      }
    }
    .headRight {
      height: 58px;
      display: flex;
      align-items: center;
      .logo {
        width: 18px;
        height: 18px;
      }
      .paddingdf {
        height: 100%;
        padding: 0px 16px;
        text-align: center;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #fff;
      }
      .paddingdf:hover {
        background-color: #242c3a;
        cursor: pointer;
      }
    }
  }
  .aside {
    width: 260px;
    height: 100%;
    overflow-y: auto;
    background-color: #425069;
    position: fixed;
    left: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 64px;
    z-index: 1;
  }
  .main {
    width: 100%;
    box-sizing: border-box;
    padding-left: 260px;
    padding-top: 64px;
    height: 100vh;
  }
}
</style>
<template>
  <div class="index">
    <div class="head">
      <img :src="logo" class="organ-logo" />
      <div class="headLeft">
        <div class="foundation">{{ name }}</div>
      </div>
      <div class="headRight">
        <img :src="userImg" class="logo" />
        <div class="paddingdf">
          <Dropdown>
            <span>管理员</span>
            <DropdownMenu slot="list">
              <DropdownItem
                v-for="(menu, index) in userMenus"
                :key="index"
                :name="menu.name"
                :divided="menu.hasDivided"
              >
                <Button type="text" @click="GoUserMange(menu.pathName)">{{
                  menu.title
                }}</Button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
    <div class="aside">
      <Menu
        theme="light"
        ref="menus"
        :active-name="selectedMenu"
        :open-names="openMenu"
        @updateOpened="UpdateOpened"
        @updateActiveName="UpdateActiveName"
        accordion
        width="260"
      >
        <Submenu
          v-for="(menu, menu_index) in menus"
          :key="menu_index"
          :name="menu.name"
        >
          <template slot="title">
            <Icon :type="menu.icon"></Icon>
            {{ menu.title }}
          </template>
          <menu-item
            v-for="(sub_menu, sub_menu_index) in menu.submenu"
            :key="sub_menu_index"
            :name="sub_menu.name"
            :to="{
              path: sub_menu.path,
              name: sub_menu.rName,
              query: {
                menuName: sub_menu.pathQuery,
              },
              params: {
                menuId: sub_menu.id,
                menuName: sub_menu.pathQuery,
              },
            }"
            ><Icon :type="sub_menu.icon"></Icon>{{ sub_menu.title }}</menu-item
          >
        </Submenu>
      </Menu>
    </div>
    <div class="main">
      <router-view />
    </div>
    <!-- <mplayer v-if="showPlayer"></mplayer> -->
  </div>
</template>
<script>
import logo from "@assets/avatar_02.jpg";
import axios from "axios";
import userImg from "@assets/figure.png";
import Mplayer from "@/components/playerMini";
const ROLE = "user";
export default {
  data() {
    return {
      logo,
      name: "测试名字",
      ROLE,
      // userImg: '../assets/figure.png',
      userImg,
      menus: [],
      selectedMenu: "",
      openMenu: ["dataAnalysis"],
      userMenus: [
        {
          name: "changeMain",
          title: "切换主题",
          pathName: "changeMain",
        },
        {
          name: "changePsword",
          title: "修改密码",
          pathName: "changePsword",
        },
        {
          name: "logout",
          title: "退出",
          pathName: "logout",
          hasDivided: true,
        },
      ],
      routerInfo: {},
      showPlayer: true,
    };
  },
  watch: {
    $route(to, from) {
      // console.log(this.$route.name);
      if(this.$route.name == 'audioPlay') {
        this.showPlayer = false
      }else {
        this.showPlayer = true
      }
    },
  },
  created() {
    this.GetMenuList()
  },
  mounted() {
    this.routerInfo = this.$route;
    // console.log(this.openMenu);
    // this.setMenu();
    // console.log(this.$route);
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Mplayer,
  },
  methods: {
    GetMenuList() {
      axios.get("/api/menuList.json").then(this.GetMenuListInfo);
    },
    GetMenuListInfo(res) {
      let myList = res.data.data.menuList;
      this.menus = myList
    },
    UpdateOpened(name) {
      console.log(name);
      this.openMenu = name;
    },
    UpdateActiveName(name) {
      this.$nextTick(() => {
        this.selectedMenu = name;
      });
    },
    setMenu() {
      this.$forceUpdate();
      this.openMenu = [];
      this.selectedMenu = this.$route.name;
      let index = parseInt(this.$route.meta.menus[0]);
      this.openMenu.push(this.menus[index].name);
      this.UpdateOpened(this.openMenu);
    },
  },
};
</script>
