import axios from '@/libs/api.request'
/**
 *
 查询设备列表下拉
 * @param id
 * @returns {*}
 */
export const findGroup = (notCache) => {
  return axios.request({
    url: '/equipment/group/name',
    method: 'get',
    notCache: notCache
  })
}
/**
 *
 查询设备列表
 * @param id
 * @returns {*}
 */
export const getEquipmentList = (data) => {
  return axios.request({
    url: '/equipment/equipment/list',
    params: data,
    method: 'get'
  })
}
/**
 *
 新增话术
 * @param id
 * @returns {*}
 */
export const addVerbal = (data) => {
  return axios.request({
    url: '/dataCenter/verbal/add',
    data: data,
    method: 'post'
  })
}
/**
 *
 编辑话术
 * @param id
 * @returns {*}
 */
export const updateVerbal = (verbalId, data) => {
  return axios.request({
    url: `/dataCenter/verbal/update/${verbalId}`,
    data: data,
    method: 'put'
  })
}
/**
 *
 话术详情
 * @param id
 * @returns {*}
 */
export const getVerbalDetail = (verbalId) => {
  return axios.request({
    url: `/dataCenter/verbal/${verbalId}`,
    method: 'get'
  })
}
/**
 *
 批量删除话术
 * @param id
 * @returns {*}
 */
export const deleteBatchVerbal = (data) => {
  return axios.request({
    url: `/dataCenter/verbal/batchDelete?verbalIds=${data}`,
    method: 'delete'
  })
}
/**
 *
 删除话术
 * @param id
 * @returns {*}
 */
export const deleteVerbal = (verbalId) => {
  return axios.request({
    url: `/dataCenter/verbal/delete/${verbalId}`,
    method: 'delete'
  })
}
