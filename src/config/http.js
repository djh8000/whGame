import axios from 'axios'
import qs from 'qs'
import Url from './url'
import cookie from '../plugins/cookie'

// 请求公共配置
axios.defaults.baseURL = Url.api
axios.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded'}
axios.defaults.timeout = 10000

axios.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers['X-Token-Key'] = localStorage.getItem('token')
  }
  return config
}, function (error) {
  // 当响应异常时做一些处理
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  if (Number(response.data.code) === 1000) {
    if (response.headers['X-Token-Key']) {
      // window.vm.$store.commit('setToken', response.data.token)
      localStorage.setItem('token', response.headers['X-Token-Key'])
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
  prodata (data, type) {
    var pubdata = {
      userId: '1',
      userName: 'djh',
      ...data
    }
    return pubdata
  },
  post (url, data, isLogin) {
    var Data = this.prodata(data)
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: qs.stringify(Data)
      }).then(data => resolve(data)).catch(error => {
        console.warn('返回错误', error)
      })
    })
  },
  get (url, params) {
    var Data = this.prodata(params)
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: Data // get 请求时带的参数
      }).then(data => resolve(data)).catch(error => {
        console.warn('返回错误', error)
      })
    })
  }
}
