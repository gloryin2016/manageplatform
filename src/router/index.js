import Vue from 'vue'
import Router from 'vue-router'
import ViewUI from 'view-design';
Vue.use(Router)

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
          meta: {
            menus: ['0']
          },
        }, ]
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
          meta: {
            menus: ['1']
          },
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
            meta: {
              menus: ['2']
            },
          },
          {
            path: '/home/teacher/playVideo',
            name: 'playVideo',
            component: resolve =>
              require(['@page/teacher/playVideo.vue'], resolve),
            meta: {
              menus: ['2']
            },
          },
          {
            path: '/home/teacher/videoPlay',
            name: 'videoPlay',
            component: resolve =>
              require(['@page/teacher/videoPlay.vue'], resolve),
            meta: {
              menus: ['2']
            },
          },
          {
            path: '/home/teacher/audioPlay',
            name: 'audioPlay',
            component: resolve =>
              require(['@page/teacher/audioPlay.vue'], resolve),
            meta: {
              menus: ['2']
            },
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
            require(['@page/utils/coverCapture.vue'], resolve),
          meta: {
            menus: ['3']
          },
        }, {
          path: '/home/practicalFunctions/searchSongs',
          name: 'searchSongs',
          component: resolve =>
            require(['@page/utils/searchSongs.vue'], resolve),
          meta: {
            menus: ['3']
          },
        }, ]
      },
      {
        path: '/home/animation',
        name: 'animation',
        redirect: '/home/animation/sakura',
        component: resolve => require(['@page/analysis/index.vue'], resolve),
        children: [{
          path: '/home/animation/sakura',
          name: 'sakura',
          component: resolve =>
            require(['@page/animation/sakura.vue'], resolve),
          meta: {
            menus: ['4']
          },
        }, ]
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