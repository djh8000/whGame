import axios from 'axios'
import qs from 'qs'
import Url from './url'
import md5 from 'js-md5'
import $ from 'jquery'
import cookie from '../plugins/cookie'

// 请求公共配置
axios.defaults.baseURL = Url.api
axios.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded'}
axios.defaults.timeout = 10000

axios.interceptors.response.use(function (response) {
  if (Number(response.data.code) === 1000) {
    return response.data
  } else if (Number(response.data.code === 1002)) {
    window.vm.$msg(response.data.msg)
    cookie.del('ssotoken')
    // loginLose()
  } else {
    window.vm.$msg(response.data.msg)
  }
  return Promise.reject(response.data)
}, function (error) {
  // 当响应异常时做一些处理
  return Promise.reject(error)
})

export default {
  ksort (inputArr, sortFlags) {
    var tmpArr = {}
    var keys = []
    var sorter = ''
    var i = ''
    var k = ''
    var that = this
    var strictForIn = false
    var populateArr = {}
    switch (sortFlags) {
      case 'SORT_STRING':
        // compare items as strings
        sorter = function (a, b) {
          return that.strnatcmp(a, b)
        }
        break
      case 'SORT_LOCALE_STRING':
        // compare items as strings, original by the current locale (set with  i18n_loc_set_default() as of PHP6)
        var loc = this.i18n_loc_get_default()
        sorter = this.php_js.i18nLocales[loc].sorting
        break
      case 'SORT_NUMERIC':
        // compare items numerically
        sorter = function (a, b) {
          return ((a + 0) - (b + 0))
        }
        break
        // case 'SORT_REGULAR': // compare items normally (don't change types)
      default:
        sorter = function (a, b) {
          var aFloat = parseFloat(a)
          var bFloat = parseFloat(b)
          var aNumeric = aFloat + '' === a
          var bNumeric = bFloat + '' === b
          if (aNumeric && bNumeric) {
            return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0
          } else if (aNumeric && !bNumeric) {
            return 1
          } else if (!aNumeric && bNumeric) {
            return -1
          }
          return a > b ? 1 : a < b ? -1 : 0
        }
        break
    }

    // Make a list of key names
    for (k in inputArr) {
      if (inputArr.hasOwnProperty(k)) {
        keys.push(k)
      }
    }
    keys.sort(sorter)
    // BEGIN REDUNDANT
    this.php_js = this.php_js || {}
    this.php_js.ini = this.php_js.ini || {}
    // END REDUNDANT
    strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js
        .ini['phpjs.strictForIn'].local_value !== 'off'
    populateArr = strictForIn ? inputArr : populateArr

    // Rebuild array with sorted key names
    for (i = 0; i < keys.length; i++) {
      k = keys[i]
      tmpArr[k] = inputArr[k]
      if (strictForIn) {
        delete inputArr[k]
      }
    }
    for (i in tmpArr) {
      if (tmpArr.hasOwnProperty(i)) {
        populateArr[i] = tmpArr[i]
      }
    }

    return strictForIn || populateArr
  },
  sign (obj) {
    const myObject = this.ksort(obj)
    const str = []
    $.each(myObject, function (ke, val) {
      str.push(val)
    })
    return md5(str.join('#!0O*&'))
  },
  prodata (data, type) {
    var _arr = {
      sign: '',
      data: ''
    }
    var appPublic = cookie.get('appPublic')
    appPublic = JSON.parse(appPublic)
    var pubdata = {
      'version': '1.0',
      'unique_id': md5('app'),
      'platform': '5',
      'channel': '1',
      'user_id': cookie.userId() || 0,
      'token': cookie.token() || 0,
      ...appPublic,
      ...data
    }
    _arr.sign = this.sign(pubdata)
    _arr.data = JSON.stringify(pubdata)
    return _arr
  },
  post (url, data, isLogin) {
    if (isLogin && cookie.get('ssotoken') == null) {
      let URL = window.location.href
      window.location.href = Url.uchttp + '?fromUrl=' + URL + '&channel=1'
      return false
    }
    var Data = this.prodata(data)
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: qs.stringify(Data, {arrayFormat: 'brackets'})
      }).then(data => resolve(data)).catch(error => {
        console.warn('error了---->', error)
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
        console.warn('error了----->', error)
      })
    })
  }
}
