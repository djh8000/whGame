import axios from 'axios'
import qs from 'qs'
import Url from './url'
import cookie from '../plugins/cookie'

// 请求公共配置
axios.defaults.baseURL = Url.api
axios.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded'}
axios.defaults.timeout = 10000

axios.interceptors.response.use(function (response) {
  if (Number(response.data.code) === 1000) {
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
      'userId': cookie.userId(),
      'token': cookie.token(),
      ...data
    }
    return pubdata
  },
  post (url, data, isLogin) {
    // if (isLogin && cookie.get('ssotoken') == null) {
    //   let URL = window.location.href
    //   window.location.href = Url.uchttp + '?fromUrl=' + URL + '&channel=1'
    //   return false
    // }
    var Data = this.prodata(data)
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: qs.stringify(Data, {arrayFormat: 'brackets'})
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
