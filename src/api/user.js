import axios from '@/libs/api.request'

/**
 * 用户登录
 * @param userName
 * @param password
 * @returns {*}
 */
export const login = data => {
  const tempSubmitData = Object.assign(data)
  return axios.request({
    url: '/sys/user/login',
    data: tempSubmitData,
    method: 'post'
  })
}

/**
 * 获取当前用户信息
 * @returns {never}
 */
export const getUserInfo = (data) => {
  return axios.request({
    url: '/sys/user/login',
    data: data,
    method: 'post'
  })
}

/**
 * 获取当前用户权限
 * @returns {never}
 */
export const getUserAccess = () => {
  return axios.request({
    url: '/sys/accessauthor/getManagerAccessAuthor',
    method: 'get'
  })
}

/**
 * 修改密码
 * @param data
 * @returns {never}
 */
export const updatePassword = (data) => {
  return axios.request({
    url: '/sys/user/updatePwd',
    params: data,
    method: 'post'
  })
}
