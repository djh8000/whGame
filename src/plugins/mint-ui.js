import Vue from 'vue'
import {
  Button,
  Toast,
  Popup,
  Indicator,
  Spinner,
  Actionsheet} from 'mint-ui'

export default (() => {
  // 按钮
  Vue.component(Button.name, Button)
  // 弹出框组件
  Vue.component(Popup.name, Popup)
  // loding
  Vue.component(Spinner.name, Spinner)
  // 底部弹框
  Vue.component(Actionsheet.name, Actionsheet)
  Vue.prototype.$Indicator = Indicator
  Vue.prototype.$msg = function (msg) {
    Toast({
      className: 'msg',
      message: msg,
      duration: 1000
    })
  }
})()
