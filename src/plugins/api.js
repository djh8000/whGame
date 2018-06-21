import http from '../config/http'

// 授权验证
export const authLogin = params => {
  return http.post('/api/authLogin', params)
}
// 获取活动
export const getActivity = params => {
  return http.get('/api/activity/getPublishedActivity.do', params)
}
// 获取游戏
export const getGameInfo = params => {
  return http.get('/api/activity/getGameInfoById.do', params)
}
// 获取游戏次数
export const getGameTimes = params => {
  return http.get('/api/activity/getGamePlayTimes.do', params)
}
/api/activity/getGameDetailByMainId.do
// 获取游戏次数
export const getGameTimes = params => {
  return http.get('/api/activity/getGamePlayTimes.do', params)
}
/* -----↓↓↓↓登录权限接口↓↓↓↓----- */
