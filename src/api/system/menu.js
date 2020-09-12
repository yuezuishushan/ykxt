import axios from '@/libs/api.request'

/**
 * 获取菜单列表
 * @returns {*}
 */
export const getMenuList = data => {
  return axios.request({
    url: '/sys/menu/list',
    params: data,
    method: 'get'
  })
}
