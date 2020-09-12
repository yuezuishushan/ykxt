import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import mixin from './mixin'
import ViewUI from 'view-design'
import Contextmenu from 'iview-contextmenu'
import VueAMap from 'vue-amap'
import iViewPro from './assets/iview-pro/iview-pro.min.js'
import Access from '_c/access'
import i18n from '@/locale'
import config from '@/config'
import imageFilter from '@/filter/module/image'
import importDirective from '@/directive'
import importFilters from '@/filter'
import VueLazyLoad from 'vue-lazyload'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
// import wsConnection from '@/libs/websocket'
import './index.less'
import defaultPic from './assets/images/default.jpg'
import loadingPic from './assets/images/loading.gif'

Vue.use(ViewUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(iViewPro)
Vue.use(Contextmenu)
Vue.use(VueAMap)
Vue.component('Access', Access)
VueAMap.initAMapApiLoader({
  key: config.aMapKey,
  plugin: ['AMap.Geocoder', 'AMap.ToolBar'],
  uiVersion: '1.0.11',
  v: '1.4.13'
})
Vue.mixin(mixin)
installPlugin(Vue)

Vue.config.productionTip = false
Vue.prototype.$config = config
// Vue.prototype.$setWs = wsConnection

Vue.use(VueLazyLoad, {
  lazyComponent: true,
  preLoad: 1.3,
  attempt: 1,
  error: defaultPic,
  loading: loadingPic,
  filter: {
    format (listener, options) {
      listener.src = imageFilter(listener.src)
    }
  }
})
importDirective(Vue)
importFilters(Vue)
Vue.directive('clickOutside', clickOutside)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
