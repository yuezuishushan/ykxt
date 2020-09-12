import config from '@/config'
import axios from '@/libs/api.request'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

export const getAxios = () => {
  return axios.getAxios()
}

export const uploadConfig = {
  url: `${baseUrl}/bae/image/upload`
}

/**
 * 上传文件
 * @param formData
 * @returns {*}
 */
export const uploadFile = formData => {
  return axios.request({
    url: `/bae/image/upload`,
    data: formData,
    method: 'post'
  })
}

/**
 * 获取省市区
 * @returns {*}
 */
export const getArea = () => {
  return axios.request({
    url: `/sys/area/find`,
    method: 'get'
  })
}

/**
 * 获取验证码
 * @returns {never}
 */
export const getCaptcha = () => {
  return axios.request({
    url: `/oauth/captcha`,
    method: 'get'
  })
}
/**
 * 获取(查询产品价格(开单、销售、分销订货、分销订货、分销、调拨、采购、其他入库)
 * channelTyp 0=零售(开单) 1=批发(销售) 2=内部(分销订货、分销、调拨) 3=采购、其他入库
 * channelTyp=2->relationId(门店主键) channelTyp=3->relationId(供应商主键) channelTyp=0或1->relationId(会员主键))
 * @returns {*}
 */
export const getProductPrice = (data, notQueue) => {
  return axios.request({
    url: '/bae/productStock/selectProductPrice',
    params: data,
    method: 'get',
    notQueue: notQueue
  })
}

/**
 * 批量(查询产品价格(开单、销售、分销订货、分销订货、分销、调拨、采购、其他入库)
 * channelTyp 0=零售(开单) 1=批发(销售) 2=内部(分销订货、分销、调拨) 3=采购、其他入库
 * channelTyp=2->relationId(门店主键) channelTyp=3->relationId(供应商主键) channelTyp=0或1->relationId(会员主键))
 * @param data
 * @returns {never}
 */
export const getProductPriceList = (data, notQueue) => {
  return axios.request({
    url: '/bae/productStock/selectProductListPrice',
    data: data,
    method: 'post',
    notQueue: notQueue
  })
}

/**
 * 获取商品的价格(其他出库、调拨、报损调用)
 * @returns {*}
 */
export const getInventoryPrice = (data, notQueue) => {
  return axios.request({
    url: '/bae/productStock/selectInventoryPrice',
    params: data,
    method: 'get',
    notQueue: notQueue
  })
}
/**
 * 弹窗查询批次号
 * @returns {*}
 */
export const selectBatchNo = (data, notQueue) => {
  return axios.request({
    url: '/bae/productStock/selectProductBatchPoPage',
    params: data,
    method: 'get',
    notQueue: notQueue
  })
}
/**
 * 列表查询批次号
 * @returns {*}
 */
export const getProductBatchPoList = (data, notQueue) => {
  return axios.request({
    url: '/bae/productStock/selectProductBatchPoList',
    params: data,
    method: 'get',
    notQueue: notQueue
  })
}
/**
 * 获取会员下拉列表
 * @returns {*}
 */
export const getMemberList = (data, notQueue) => {
  return axios.request({
    url: `/bae/organization/list`,
    params: data,
    method: 'get',
    notQueue: notQueue
  })
}

/**
 * 获取缓存产品数据
 * @param data
 * @param remote
 * @returns {Promise<unknown>}
 */
export const getCacheProduct = (data, remote, remoteFilter) => {
  const tempKey = 'GLOBAL_PRODUCT'
  const filterData = (filter = {}) => {
    let tempAllList = []
    if (sessionStorage.getItem(tempKey)) {
      try {
        tempAllList = JSON.parse(sessionStorage.getItem(tempKey))
      } catch (e) {
        tempAllList = []
      }
    }
    let tempList = []
    if (tempAllList.length === 0) {
      return tempList
    }
    for (let i in tempAllList) {
      if (tempAllList[i].name && tempAllList[i].name.indexOf(filter.name || '') > -1) {
        tempList.push(tempAllList[i])
      }
    }
    return tempList
  }
  return new Promise((resolve, reject) => {
    if (remote) {
      axios.request({
        url: `/bae/productStock/selectProductBasePoList`,
        method: 'get',
        params: remoteFilter || {}
      }).then(res => {
        let tempData = res.data
        sessionStorage.setItem(tempKey, JSON.stringify(tempData))
        resolve(filterData(data))
      }).catch(err => {
        reject(err)
      })
    } else {
      resolve(filterData(data))
    }
  })
}

/**
 * 获取缓存出库产品数据
 * @param data
 * @param remote
 * @returns {Promise<any>}
 */
export const getCacheDeliveryProduct = (data, remote, remoteFilter) => {
  const tempKey = 'GLOBAL_DELIVERY_PRODUCT'
  const filterData = (filter = {}) => {
    let tempAllList = []
    if (sessionStorage.getItem(tempKey)) {
      try {
        tempAllList = JSON.parse(sessionStorage.getItem(tempKey))
      } catch (e) {
        tempAllList = []
      }
    }
    let tempList = []
    if (tempAllList.length === 0) {
      return tempList
    }
    for (let i in tempAllList) {
      if (tempAllList[i].name && tempAllList[i].name.indexOf(filter.name || '') > -1) {
        tempList.push(tempAllList[i])
      }
    }
    return tempList
  }
  return new Promise((resolve, reject) => {
    if (remote) {
      axios.request({
        url: `/bae/productStock/selectOutProductBasePoList`,
        method: 'get',
        params: remoteFilter || {}
      }).then(res => {
        let tempData = res.data
        sessionStorage.setItem(tempKey, JSON.stringify(tempData))
        resolve(filterData(data))
      }).catch(err => {
        reject(err)
      })
    } else {
      resolve(filterData(data))
    }
  })
}

