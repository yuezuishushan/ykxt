import axios from '@/libs/api.request'
/**
 *
 查询资料是否已经有数据
 * @param id
 * @returns {*}
 */
export const findData = (data) => {
  return axios.request({
    url: '/sys/novice/findData',
    params: data,
    method: 'get'
  })
}
/**
 *
 查询设置是否已经有数据
 * @param id
 * @returns {*}
 */
export const findSet = (data) => {
  return axios.request({
    url: '/sys/novice/findSet',
    params: data,
    method: 'get'
  })
}
/**
 *
 查询会员是否已经有数据
 * @param id
 * @returns {*}
 */
export const findOrg = (data) => {
  return axios.request({
    url: '/sys/novice/findOrg',
    params: data,
    method: 'get'
  })
}
/**
 *
 查询库存初始化是否已经有数据
 * @param id
 * @returns {*}
 */
export const findInitial = (data) => {
  return axios.request({
    url: '/sys/novice/findInitial',
    params: data,
    method: 'get'
  })
}
/**
 *
 查询应收应付初始是否已经有数据
 * @param id
 * @returns {*}
 */
export const findInitialize = (data) => {
  return axios.request({
    url: '/sys/novice/findInitialize',
    params: data,
    method: 'get'
  })
}
/**
 *
 查询会员是否初始化是否已经有数据
 * @param id
 * @returns {*}
 */
export const getOrgInitialize = (data) => {
  return axios.request({
    url: '/home/org/getOrgInitialize',
    params: data,
    method: 'get'
  })
}
/**
 *
 查询设置是否已经有数据
 * @param id
 * @returns {*}
 */
export const saveFinish = (data) => {
  return axios.request({
    url: `/sys/beg/save?billDate=${data}`,
    method: 'post'
  })
}
