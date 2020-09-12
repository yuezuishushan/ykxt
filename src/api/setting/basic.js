import axios from '@/libs/api.request'

/**
 * 获取基本设置
 * @returns {*}
 */
export const getSettingBasic = () => {
  return axios.request({
    url: '/sys/profile/profileList',
    method: 'get'
  })
}

/**
 * 保存基本设置
 * @param data
 * @returns {*}
 */
export const saveSettingBasic = (data) => {
  return axios.request({
    url: '/sys/profile/batchSave',
    data: data,
    method: 'post'
  })
}
