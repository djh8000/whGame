import http from '../config/http'

// 授权验证
export const authLogin = params => {
  return http.post('/api/authLogin', params)
}
// 获取活动
export const getActivity = params => {
  return http.get('/api/activity/getPublishedActivity.do', params)
}
/* -----↓↓↓↓登录权限接口↓↓↓↓----- */
