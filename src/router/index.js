import Vue from 'vue'
import Router from 'vue-router'
import ViewUI from 'view-design';
Vue.use(Router)

const routes = [
  {
    path: '',
    name: 'login',
    component: (resolve) => require(['@page/login.vue'], resolve),
  },
  {
    path: '/home',
    component: (resolve) => require(['@page/home.vue'], resolve),
    name: 'home',
    children: [
      {
        path: '/home/analysis',
        name: 'analysis',
        redirect: '/home/analysis/school',
        component: resolve => require(['@page/analysis/index.vue'], resolve),
        children: [
          {
            path: '/home/analysis/school',
            name: 'school',
            component: resolve =>
              require(['@page/analysis/school.vue'], resolve)
          },
        ]
      },
      {
        path: '/home/student',
        name: 'student',
        redirect: '/home/student/student',
        component: resolve => require(['@page/student/index.vue'], resolve),
        children: [
          {
            path: '/home/student/student',
            name: 'student',
            component: resolve =>
              require(['@page/student/student.vue'], resolve)
          },
        ]
      },
      {
        path: '/home/teacher',
        name: 'teacher',
        redirect: '/home/teacher/teacher',
        component: resolve => require(['@page/teacher/index.vue'], resolve),
        children: [
          {
            path: '/home/teacher/teacher',
            name: 'school',
            component: resolve =>
              require(['@page/teacher/teacher.vue'], resolve)
          },
          {
            path: '/home/teacher/playVideo',
            name: 'playVideo',
            component: resolve =>
              require(['@page/teacher/playVideo.vue'], resolve)
          },
        ]
      },
      {
        path: '/home/practicalFunctions',
        name: 'practicalFunctions',
        redirect: '/home/practicalFunctions/coverCapture',
        component: resolve => require(['@page/teacher/index.vue'], resolve),
        children: [
          {
            path: '/home/practicalFunctions/coverCapture',
            name: 'coverCapture',
            component: resolve =>
              require(['@page/utils/coverCapture.vue'], resolve)
          },
        ]
      },
      {
        path: '/home/animation',
        name: 'animation',
        redirect: '/home/animation/sakura',
        component: resolve => require(['@page/analysis/index.vue'], resolve),
        children: [
          {
            path: '/home/animation/sakura',
            name: 'sakura',
            component: resolve =>
              require(['@page/animation/sakura.vue'], resolve)
          },
        ]
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
