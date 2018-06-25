import http from '../config/http'

// 授权验证
export const authLogin = params => {
  return http.post('/api/authLogin', params)
}
// 获取活动
export const getActivity = params => {
  return http.get('/api/activity/getActivity', params)
}
// 获取游戏
export const getGameInfo = params => {
  return http.get('/api/activity/getGames', params)
}
// 更新倒计时
export const grefGameTime = params => {
  return http.get('/api/activity/refGameTime', params)
}
// 提交结果
export const postResult = params => {
  return http.post('/api/activity/postResult', params)
}
// 游戏结束
export const gameOver = params => {
  return http.get('/api/activity/gameOver', params)
}
// 积分列表
export const scorelist = params => {
  return http.get('/api/user/getScoreDetail', params)
}
// 提交结果
export const exchangeScore = params => {
  return http.post('/api/user/postConversionScore', params)
}
/* -----↓↓↓↓登录权限接口↓↓↓↓----- */
