import axios from '@/libs/api.request'

/**
 * 获取用户权限
 * @returns {*}
 */
export const getMenuTree = () => {
  return axios.request({
    url: '/sys/user/menuTree',
    method: 'get'
  })
}
/**
 *
 查询用户列表
 * @param id
 * @returns {*}
 */
export const getUserList = (data) => {
  return axios.request({
    url: '/sys/user/list',
    params: data,
    method: 'get'
  })
}
/**
 *
 更新状态
 * @param id
 * @returns {*}
 */
export const updateStatus = (data) => {
  return axios.request({
    url: `/sys/user/changeStatus`,
    params: data,
    method: 'put'
  })
}
/**
 *
 获取用户所属角色和系统角色
 * @param id
 * @returns {*}
 */
export const getRoles = (data) => {
  return axios.request({
    url: `/sys/user/getRoles`,
    params: data,
    method: 'get'
  })
}
/**
 *
 赋予角色
 * @param id
 * @returns {*}
 */
export const associationRole = (data) => {
  return axios.request({
    url: `/sys/user/associationRole`,
    data: data,
    method: 'post'
  })
}
/**
 *s
 新增管理用户
 * @param id
 * @returns {*}
 */
export const register = (data) => {
  return axios.request({
    url: '/sys/user/register',
    data: data,
    method: 'post'
  })
}
/**
 *
 编辑管理用户
 * @param id
 * @returns {*}
 */
export const updateUser = (data) => {
  return axios.request({
    url: `/sys/user/edit`,
    data: data,
    method: 'put'
  })
}
/**
 *
 管理用户详情
 * @param id
 * @returns {*}
 */
export const getUserDetail = (userId) => {
  return axios.request({
    url: `/sys/user/${userId}`,
    method: 'get'
  })
}
