import Vue from 'vue'
import Router from 'vue-router'
import ViewUI from 'view-design';
Vue.use(Router)
const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {  return originalPush.call(this, location).catch(err => err)}

const routes = [{
    path: '',
    name: 'login',
    component: (resolve) => require(['@page/login.vue'], resolve),
  },
  {
    path: '/404',
    name: 'forbiden',
    component: (resolve) => require(['@page/forbiden.vue'], resolve),
  },
  {
    path: '/home',
    component: (resolve) => require(['@page/home.vue'], resolve),
    name: 'home',
    children: [{
        path: '/home/analysis',
        name: 'analysis',
        redirect: '/home/analysis/school',
        component: resolve => require(['@page/analysis/index.vue'], resolve),
        children: [{
          path: '/home/analysis/school',
          name: 'school',
          component: resolve =>
            require(['@page/analysis/school.vue'], resolve),
        }, {
          path: '/home/analysis/discoverMusic',
          name: 'discoverMusic',
          component: resolve =>
            require(['@page/analysis/discoverMusic.vue'], resolve),
        },]
      },
      {
        path: '/home/student',
        name: 'student',
        redirect: '/home/student/student',
        component: resolve => require(['@page/student/index.vue'], resolve),
        children: [{
          path: '/home/student/student',
          name: 'student',
          component: resolve =>
            require(['@page/student/student.vue'], resolve),
        }, ]
      },
      {
        path: '/home/teacher',
        name: 'teacher',
        redirect: '/home/teacher/teacher',
        component: resolve => require(['@page/teacher/index.vue'], resolve),
        children: [{
            path: '/home/teacher/teacher',
            name: 'teacher',
            component: resolve =>
              require(['@page/teacher/teacher.vue'], resolve),
          },
          {
            path: '/home/teacher/playVideo',
            name: 'playVideo',
            component: resolve =>
              require(['@page/teacher/playVideo.vue'], resolve),
          },
          {
            path: '/home/teacher/videoPlay',
            name: 'videoPlay',
            component: resolve =>
              require(['@page/teacher/videoPlay.vue'], resolve),
          },
          {
            path: '/home/teacher/audioPlay',
            name: 'audioPlay',
            component: resolve =>
              require(['@page/teacher/audioPlay.vue'], resolve),
          },
        ]
      },
      {
        path: '/home/practicalFunctions',
        name: 'practicalFunctions',
        redirect: '/home/practicalFunctions/coverCapture',
        component: resolve => require(['@page/teacher/index.vue'], resolve),
        children: [{
          path: '/home/practicalFunctions/coverCapture',
          name: 'coverCapture',
          component: resolve =>
            require(['@page/search/coverCapture.vue'], resolve),
        }, {
          path: '/home/practicalFunctions/getCanvas',
          name: 'getCanvas',
          component: resolve =>
            require(['@page/search/getCanvas.vue'], resolve),
        },{
          path: '/home/practicalFunctions/searchSongs',
          name: 'searchSongs',
          component: resolve =>
            require(['@page/search/searchSongs.vue'], resolve),
        },{
          path: '/home/practicalFunctions/bilibili',
          name: 'bilibili',
          component: resolve =>
            require(['@page/search/bilibili.vue'], resolve),
        },]
      },
      {
        path: '/home/animation',
        name: 'animation',
        redirect: '/home/animation/sakura',
        component: resolve => require(['@page/analysis/index.vue'], resolve),
        children: [{
          path: '/home/animation/apple',
          name: 'apple',
          component: resolve =>
            require(['@page/animation/apple.vue'], resolve),
        }, {
          path: '/home/animation/sakura',
          name: 'sakura',
          component: resolve =>
            require(['@page/animation/sakura.vue'], resolve),
        }, {
          path: '/home/animation/test',
          name: 'testAnimation',
          component: resolve =>
            require(['@page/animation/test.vue'], resolve),
        },{
          path: '/home/animation/card',
          name: 'cardFlip',
          component: resolve =>
            require(['@page/animation/cardFlip.vue'], resolve),
        },{
          path: '/home/animation/fliter',
          name: 'pictureFliter',
          component: resolve =>
            require(['@page/animation/fliter.vue'], resolve),
        },{
          path: '/home/animation/bloodMoon',
          name: 'bloodMoon',
          component: resolve =>
            require(['@page/animation/bloodMoon.vue'], resolve),
        },{
          path: '/home/animation/eye',
          name: 'bloodEye',
          component: resolve =>
            require(['@page/animation/eye.vue'], resolve),
        },]
      },
    ]
  },
]

const router = new Router({
  mode: 'history',
  routes,
})

router.afterEach(() => {
  ViewUI.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router