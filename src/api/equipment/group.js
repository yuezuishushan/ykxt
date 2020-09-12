import axios from '@/libs/api.request'
/**
 *
 查询设备列表
 * @param id
 * @returns {*}
 */
export const getGoupList = (data) => {
  return axios.request({
    url: '/equipment/group/list',
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
export const addGroup = (data) => {
  return axios.request({
    url: '/equipment/group/add',
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
export const updateVerbal = (data) => {
  return axios.request({
    url: `/equipment/group/edit`,
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
export const getGroupDetail = (equipmentGroupId) => {
  return axios.request({
    url: `/equipment/group/${equipmentGroupId}`,
    method: 'get'
  })
}
/**
 *
 批量删除话术
 * @param id
 * @returns {*}
 */
export const deleteBatchGroup = (data) => {
  return axios.request({
    url: `/equipment/group/delete?equipmentGroupIds=${data}`,
    method: 'delete'
  })
}

