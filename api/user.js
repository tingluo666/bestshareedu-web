import http from './method'
// 获取手机验证码
export const getMobileCode = (params) => {
  return http().post('/user/api/user/send/code', params)
}
// 用户注册
export const register = (params={}) => {
  return http().post('/user/api/user/register', params)
}
// 用户登录
export const userLogin = (params={}) => {
  return http().post('/user/api/user/login/password', params)
}
// 用户信息
export const getUserInfo = (params={}) => {
  return http().post('/user/auth/user/ext/view', params)
}
//教学意向
export const getLecturerIntention = (params={}) => {
	return http().post('/user/auth/user/ext/viewLecturerIntention', params)
}
//学习意向
export const getUserIntention = (params={}) => {
	return http().post('/user/auth/user/ext/viewUserIntention', params)
}
// 课程详情
export const userCourseDetail = (params={}) => {
  return http().post('/course/auth/course/audit/view', params)
}
// 申请讲师
export const teacherEnter = (params={}) => {
  return http().post('/user/auth/lecturer/audit/save', params)
}
//省列表
export const getProvinceList = (params={}) => {
	return http().post('/user/api/region/list', params)
}
//市列表
export const getCityList = (params={}) => {
	return http().post('/user/api/region/list/province/level', params)
}