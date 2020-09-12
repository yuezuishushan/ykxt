import { constantFormat } from '@/libs/util'

/**
 * 库存单据状态
 * @type {{UNAUDITED: {text: string, value: number}, AUDITED: {text: string, value: number}}}
 */
const stockStatus = {
  UNAUDITED: { text: '未审核', value: 0 },
  AUDITED: { text: '已审核', value: 2 }
}

/**
 * 库存单据状态
 * @type {{UNAUDITED: {text: string, value: number}, AUDITED: {text: string, value: number}}}
 */
const stockTransferStatus = {
  UNPAY: { text: '未入库未付款', value: 0 },
  PAY: { text: '未入库已付款', value: 2 }
}

export default {
  stockStatus,
  stockStatusKey: constantFormat(stockStatus),
  stockTransferStatus,
  stockTransferStatusKey: constantFormat(stockTransferStatus)
}
