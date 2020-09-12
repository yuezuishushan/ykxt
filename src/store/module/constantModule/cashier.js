import { constantFormat } from '@/libs/util'

/**
 * 开单项目类型
 * @type {{QUICK: {text: string, value: number}, PRODUCT: {text: string, value: number}, SERVICE: {text: string, value: number}, COMBO: {text: string, value: number}}}
 */
const cashierProjectType = {
  SERVICE: { text: '服务', value: 0 },
  PRODUCT: { text: '产品', value: 1 },
  COMBO: { text: '套餐', value: 2 },
  QUICK: { text: '快选', value: 3 }
}

/**
 * 订单状态
 * @type {{HANG_UP: {text: string, value: number}, PART_REFUND: {text: string, value: number}, UNPAID: {text: string, value: number}, PAID: {text: string, value: number}, PAYING: {text: string, value: number}, ALL_REFUND: {text: string, value: number}}}
 */
const cashierOrderStatus = {
  UNPAID: { text: '未支付', value: 0 },
  HANG_UP: { text: '挂单', value: 1 },
  PAID: { text: '已支付', value: 2 },
  PART_REFUND: { text: '部分退款', value: 3 },
  ALL_REFUND: { text: '全部退款', value: 4 },
  PAYING: { text: '支付中', value: 5 }
}

export default {
  cashierProjectType,
  cashierProjectTypeKey: constantFormat(cashierProjectType),
  cashierOrderStatus,
  cashierOrderStatusKey: constantFormat(cashierOrderStatus)
}
