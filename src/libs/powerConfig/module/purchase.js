import { formatPowerConfig } from '../../tools'
import powerConstant from '../constant'
const config = {
  purchase: {
    billId: 0,
    name: '采购模块',
    children: {
      order: {
        billId: 101,
        name: '采购订单',
        children: {
          query: {
            name: '查询',
            billId: 101,
            mark: powerConstant.QUERY
          },
          add: {
            name: '新增',
            billId: 101,
            mark: powerConstant.INSERT
          },
          edit: {
            name: '修改',
            billId: 101,
            mark: powerConstant.UPDATE
          },
          delete: {
            name: '删除',
            billId: 101,
            mark: powerConstant.DELETE
          },
          enable: {
            name: '启用',
            billId: 101,
            mark: powerConstant.ENABLE
          },
          disable: {
            name: '禁用',
            billId: 101,
            mark: powerConstant.DISABLE
          },
          export: {
            name: '导出',
            billId: 101,
            mark: powerConstant.EXPORT
          },
          print: {
            name: '打印',
            billId: 101,
            mark: powerConstant.PRINT
          },
          audit: {
            name: '审核',
            billId: 101,
            mark: powerConstant.AUDIT
          },
          unAudit: {
            name: '反审',
            billId: 101,
            mark: powerConstant.UN_AUDIT
          },
          paper: {
            name: '纸质单据',
            billId: 101,
            mark: powerConstant.PAPER
          }
        }
      },
      storage: {
        billId: 102,
        name: '采购入库',
        children: {
          query: {
            name: '查询',
            billId: 102,
            mark: powerConstant.QUERY
          },
          add: {
            name: '新增',
            billId: 102,
            mark: powerConstant.INSERT
          },
          edit: {
            name: '修改',
            billId: 102,
            mark: powerConstant.UPDATE
          },
          delete: {
            name: '删除',
            billId: 102,
            mark: powerConstant.DELETE
          },
          enable: {
            name: '启用',
            billId: 102,
            mark: powerConstant.ENABLE
          },
          disable: {
            name: '禁用',
            billId: 102,
            mark: powerConstant.DISABLE
          },
          export: {
            name: '导出',
            billId: 102,
            mark: powerConstant.EXPORT
          },
          print: {
            name: '打印',
            billId: 102,
            mark: powerConstant.PRINT
          },
          audit: {
            name: '审核',
            billId: 102,
            mark: powerConstant.AUDIT
          },
          unAudit: {
            name: '反审',
            billId: 102,
            mark: powerConstant.UN_AUDIT
          },
          paper: {
            name: '纸质单据',
            billId: 102,
            mark: powerConstant.PAPER
          },
          invalid: {
            name: '作废',
            billId: 102,
            mark: powerConstant.INVALID
          }
        }
      },
      refund: {
        billId: 103,
        name: '采购退货',
        children: {
          query: {
            name: '查询',
            billId: 103,
            mark: powerConstant.QUERY
          },
          add: {
            name: '新增',
            billId: 103,
            mark: powerConstant.INSERT
          },
          edit: {
            name: '修改',
            billId: 103,
            mark: powerConstant.UPDATE
          },
          delete: {
            name: '删除',
            billId: 103,
            mark: powerConstant.DELETE
          },
          enable: {
            name: '启用',
            billId: 103,
            mark: powerConstant.ENABLE
          },
          disable: {
            name: '禁用',
            billId: 103,
            mark: powerConstant.DISABLE
          },
          export: {
            name: '导出',
            billId: 103,
            mark: powerConstant.EXPORT
          },
          print: {
            name: '打印',
            billId: 103,
            mark: powerConstant.PRINT
          },
          audit: {
            name: '审核',
            billId: 103,
            mark: powerConstant.AUDIT
          },
          unAudit: {
            name: '反审',
            billId: 103,
            mark: powerConstant.UN_AUDIT
          },
          paper: {
            name: '纸质单据',
            billId: 103,
            mark: powerConstant.PAPER
          },
          invalid: {
            name: '作废',
            billId: 103,
            mark: powerConstant.INVALID
          }
        }
      }
    }
  }
}

export default formatPowerConfig(config)
