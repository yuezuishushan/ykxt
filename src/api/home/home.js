import axios from '@/libs/api.request'
/**
 *
 查询库存预警和保质期预警
 * @param id
 * @returns {*}
 */
export const getWarningInfo = (data) => {
  return axios.request({
    url: '/home/warningInfo/getWarningInfo',
    params: data,
    method: 'get'
  })
}
/**
 *
 查询应收账款预警
 * @param id
 * @returns {*}
 */
export const getWarningReceivable = (data) => {
  return axios.request({
    url: '/home/org/getWarningReceivable',
    params: data,
    method: 'get'
  })
}
/**
 *
 查询应收账款预警
 * @param id
 * @returns {*}
 */
export const getOrderTodo = (data) => {
  return axios.request({
    url: '/home/todo/getOrderTodo',
    params: data,
    method: 'get'
  })
}
