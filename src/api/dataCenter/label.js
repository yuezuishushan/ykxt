import axios from '@/libs/api.request'
/**
 *
 查询标签列表
 * @param id
 * @returns {*}
 */
export const getLabelList = (data) => {
  return axios.request({
    url: '/dataCenter/label/list',
    params: data,
    method: 'get'
  })
}
/**
 *
 获取标签详情
 * @param id
 * @returns {*}
 */
export const getTabelDetail = (labelId) => {
  return axios.request({
    url: `/dataCenter/label/${labelId}`,
    method: 'get'
  })
}
/**
 *
 编辑标签
 * @param id
 * @returns {*}
 */
export const updateLabel = (labelId, data) => {
  return axios.request({
    url: `/dataCenter/label/update/${labelId}`,
    data: data,
    method: 'put'
  })
}
/**
 *
 新增标签
 * @param id
 * @returns {*}
 */
export const addLable = (data) => {
  return axios.request({
    url: '/dataCenter/label/add',
    data: data,
    method: 'post'
  })
}
/**
 *
 删除标签
 * @param id
 * @returns {*}
 */
export const deleteLable = (data) => {
  return axios.request({
    url: `/dataCenter/label/batchDelete?labelIds=${data}`,
    method: 'delete'
  })
}
