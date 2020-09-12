import { constantFormat } from '@/libs/util'

/**
 * 分销订单状态
 * @type {{UNAUDITED: {text: string, value: number}, WAIT_DELIVER: {text: string, value: number}, DELIVERED: {text: string, value: number}, CANCEL: {text: string, value: number}}}
 */
const distributionStatus = {
  UNAUDITED: { text: '未审核', value: 0 },
  WAIT_DELIVER: { text: '总部待发货', value: 1 },
  DELIVERED: { text: '总部已发货', value: 2 },
  CANCEL: { text: '已作废', value: 3 }
}

/**
 * 分销出库状态
 * @type {{UNAUDITED: {text: string, value: number}, NOT_RECEIVABLE: {text: string, value: number}, PART_RECEIVABLE: {text: string, value: number}, ALL_RECEIVABLE: {text: string, value: number}, CANCEL: {text: string, value: number}}}
 */
const distributionStockOutStatus = {
  UNAUDITED: { text: '未审核', value: 0 },
  NOT_RECEIVABLE: { text: '未收款', value: 1 },
  PART_RECEIVABLE: { text: '部分收款', value: 2 },
  ALL_RECEIVABLE: { text: '全部收款', value: 3 },
  CANCEL: { text: '已作废', value: 4 }
}

/**
 * 分销退货入库状态
 * @type {{UNAUDITED: {text: string, value: number}, NOT_REJECTED: {text: string, value: number}, PART_REJECTED: {text: string, value: number}, ALL_REJECTED: {text: string, value: number}, CANCEL: {text: string, value: number}}}
 */
const distributionRejectedStockStatus = {
  UNAUDITED: { text: '未审核', value: 0 },
  NOT_REJECTED: { text: '未退款', value: 1 },
  PART_REJECTED: { text: '部分退款', value: 2 },
  ALL_REJECTED: { text: '全部退款', value: 3 },
  CANCEL: { text: '已作废', value: 4 }
}

export default {
  distributionStatus,
  distributionStatusKey: constantFormat(distributionStatus),
  distributionStockOutStatus,
  distributionStockOutStatusKey: constantFormat(distributionStockOutStatus),
  distributionRejectedStockStatus,
  distributionRejectedStockStatusKey: constantFormat(distributionRejectedStockStatus)
}
