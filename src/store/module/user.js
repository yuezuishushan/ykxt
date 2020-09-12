import { login, getUserInfo, getUserAccess } from '@/api/user'
import { getSettingBasic } from '@/api/setting/basic'
import { setToken, getToken } from '@/libs/util'
import powerConfig from '@/libs/powerConfig'
import commonConstant from './constantModule/common'
import router from '@/router'
import config from '@/config'
const { homeName } = config

export default {
  state: {
    userName: '',
    userId: '',
    storeId: '',
    storeName: '',
    deptId: '',
    empId: '',
    avatarImgPath: '',
    token: getToken(),
    access: [],
    storeType: 0,
    closeStatus: false, // 是否初始化完成
    hasGetInfo: false,
    hasGetSetting: false,
    setting: {
      billAudit: 0, // 启用业务单据审核
      taxes: 0, // 启用税金
      taxesSale: 0, // 销售增值税税率
      taxesPurchase: 0, // 采购增值税税率
      doesPriceIncludeTax: 0, // 商品价格是否含税
      multipleAttributes: 0, // 启用多属性
      shelfLife: 0, // 启用保质期管理
      batchNumber: 0, // 启用批次号管理
      putInStorageOverOrder: 0, // 启用超订单数量入库
      emptyNotSell: 0, // 是否检查零库存
      salesPriceNotLowerThanPurchasingPrice: 0, // 销售价不能低于采购价
      wholesaleWarehousing: 0, // 启用批发出入库管理
      stockOccupancy: 0, // 启用库存占用
      numberDecimal: 2, // 数量小数位
      priceDecimal: 2, // 单价小数位
      priceFormat: 0, // 价格处理 0:抹零_1:四舍五入
      refundWay: 0, // 退款方式 0:会员余额_1:原路退回
      autoCheckout: 0 // 启用自动结账
    }
  },
  mutations: {
    setAvatar (state, avatarPath) {
      state.avatarImgPath = avatarPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setStoreId (state, id) {
      state.storeId = id
    },
    setStoreName (state, name) {
      state.storeName = name
    },
    setDeptId (state, id) {
      state.deptId = id
    },
    setEmpId (state, id) {
      state.empId = id
    },
    setStoreType (state, type) {
      state.storeType = type
    },
    setCloseStatus (state, status) {
      state.closeStatus = status
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      let tempArray = []
      if (!state.closeStatus) {
        tempArray = tempArray.concat(['initialize', 'initializeNavigation'])
      }
      if (access && access.length) {
        for (let i in powerConfig) {
          if (state.storeType !== commonConstant.storeType.HEADQUARTERS.value && [901, 902, 903].includes(powerConfig[i].billId)) {
            continue
          }
          if (state.storeType !== commonConstant.storeType.FRANCHISE.value && [801, 802, 803].includes(powerConfig[i].billId)) {
            continue
          }
          for (let j in access) {
            if ((access[j].billId === powerConfig[i].billId) && (powerConfig[i].mark & access[j].accessMark)) {
              tempArray = tempArray.concat(powerConfig[i].tree)
              break
            }
          }
        }
      }
      state.access = Array.from(new Set(tempArray))
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setSettingBasic (state, callback) {
      let _this = this
      getSettingBasic().then(settingRes => {
        for (let i in settingRes.data) {
          let tempSettingRecord = settingRes.data[i]
          switch (tempSettingRecord.code) {
            case 'EXA': // 启用业务单据审核
              state.setting.billAudit = tempSettingRecord.val
              break
            case 'ET':// 启用税金
              state.setting.taxes = tempSettingRecord.val
              break
            case 'ETXS': // 销售增值税税率
              state.setting.taxesSale = tempSettingRecord.attr
              break
            case 'ETCG': // 采购增值税税率
              state.setting.taxesPurchase = tempSettingRecord.attr
              break
            case 'HAN': // 商品价格是否含税
              state.setting.doesPriceIncludeTax = tempSettingRecord.val
              break
            case 'DUO': // 启用多属性
              state.setting.multipleAttributes = tempSettingRecord.val
              break
            case 'GONG': // 启用保质期管理
              state.setting.shelfLife = tempSettingRecord.val
              break
            case 'PCH': // 启用批次号管理
              state.setting.batchNumber = tempSettingRecord.val
              break
            case 'RU': // 启用超订单数量入库
              state.setting.putInStorageOverOrder = tempSettingRecord.val
              break
            case 'MO':// 是否检查零库存
              state.setting.emptyNotSell = tempSettingRecord.val
              break
            case 'BU': // 销售价不能低于采购价
              state.setting.salesPriceNotLowerThanPurchasingPrice = tempSettingRecord.val
              break
            case 'PFCR': // 启用批发出入库管理
              state.setting.wholesaleWarehousing = tempSettingRecord.val
              break
            case 'KCZY': // 启用库存占用
              state.setting.stockOccupancy = tempSettingRecord.val
              break
            case 'ND': // 数量小数位
              state.setting.numberDecimal = tempSettingRecord.attr
              break
            case 'AD': // 单价小数位
              state.setting.priceDecimal = tempSettingRecord.attr
              break
            case 'P': // 价格处理 0:抹零_1:四舍五入
              state.setting.priceFormat = tempSettingRecord.attr
              break
            case 'R': // 退款方式 0:会员余额_1:原路退回
              state.setting.refundWay = tempSettingRecord.attr
              break
            case 'CD': // 启用自动结账
              state.setting.autoCheckout = tempSettingRecord.val
              break
          }
        }
        state.hasGetSetting = true
        if (callback) {
          callback()
        }
      }).catch(() => {
        _this.commit('setToken', '')
        _this.commit('setAccess', [])
        router.push({ name: 'login' })
      })
    }
  },
  actions: {
    handleLogin ({ commit }, { userName, passWord, grantType, sign, timestamp }) {
      userName = userName.trim()
      let tempSubmitData = { userName, passWord }
      if (grantType === 'encrypt') {
        tempSubmitData.sign = sign
      }
      return new Promise((resolve, reject) => {
        login(tempSubmitData).then(res => {
          console.log(res.data)
          commit('setToken', res.data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleLogout ({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    },
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        // try {
        //   getUserInfo().then(userRes => {
        //     let tempData = Object.assign({}, userRes.data)
        //     commit('setAvatar', tempData.avatar)
        //     commit('setUserName', tempData.name)
        //     commit('setUserId', tempData.id)
        //     commit('setStoreId', tempData.storeId)
        //     commit('setStoreName', tempData.storeName)
        //     commit('setEmpId', tempData.empId)
        //     commit('setDeptId', tempData.deptId)
        //     commit('setStoreType', tempData.storeTyp)
        //     commit('setCloseStatus', tempData.closeStatus)
        //     commit('setHasGetInfo', true)
        //     getUserAccess().then(accessRes => {
        //       commit('setAccess', accessRes.data)
        //       commit('setSettingBasic', () => {
        //         tempData.defaultRoute = tempData.closeStatus ? homeName : 'initializeNavigation'
        //         resolve(tempData)
        //       })
        //     }).catch(err => {
        //       reject(err)
        //     })
        //   }).catch(err => {
        //     reject(err)
        //   })
        // } catch (error) {
        //   reject(error)
        // }
      })
    }
  }
}
