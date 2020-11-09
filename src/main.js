import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AMap from 'vue-amap';
Vue.use(AMap);
AMap.initAMapApiLoader({
  // 高德key
  key: '',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation','AMap.PlaceSearch']
});
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.config.productionTip = false

Vue.use(ViewUI);

// 版权信息
window.myProject = window.myProject = `欢迎使用 憨憨工具!
当前版本为：V${'1.0.0'}
作者：Der
Github：https://github.com/gloryin2016/manageplatform
歌曲来源于网易云音乐 (https://music.163.com)`
// eslint-disable-next-line no-console
console.info(`%c${window.myProject}`, `color:blue`)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')