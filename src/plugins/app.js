import http from '../config/http'

// 动态列表
export const dynamicGetList = params => {
  return http.post('api/dynamic/getList', params)
}
/* -----↓↓↓↓登录权限接口↓↓↓↓----- */
