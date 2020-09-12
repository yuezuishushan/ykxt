import { constantFormat } from '@/libs/util'

/**
 * 库存单据状态
 * @type {{UNAUDITED: {text: string, value: number}, AUDITED: {text: string, value: number}}}
 */
const payStatus = {
  UNPAY: { text: '未付款', value: 0 },
  PARTPAY: { text: '部分付款', value: 1 },
  PAY: { text: '已付款', value: 2 }
}

export default {
  payStatus,
  payStatusKey: constantFormat(payStatus)
}
