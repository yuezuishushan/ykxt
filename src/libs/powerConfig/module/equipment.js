import { formatPowerConfig } from '../../tools'
import powerConstant from '../constant'
const config = {
  equipment: {
    billId: 0,
    name: '我的设备',
    children: {
      group: {
        billId: 701,
        name: '设备组管理',
        children: {
          query: {
            name: '查询',
            billId: 701,
            mark: powerConstant.QUERY
          },
          add: {
            name: '新增',
            billId: 701,
            mark: powerConstant.INSERT
          },
          edit: {
            name: '修改',
            billId: 701,
            mark: powerConstant.UPDATE
          },
          delete: {
            name: '删除',
            billId: 701,
            mark: powerConstant.DELETE
          },
          import: {
            name: '导入',
            billId: 701,
            mark: powerConstant.IMPORT
          },
          enable: {
            name: '启用',
            billId: 701,
            mark: powerConstant.ENABLE
          },
          disable: {
            name: '禁用',
            billId: 701,
            mark: powerConstant.DISABLE
          }
        }
      },
      list: {
        billId: 701,
        name: '设备管理',
        children: {
          query: {
            name: '查询',
            billId: 701,
            mark: powerConstant.QUERY
          },
          add: {
            name: '新增',
            billId: 701,
            mark: powerConstant.INSERT
          },
          edit: {
            name: '修改',
            billId: 701,
            mark: powerConstant.UPDATE
          },
          delete: {
            name: '删除',
            billId: 701,
            mark: powerConstant.DELETE
          },
          import: {
            name: '导入',
            billId: 701,
            mark: powerConstant.IMPORT
          },
          enable: {
            name: '启用',
            billId: 701,
            mark: powerConstant.ENABLE
          },
          disable: {
            name: '禁用',
            billId: 701,
            mark: powerConstant.DISABLE
          }
        }
      }
    }
  }
}

export default formatPowerConfig(config)
