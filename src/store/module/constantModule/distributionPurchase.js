import { constantFormat } from '@/libs/util'

/**
 * 分销订货订单
 * @type {{DELIVERED: {text: string, value: number}, PART_DELIVERED: {text: string, value: number}, PART_IN_STORAGE: {text: string, value: number}, WAIT_DELIVER: {text: string, value: number}, UNAUDITED: {text: string, value: number}, ALL_IN_STORAGE: {text: string, value: number}}}
 */
const distributionPurchaseStatus = {
  UNAUDITED: { text: '未审核', value: 0 },
  WAIT_DELIVER: { text: '总部待发货', value: 1 },
  DELIVERED: { text: '总部已发货', value: 2 },
  PART_DELIVERED: { text: '总部部分发货', value: 3 },
  PART_IN_STORAGE: { text: '部分入库', value: 4 },
  ALL_IN_STORAGE: { text: '全部入库', value: 5 }
}

/**
 * 分销订货入库
 * @type {{UNAUDITED: {text: string, value: number}, UNPAID: {text: string, value: number}, PART_PAY: {text: string, value: number}, ALL_PAY: {text: string, value: number}, CANCEL: {text: string, value: number}}}
 */
const distributionPurchaseStockStatus = {
  UNAUDITED: { text: '未审核', value: 0 },
  UNPAID: { text: '未付款', value: 1 },
  PART_PAY: { text: '部分付款', value: 2 },
  ALL_PAY: { text: '已付款', value: 3 },
  CANCEL: { text: '已作废', value: 4 }
}

/**
 * 分销订货退货
 * @type {{UNAUDITED: {text: string, value: number}, WAIT_REFUND: {text: string, value: number}, PART_REFUND: {text: string, value: number}, ALL_REFUND: {text: string, value: number}, CANCEL: {text: string, value: number}}}
 */
const distributionPurchaseRejectedStatus = {
  UNAUDITED: { text: '未审核', value: 0 },
  WAIT_REFUND: { text: '未退款', value: 1 },
  PART_REFUND: { text: '部分退款', value: 2 },
  ALL_REFUND: { text: '全部退款', value: 3 }
}

export default {
  distributionPurchaseStatus,
  distributionPurchaseStatusKey: constantFormat(distributionPurchaseStatus),
  distributionPurchaseStockStatus,
  distributionPurchaseStockStatusKey: constantFormat(distributionPurchaseStockStatus),
  distributionPurchaseRejectedStatus,
  distributionPurchaseRejectedStatusKey: constantFormat(distributionPurchaseRejectedStatus)
}
