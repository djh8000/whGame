// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import http from './config/http'
import cookie from './plugins/cookie'
import FastClick from 'fastclick'
import VueWechatTitle from 'vue-wechat-title'
import './plugins/mint-ui'
import './assets/css/common.scss'
import './assets/css/theme.scss'

Vue.use(VueWechatTitle)
FastClick.attach(document.body)
Vue.prototype.$cookie = cookie
Vue.prototype.$http = http
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
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.matched.some(record => record.meta.isLogin)) {
    if (localStorage.getItem('token') === null) {
      window.vm.$msg('未登录，请到“文化嘉定云”上登陆！')
    } else {
      next()
    }
  } else {
    next()
  }
})