/**
 * 获取缓存员工数据
 * @param data
 * @param remote
 * @returns {Promise<unknown>}
 */
export const getCacheEmployee = (data, remote, remoteFilter) => {
  const tempKey = 'GLOBAL_EMPLOYEE'
  const filterData = (filter = {}) => {
    let tempAllList = []
    if (sessionStorage.getItem(tempKey)) {
      try {
        tempAllList = JSON.parse(sessionStorage.getItem(tempKey))
      } catch (e) {
        tempAllList = []
      }
    }
    let tempList = []
    if (tempAllList.length === 0) {
      return tempList
    }
    for (let i in tempAllList) {
      if (tempAllList[i].name.indexOf(filter.name || '') === -1) {
        continue
      }
      if (filter.storeId && tempAllList[i].storeId !== filter.storeId) {
        continue
      }
      tempList.push(tempAllList[i])
    }
    return tempList
  }
  return new Promise((resolve, reject) => {
    if (remote) {
      axios.request({
        url: `/bae/empHandler/selectEmpBasePoList`,
        method: 'get',
        params: remoteFilter || {}
      }).then(res => {
        let tempData = res.data
        sessionStorage.setItem(tempKey, JSON.stringify(tempData))
        resolve(filterData(data))
      }).catch(err => {
        reject(err)
      })
    } else {
      resolve(filterData(data))
    }
  })
}

/**
 * 获取缓存供应商数据
 * @param data
 * @param remote
 * @returns {Promise<unknown>}
 */
export const getCacheSupplier = (data, remote, remoteFilter) => {
  const tempKey = 'GLOBAL_SUPPLIER'
  const filterData = (filter = {}) => {
    let tempAllList = []
    if (sessionStorage.getItem(tempKey)) {
      try {
        tempAllList = JSON.parse(sessionStorage.getItem(tempKey))
      } catch (e) {
        tempAllList = []
      }
    }
    let tempList = []
    if (tempAllList.length === 0) {
      return tempList
    }
    for (let i in tempAllList) {
      if (tempAllList[i].name.indexOf(filter.name || '') === -1) {
        continue
      }
      tempList.push(tempAllList[i])
    }
    return tempList
  }
  return new Promise((resolve, reject) => {
    if (remote) {
      axios.request({
        url: `/bae/supplierHandler/selectSupplierBasePoList`,
        method: 'get',
        params: remoteFilter || {}
      }).then(res => {
        let tempData = res.data
        sessionStorage.setItem(tempKey, JSON.stringify(tempData))
        resolve(filterData(data))
      }).catch(err => {
        reject(err)
      })
    } else {
      resolve(filterData(data))
    }
  })
}
/**
 * 获取缓存客户数据
 * @param data
 * @param remote
 * @returns {Promise<unknown>}
 */
export const getOrganization = (data, remote, remoteFilter) => {
  const tempKey = 'GLOBAL_ORGANIZATION'
  const filterData = (filter = {}) => {
    let tempAllList = []
    if (sessionStorage.getItem(tempKey)) {
      try {
        tempAllList = JSON.parse(sessionStorage.getItem(tempKey))
      } catch (e) {
        tempAllList = []
      }
    }
    let tempList = []
    if (tempAllList.length === 0) {
      return tempList
    }
    for (let i in tempAllList) {
      tempList.push(tempAllList[i])
    }
    return tempList
  }
  return new Promise((resolve, reject) => {
    if (remote) {
      axios.request({
        url: `/bae/orgHandler/findOrgInfo`,
        method: 'get',
        params: remoteFilter || {}
      }).then(res => {
        let tempData = res.data
        sessionStorage.setItem(tempKey, JSON.stringify(tempData))
        resolve(filterData(data))
      }).catch(err => {
        reject(err)
      })
    } else {
      resolve(filterData(data))
    }
  })
}

export const getCacheWarehouse = (data, remote, remoteFilter) => {
  const tempKey = 'GLOBAL_WAREHOUSE'
  const filterData = (filter = {}) => {
    let tempAllList = []
    if (sessionStorage.getItem(tempKey)) {
      try {
        tempAllList = JSON.parse(sessionStorage.getItem(tempKey))
      } catch (e) {
        tempAllList = []
      }
    }
    let tempList = []
    if (tempAllList.length === 0) {
      return tempList
    }
    for (let i in tempAllList) {
      if (filter.storeId && tempAllList[i].storeId === filter.storeId) {
        tempList = tempAllList[i].stocks
        break
      }
    }
    return tempList
  }
  return new Promise((resolve, reject) => {
    if (remote) {
      axios.request({
        url: `/bae/stockHandler/selectStockBasePoList`,
        method: 'get',
        params: remoteFilter || {}
      }).then(res => {
        let tempData = res.data
        sessionStorage.setItem(tempKey, JSON.stringify(tempData))
        resolve(filterData(data))
      }).catch(err => {
        reject(err)
      })
    } else {
      resolve(filterData(data))
    }
  })
}
