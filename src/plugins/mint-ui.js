import Vue from 'vue'
import {
  Header,
  Button,
  Toast,
  Popup,
  Indicator,
  Spinner,
  Actionsheet} from 'mint-ui'

export default (() => {
  // header
  Vue.component(Header.name, Header)
  // button
  Vue.component(Button.name, Button)
  // 弹出框组件
  Vue.component(Popup.name, Popup)
  // loding
  Vue.component(Spinner.name, Spinner)
  // 底部弹框
  Vue.component(Actionsheet.name, Actionsheet)
  Vue.prototype.$loading = Indicator
  Vue.prototype.$msg = function (msg) {
    Toast({
      className: 'msg',
      message: msg,
      duration: 1000
    })
  }
})()
