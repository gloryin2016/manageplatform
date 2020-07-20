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

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')