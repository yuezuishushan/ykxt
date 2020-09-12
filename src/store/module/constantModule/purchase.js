import { constantFormat } from '@/libs/util'

/**
 * 采购订单状态
 * @type {{UNAUDITED: {text: string, value: number}, NOT_IN_STORAGE: {text: string, value: number}, PART_IN_STORAGE: {text: string, value: number}, ALL_IN_STORAGE: {text: string, value: number}, CLOSED: {text: string, value: number}}}
 */
const purchaseStatus = {
  UNAUDITED: { text: '未审核', value: 0 },
  NOT_IN_STORAGE: { text: '未入库', value: 1 },
  ALL_IN_STORAGE: { text: '全部入库', value: 2 },
  PART_IN_STORAGE: { text: '部分入库', value: 3 },
  CLOSED: { text: '已关闭', value: 4 }
}

/**
 * 采购入库单状态
 * @type {{UNAUDITED: {text: string, value: number}, UNPAID: {text: string, value: number}, PART_PAY: {text: string, value: number}, ALL_PAY: {text: string, value: number}, CANCEL: {text: string, value: number}}}
 */
const purchaseStockStatus = {
  UNAUDITED: { text: '未审核', value: 0 },
  UNPAID: { text: '未付款', value: 1 },
  PART_PAY: { text: '部分付款', value: 2 },
  ALL_PAY: { text: '已付款', value: 3 }
}

/**
 * 采购退货单状态
 * @type {{UNAUDITED: {text: string, value: number}, UNPAID: {text: string, value: number}, PART_PAY: {text: string, value: number}, ALL_PAY: {text: string, value: number}}}
 */
const purchaseStockOutStatus = {
  UNAUDITED: { text: '未审核', value: 0 },
  UNPAID: { text: '未退款', value: 1 },
  PART_PAY: { text: '部分退款', value: 2 },
  ALL_PAY: { text: '全部退款', value: 3 }
}

export default {
  purchaseStatus,
  purchaseStatusKey: constantFormat(purchaseStatus),
  purchaseStockStatus,
  purchaseStockStatusKey: constantFormat(purchaseStockStatus),
  purchaseStockOutStatus,
  purchaseStockOutStatusKey: constantFormat(purchaseStockOutStatus)
}
