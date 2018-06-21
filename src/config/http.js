import axios from 'axios'
import qs from 'qs'
import Url from './url'
import cookie from '../plugins/cookie'

// 请求公共配置
axios.defaults.baseURL = Url.api
axios.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded'}
axios.defaults.timeout = 10000

axios.interceptors.request.use(config => {
  if (window.vm.$store.getters.getToken) {
    config.headers['x-token-key'] = window.vm.$store.getters.getToken
  }
  return config
}, function (error) {
  // 当响应异常时做一些处理
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  console.log(response.headers)
  if (Number(response.data.code) === 1000) {
    if (response.headers['x-token-key']) {
      window.vm.$store.commit('setToken', response.headers['x-token-key'])
    }
    return response.data
  } else if (Number(response.data.code === 2000)) {
    window.vm.$msg(response.data.msg)
    cookie.del('ssotoken')
  } else {
    window.vm.$msg(response.data.msg)
  }
  return Promise.reject(response.data)
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
