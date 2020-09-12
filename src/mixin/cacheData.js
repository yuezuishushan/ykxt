import { getCacheProduct, getCacheEmployee, getCacheSupplier, getCacheWarehouse, getOrganization, getCacheDeliveryProduct } from '@/api/common'
import userStore from '@/store/module/user'

const mixin = {
  data () {
    return {
      cacheEmployeeData: {
        loading: false,
        key: 'GLOBAL_EMPLOYEE',
        filter: { storeId: userStore.state.storeId },
        list: []
      },
      cacheProductData: {
        loading: false,
        key: 'GLOBAL_PRODUCT',
        filter: {},
        list: [],
        columns: [
          {
            title: '助记码',
            key: 'code',
            width: 60
          },
          {
            title: '产品名称',
            key: 'name',
            width: 240
          },
          {
            title: '产品属性',
            key: 'productAuxProp',
            width: 120
          }
        ]
      },
      cacheDeliveryProductData: {
        loading: false,
        key: 'GLOBAL_DELIVERY_PRODUCT',
        filter: {
          stockId: ''
        },
        list: [],
        columns: [
          {
            title: '助记码',
            key: 'code',
            width: 60
          },
          {
            title: '产品名称',
            key: 'name',
            width: 240
          },
          {
            title: '产品属性',
            key: 'productAuxProp',
            width: 120
          },
          {
            title: '库存',
            key: 'productAuxProp',
            width: 120
          }
        ]
      },
      cacheSupplierData: {
        loading: false,
        key: 'GLOBAL_SUPPLIER',
        filter: {},
        list: [],
        columns: [
          {
            title: '供应商名称',
            key: 'name',
            width: 200
          }
        ]
      },
      cacheCustomerData: {
        loading: false,
        key: 'GLOBAL_ORGANIZATION',
        filter: {},
        list: [],
        columns: [
          {
            title: '客户姓名',
            key: 'name',
            width: 140
          },
          {
            title: '电话',
            key: 'mobile',
            width: 140
          },
          {
            title: '等级',
            key: 'levelName',
            width: 100
          },
          {
            title: '所属门店',
            key: 'storeName',
            width: 100
          }
        ]
      },
      cacheWarehouseData: {
        loading: false,
        key: 'GLOBAL_WAREHOUSE',
        filter: {},
        list: []
      }
    }
  },
  methods: {
    loadCacheProduct (remote, remoteFilter) {
      let _this = this
      _this.cacheProductData.loading = true
      getCacheProduct(_this.cacheProductData.filter, !!remote, remoteFilter).then(res => {
        let tempData = res
        _this.cacheProductData.list = tempData
        _this.cacheProductData.loading = false
      }).catch(() => {
        _this.cacheProductData.loading = false
      })
    },
    loadCacheDeliveryProduct (remote, remoteFilter) {
      let _this = this
      _this.cacheDeliveryProductData.loading = true
      getCacheDeliveryProduct(_this.cacheDeliveryProductData.filter, !!remote, remoteFilter).then(res => {
        let tempData = res
        _this.cacheDeliveryProductData.list = tempData
        _this.cacheDeliveryProductData.loading = false
      }).catch(() => {
        _this.cacheDeliveryProductData.loading = false
      })
    },
    loadCacheEmployee (remote, remoteFilter) {
      let _this = this
      _this.cacheEmployeeData.loading = true
      getCacheEmployee(_this.cacheEmployeeData.filter, !!remote, remoteFilter).then(res => {
        let tempData = res
        _this.cacheEmployeeData.list = tempData
        _this.cacheEmployeeData.loading = false
      }).catch(() => {
        _this.cacheEmployeeData.loading = false
      })
    },
    loadCacheSupplier (remote, remoteFilter) {
      let _this = this
      _this.cacheSupplierData.loading = true
      getCacheSupplier(_this.cacheSupplierData.filter, !!remote, remoteFilter).then(res => {
        let tempData = res
        _this.cacheSupplierData.list = tempData
        _this.cacheSupplierData.loading = false
      }).catch(() => {
        _this.cacheSupplierData.loading = false
      })
    },
    loadCacheCustomer (remote, remoteFilter) {
      let _this = this
      _this.cacheCustomerData.loading = true
      getOrganization(_this.cacheCustomerData.filter, !!remote, remoteFilter).then(res => {
        let tempData = res
        _this.cacheCustomerData.list = tempData
        _this.cacheCustomerData.loading = false
      }).catch(() => {
        _this.cacheCustomerData.loading = false
      })
    },
    loadCacheWarehouse (remote, remoteFilter) {
      let _this = this
      _this.cacheWarehouseData.loading = true
      const formatTree = (item) => {
        let tempObj = { title: item.name, id: item.id, value: item.id, parentId: item.parentId, number: item.number, expand: true, selected: false }
        if (item.children && item.children.length > 0) {
          tempObj.children = []
          for (let i in item.children) {
            tempObj.children.push(formatTree(item.children[i]))
          }
        }
        return tempObj
      }
      _this.cacheWarehouseData.list = []
      getCacheWarehouse({ storeId: _this.globalUserData.storeId }, !!remote, remoteFilter).then(res => {
        let tempData = res
        for (let i in tempData) {
          _this.cacheWarehouseData.list.push(formatTree(tempData[i]))
        }
        _this.cacheWarehouseData.loading = false
      }).catch(() => {
        _this.cacheWarehouseData.loading = false
      })
    }
  }
}

export default mixin
