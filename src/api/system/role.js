import axios from '@/libs/api.request'
/**
 *
 查询所有权限菜单列表
 * @param id
 * @returns {*}
 */
export const finMenuList = (data) => {
  return axios.request({
    url: '/sys/menu/tree',
    params: data,
    method: 'get'
  })
}
/**
 *
 查询角色列表
 * @param id
 * @returns {*}
 */
export const getRoleList = (data) => {
  return axios.request({
    url: '/sys/role/list',
    params: data,
    method: 'get'
  })
}
/**
 *
 新增角色
 * @param id
 * @returns {*}
 */
export const addRole = (data) => {
  return axios.request({
    url: '/sys/role/add',
    data: data,
    method: 'post'
  })
}
/**
 *
 编辑角色
 * @param id
 * @returns {*}
 */
export const updateRole = (data) => {
  return axios.request({
    url: `/sys/role/edit`,
    data: data,
    method: 'put'
  })
}
/**
 *
 角色详情
 * @param id
 * @returns {*}
 */
export const getRoleDetail = (roleId) => {
  return axios.request({
    url: `/sys/role/${roleId}`,
    method: 'get'
  })
}
/**
 *
 批量删除角色
 * @param id
 * @returns {*}
 */
export const deleteBatchRole = (data) => {
  return axios.request({
    url: `/sys/role/batchDelete?roleIds=${data}`,
    method: 'delete'
  })
}

