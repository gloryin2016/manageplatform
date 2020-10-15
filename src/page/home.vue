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
    z-index: 999;
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
    z-index: 648;
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
        theme="dark"
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
  </div>
</template>
<script>
import logo from "@assets/avatar_02.jpg";
import userImg from "@assets/figure.png";
const ROLE = "user";
export default {
  data() {
    return {
      logo,
      name: "测试名字",
      ROLE,
      // userImg: '../assets/figure.png',
      userImg,
      menus: [
        {
          name: "dataAnalysis",
          title: "数据统计",
          icon: "md-school",
          id: "0",
          submenu: [
            {
              name: "school",
              title: "学校数据",
              icon: "",
              id: "0",
              path: "/home/analysis/school",
            },
          ],
        },
        {
          name: "dataStudent",
          title: "学生管理",
          icon: "ios-people",
          id: "0",
          submenu: [
            {
              name: "student",
              title: "学生信息",
              icon: "",
              id: "0",
              path: "/home/student/student",
            },
          ],
        },
        {
          name: "dataTeacher",
          title: "教师管理",
          icon: "ios-contacts",
          id: "0",
          submenu: [
            {
              name: "teacher",
              title: "教师信息",
              icon: "",
              id: "0",
              path: "/home/teacher/teacher",
            },
            {
              name: "playData",
              title: "视频播放",
              icon: "",
              id: "1",
              path: "/home/teacher/playVideo",
            },
            {
              name: "videoPlay",
              title: "视频播放器组件",
              icon: "",
              id: "2",
              path: "/home/teacher/videoPlay",
            },
            {
              name: "audioPlay",
              title: "音频播放器",
              icon: "",
              id: "3",
              path: "/home/teacher/audioPlay",
            },
          ],
        },
        {
          name: "practicalFunctions",
          title: "常用工具",
          icon: "md-planet",
          id: "0",
          submenu: [
            {
              name: "coverCapture",
              title: "视频封面截取",
              icon: "",
              id: "0",
              path: "/home/practicalFunctions/coverCapture",
            },
            {
              name: "searchSongs",
              title: "歌曲搜索",
              icon: "",
              id: "1",
              path: "/home/practicalFunctions/searchSongs",
            },
          ],
        },
        {
          name: "dataAnimation",
          title: "动画案例",
          icon: "md-school",
          id: "0",
          submenu: [
            {
              name: "sakura",
              title: "樱花",
              icon: "",
              id: "0",
              path: "/home/animation/sakura",
              pathQuery: "sakura",
            },
          ],
        },
      ],
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
    };
  },
  created() {},
  mounted() {
    this.routerInfo = this.$route;
    console.log(this.openMenu);
    // this.setMenu();
    console.log(this.$route);
  },
  // watch: {
  //   $route: {
      
  //   },
  // },
  methods: {
    UpdateOpened(name) {
      console.log(name);
      this.openMenu = name;
    },
    UpdateActiveName(name) {
      this.$nextTick(() => {
        this.selectedMenu = name;
      });
    },
    searchRouterInfo(val) {
      console.log("router", val);
    },
    setMenu() {
      this.$forceUpdate();
      this.openMenu = []
      this.selectedMenu = this.$route.name;
      let index = parseInt(this.$route.meta.menus[0]);
      this.openMenu.push(this.menus[index].name);
      this.UpdateOpened(this.openMenu)
      console.log(index, this.openMenu);
      console.log("激活菜单", this.selectedMenu);
    },
  },
};
</script>
