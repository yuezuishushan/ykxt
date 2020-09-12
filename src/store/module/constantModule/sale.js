import { constantFormat } from '@/libs/util'

/**
 * 销售单据状态
 * @type {{CLOSED: {text: string, value: number}, UNAUDITED: {text: string, value: number}, NOT_BILL: {text: string, value: number}, ALREADY_BILL: {text: string, value: number}}}
 */
const saleStatus = {
  UNAUDITED: { text: '未审核', value: 0 },
  NOT_BILL: { text: '未付款', value: 1 },
  ALREADY_BILL: { text: '部分付款', value: 2 },
  CLOSED: { text: '已付款', value: 3 }
}

/**
 * 销售单出库状态
 * @type {{NOT_STORAGE: {text: string, value: number}, ALL_OUT_STORAGE: {text: string, value: number}, PART_OUT_STORAGE: {text: string, value: number}}}
 */
const saleStockStatus = {
  NOT_AUDIT: { text: '未审核', value: 0 },
  NOT_DELIVER: { text: '未出库', value: 1 },
  ALL_DELIVER: { text: '已出库', value: 2 },
  CLOSE: { text: '已关闭', value: 3 }
}

export default {
  saleStatus,
  saleStatusKey: constantFormat(saleStatus),
  saleStockStatus,
  saleStockStatusKey: constantFormat(saleStockStatus)
}
