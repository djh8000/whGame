// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import http from './config/http'
import cookie from './plugins/cookie'
import FastClick from 'fastclick'
// import Navigation from 'vue-navigation'
// import 'lib-flexible/flexible.js'
import './plugins/mint-ui'
import './assets/css/common.scss'
import './assets/css/theme.scss'

FastClick.attach(document.body)
Vue.prototype.$cookie = cookie
Vue.prototype.$http = http
// Vue.use(Navigation, {router})
Vue.config.productionTip = false

window.vm = new Vue({
  el: '#app',
  data: {
    eventHub: new Vue()
  },
  store,
  router,
  template: '<App/>',
  components: { App },
  render: h => h(App)
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isLogin)) {
    if (cookie.get('ssotoken') === null) {
      // loginLose()
    } else {
      next()
    }
  } else {
    next()
  }
})
