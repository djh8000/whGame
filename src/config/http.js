import axios from 'axios'
import qs from 'qs'
import Url from './url'
// import cookie from '../plugins/cookie'
// import {authLogin} from '../plugins'

// 请求公共配置
axios.defaults.baseURL = Url.api
axios.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded'}
axios.defaults.timeout = 10000

axios.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers['x-token-key'] = localStorage.getItem('token')
  }
  return config
}, function (error) {
  // 当响应异常时做一些处理
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  switch (response.data.code) {
    case 1000:
      if (response.headers['x-token-key']) {
        localStorage.setItem('token', response.headers['x-token-key'])
      }
      return response.data
    case 2002:
      window.vm.$msg(response.data.msg)
      setTimeout(function () {
        window.vm.$router.push('/')
      }, 1000)
      break
    case 2004:
      localStorage.removeItem('token')
      window.vm.$msg('停留时间过长，返回请重新操作！')
      setTimeout(function () {
        window.vm.$router.push('/')
      }, 1000)
      break
    default:
      window.vm.$msg(response.data.msg)
      break
  }
}, function (error) {
  // 当响应异常时做一些处理
  return Promise.reject(error)
})

export default {
  post (url, data, isLogin) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: qs.stringify(data)
      }).then(data => resolve(data)).catch(error => {
        console.warn('返回错误', error)
      })
    })
  },
  get (url, params) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: params // get 请求时带的参数
      }).then(data => resolve(data)).catch(error => {
        console.warn('返回错误', error)
      })
    })
  }
}
