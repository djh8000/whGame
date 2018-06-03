export default {
  set (name, value, days) {
    var exp = new Date()
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toGMTString()
  },
  get (name) {
    var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
    if (arr !== null) {
      return unescape(arr[2])
    } else {
      return null
    }
  },
  del (name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = this.get(name)
    if (cval !== null) document.cookie = name + '=' + cval + ';domain=.zejicert.cn;path=/;expires=' + exp.toGMTString()
  },
  userId: function () {
    if (this.get('ssotoken')) {
      return this.get('ssotoken').split('.')[0]
    }
  },
  token: function () {
    if (this.get('ssotoken')) {
      return this.get('ssotoken').split('.')[1]
    }
  }
}
