import { constantFormat } from '@/libs/util'

/**
 * 性别
 * @type {{UNKNOWN: {text: string, value: number}, MEN: {text: string, value: number}, WOMEN: {text: string, value: number}}}
 */
const sexType = {
  UNKNOWN: { text: '未知', value: 0 },
  MEN: { text: '男', value: 1 },
  WOMEN: { text: '女', value: 2 }
}
/**
 * 状态类型
 * @type {{ENABLED: {text: string, value: number}, DISABLED: {text: string, value: number}}}
 */
const statusType = {
  ENABLED: { text: '启用', value: 0 },
  DISABLED: { text: '禁用', value: 1 }
}
/**
 * 状态类型
 * @type {{ENABLED: {text: string, value: number}, DISABLED: {text: string, value: number}}}
 */
const stateType = {
  All: { text: '全部', value: -1 },
  ENABLED: { text: '启用', value: 1 },
  DISABLED: { text: '禁用', value: 0 }
}

/**
 * 项目类型
 * @type {{PRODUCT: {text: string, value: number}, SERVICE: {text: string, value: number}, COMBO: {text: string, value: number}}}
 */
const projectType = {
  SERVICE: { text: '服务', value: 0 },
  PRODUCT: { text: '产品', value: 1 },
  COMBO: { text: '套餐', value: 2 }
}

/**
 * 状态类型
 * @type {{ENABLED: {text: string, value: number}, DISABLED: {text: string, value: number}}}
 */
const integralStatusType = {
  ALREADYPARTICIPATED: { text: '已参加', value: 1 },
  UNCOMMITTED: { text: '未参加', value: 0 }
}
/**
 * 在职状态
 * @type {{ENTRY: {text: string, value: number}, QUIT: {text: string, value: number}}}
 */
const employeeType = {
  All: { text: '全部', value: -1 },
  ENTRY: { text: '在职', value: 0 },
  QUIT: { text: '离职', value: 1 }
}

/**
 * 通知方式
 * @type {{SMS: {text: string, value: number}, WX: {text: string, value: number}}}
 */
const noticeWay = {
  SMS: { text: '短信', value: 1 },
  WX: { text: '微信', value: 2 }
}

/**
 * 时间单位
 * @type {{DAY: {text: string, value: number}, MONTH: {text: string, value: number}, YEAR: {text: string, value: number}}}
 */
const timeUnit = {
  DAY: { text: '天', value: 0 },
  MONTH: { text: '月', value: 1 },
  YEAR: { text: '年', value: 2 }
}

/**
 * 支付方式
 * @type {{WX: {text: string, value: number}, MANUAL: {text: string, value: number}}}
 */
const payWay = {
  WX: { text: '微信', value: 0 },
  MANUAL: { text: '后台支付', value: 1 }
}
/**
 * 门店类型
 * @type {{HEADQUARTERS: {text: string, value: number}, DIRECT: {text: string, value: number}, FRANCHISE: {text: string, value: number}}}
 */
const storeType = {
  HEADQUARTERS: { text: '总部', value: 0 },
  DIRECT: { text: '直营店', value: 1 },
  FRANCHISE: { text: '加盟店', value: 2 }
}

/**
 * 类别类型
 * @type {{SERVICE: {text: string, value: number}, PRODUCT: {text: string, value: number}, SUPPLIER: {text: string, value: number}, INCOME: {text: string, value: number}, EXPENDITURE: {text: string, value: number}}}
 */
const categoryType = {
  SERVICE: { text: '项目类别', value: 0 },
  PRODUCT: { text: '产品类别', value: 1 },
  SUPPLIER: { text: '供应商类别', value: 2 },
  INCOME: { text: '收入类别', value: 3 },
  EXPENDITURE: { text: '支出类别', value: 4 },
  ROOM: { text: '房间类别', value: 5 }
}

const otherBasic = {
  UNIT: { text: '单位', value: 0 },
  DURATION: { text: '时长', value: 1 },
  POSITION: { text: '职位', value: 2 },
  PAY: { text: '结算账户', value: 3 },
  PAY_SOURCE: { text: '支付来源', value: 4 }
}

const roomStatus = {
  AVAILABLE: { text: '空闲', value: 0 },
  OCCUPY: { text: '占用', value: 1 },
  CLEAN: { text: '打扫', value: 2 }
}

/**
 * 通知类型
 * @type {{SALE: {text: string, value: number}, BIRTHDAY: {text: string, value: number}, TICKET_EXPIRE: {text: string, value: number}, SERVICE_EXPIRE: {text: string, value: number}, APPOINTMENT: {text: string, value: number}, RECEIVABLES: {text: string, value: number}}}
 */
const noticeType = {
  All: { text: '全部', value: -1 },
  SALE: { text: '项目消费', value: 0 },
  BIRTHDAY: { text: '会员生日', value: 1 },
  TICKET_EXPIRE: { text: '电子券到期', value: 2 },
  SERVICE_EXPIRE: { text: '项目到期', value: 3 },
  APPOINTMENT: { text: '预约项目', value: 4 },
  RECEIVABLES: { text: '应收款提醒', value: 5 }
}

/**
 * 支付方式
 * @type {{SCAN: {text: string, value: number}, CASH: {text: string, value: number}, STOCK: {text: string, value: number}, CHARGE: {text: string, value: number}, BALANCE: {text: string, value: number}, CARD: {text: string, value: number}}}
 */
const paymentWay = {
  SCAN: { text: '扫码', value: 1 },
  BALANCE: { text: '会员余额', value: 2 },
  STOCK: { text: '股本消费', value: 3 },
  OTHER: { text: '现金', value: 4 },
  CHARGE: { text: '挂帐', value: 5 },
  CARD: { text: '储值卡', value: 6 },
  WX: { text: '微信', value: 7 },
  ALIPAY: { text: '支付宝', value: 8 }
}

/**
 * 审核方式
 * @type {{WX: {text: string, value: number}, MANUAL: {text: string, value: number}}}
 */
const toExamine = {
  AUDITED: { text: '待审核', value: 0 },
  NOAUDITED: { text: '已审核', value: 2 }
}
/**
 * 入库类型
 * @type {{WHOLE: {text: string, value: number}, GIFT: {text: string, value: number}, OTHER: {text: string, value: number}}}
 */
const storageType = {
  OTHER: { text: '其他入库', value: 1 },
  GIFT: { text: '赠品入库', value: 0 }
}
/**
 * 业务类型
 * @type {{WHOLE: {text: string, value: number}, GIFT: {text: string, value: number}, OTHER: {text: string, value: number}}}
 */
const businessType = {
  WHOLE: { text: '全部', value: -1 },
  EARLYSTAGE: { text: '期初', value: 301 },
  PURCHASEWAREHOUS: { text: '采购入库', value: 102 },
  SURPLUSWAREHOUS: { text: '盘盈入库', value: 311 },
  OTHERWAREHOUS: { text: '其它入库', value: 305 },
  DERIVATIVESGOODS: { text: '销售退货-微商', value: 2301 },
  STOREGOODS: { text: '销售退货-门店', value: 1104 },
  WHOLESALEGOODS: { text: '批发退货', value: 204 },
  MOVEWAREHOUS: { text: '移库-入库', value: 304 },
  DISTRIBUTIONWAREHOUS: { text: '分销退货-入库', value: 903 },
  DERIVAIVESOUT: { text: '销售出库-微商', value: 2301 },
  STOREOUT: { text: '销售出库-门店', value: 1101 },
  WHOLESALEOUT: { text: '批发出库', value: 203 },
  PURCHASEGOODS: { text: '采购退货', value: 103 },
  SURPLUSOUT: { text: '盘亏出库', value: 312 },
  FRMLOSSOUT: { text: '报损出库', value: 307 },
  OTHEROUT: { text: '其它出库', value: 306 },
  MOVEOUT: { text: '移动-出库', value: 304 },
  DISTRIBUTIONOUT: { text: '分销出库', value: 902 }
}

/**
 * 权益类型
 * @type {{SHAREHOLDER: {text: string, value: number}, CARD: {text: string, value: number}, MEMBER: {text: string, value: number}}}
 */
const discountType = {
  MEMBER: { text: '会员等级权益', value: 1 },
  SHAREHOLDER: { text: '股东权益', value: 2 },
  CARD: { text: '储值卡权益', value: 3 }
}
/**
 * 收款明细状态类型
 * @type {{ALL: {text: string, value: number}, UNPAID: {text: string, value: number}, PARTIAL: {text: string, value: number}}}
 */
const receivablesType = {
  ALL: { text: '全部', value: -1 },
  UNCOLLECTED: { text: '未收款', value: 1 },
  RECEIVABLES: { text: '部分收款', value: 2 }
}
/**
 * 收款明细状态类型
 * @type {{SHAREHOLDER: {text: string, value: number}, CARD: {text: string, value: number}, MEMBER: {text: string, value: number}}}
 */
const partialType = {
  ALL: { text: '全部', value: -1 },
  UNPAID: { text: '未付款', value: 1 },
  PARTIAL: { text: '部分付款', value: 2 }
}

const royaltyType = {
  ALL: { text: '全部', value: -1 },
  SERVICE: { text: '服务', value: 0 },
  PRODUCT: { text: '产品', value: 1 },
  CARD: { text: '储值卡', value: 2 },
  COMBO: { text: '套餐', value: 3 },
  STAGE: { text: '阶段', value: 4 },
  BASIC_SALARY: { text: '阶段底薪', value: 5 },
  TURNOVER: { text: '营业额', value: 6 },
  SPECIAL: { text: '特殊商品', value: 7 }
}
/**
 * 分红提现记录状态
 * @type {{UNAUDITED: {text: string, value: number}, SUCCESS: {text: string, value: number}, NOTPASS: {text: string, value: number}}}
 */
const statusWithdrawalsType = {
  ALL: { text: '全部', value: -1 },
  UNAUDITED: { text: '提现待审核', value: 0 },
  SUCCESS: { text: '提现成功', value: 1 },
  NOTPASS: { text: '审核不通过', value: 2 }
}
/**
 * 分红提现提现记录
 * @type {{RECHARGEWITHDRAWAL: {text: string, value: number}, SMALLCHANGE: {text: string, value: number}}}
 */
const withdrawalsType = {
  ALL: { text: '全部', value: -1 },
  RECHARGEWITHDRAWAL: { text: '充值提现', value: 0 },
  SMALLCHANGE: { text: '提现到零钱', value: 1 }
}
/**
 * 股东人脉来源
 * @type {{GIFTCARD: {text: string, value: number}, CODE: {text: string, value: number},WECHAT: {text: string, value: number},BANDING: {text: string, value: number}}}
 */
const sourceType = {
  GIFTCARD: { text: '股东赠卡', value: 0 },
  CODE: { text: '扫股东二维码', value: 1 },
  WECHAT: { text: '微信发展', value: 2 },
  BANDING: { text: '手动绑定', value: 3 },
  PRODUCT: { text: '商品推广', value: 4 }
}
/**
 * 股东分红明细类型
 * @type {{STORECONSUMPTION: {text: string, value: number}, STORERETURNS: {text: string, value: number},WECHAT: {text: string, value: number},VOIDORDER: {text: string, value: number},WHOLESALERETURNS: {text: string, value: number},WECHATMALL: {text: string, value: number},MANYCUSTOMERS: {text: string, value: number}}}
 */
const bonusType = {
  STORECONSUMPTION: { text: '门店消费', value: 0 },
  STORERETURNS: { text: '门店退货', value: 1 },
  WECHAT: { text: '作废订单', value: 2 },
  VOIDORDER: { text: '批发', value: 3 },
  WHOLESALERETURNS: { text: '批发退货', value: 4 },
  WECHATMALL: { text: '微信商城', value: 5 },
  MANYCUSTOMERS: { text: '拼客多', value: 6 }
}
/**
 * 设置积客活动的类型
 * @type {{DISPLAY: {text: string, value: number}, NODISPLAY: {text: string, value: number}}}
 */
const introduceType = {
  DISPLAY: { text: '是', value: 0 },
  NODISPLAY: { text: '否', value: 1 }
}
/**
 * 员工分红客户类型
 * @type {{ALL: {text: string, value: number}, MANUALDISTRIBUTION: {text: string, value: number}, SHAREHOLDERSCONNECTIONS: {text: string, value: number}, NODISPLAY: {text: string, value: number}}}
 */
const customerType = {
  ALL: { text: '全部', value: -1 },
  MANUALDISTRIBUTION: { text: '手工分配', value: 0 },
  SHAREHOLDERSCONNECTIONS: { text: '股东人脉', value: 1 },
  NODISPLAY: { text: '扫码员工', value: 2 }
}
/**
 * 惩罚机制页面的状态
 * @type {{AUTOMATIC: {text: string, value: number}, NOTAUTOMATIC: {text: string, value: number}}}
 */
const releaseType = {
  AUTOMATIC: { text: '自动释放', value: 0 },
  NOTAUTOMATIC: { text: '不自动释放', value: 1 }
}
/**
 * 分销商管理状态
 * @type {{ALL: {text: string, value: number}，DISCONTINUE: {text: string, value: number}, ENACLE: {text: string, value: number}}}
 */
const distributorStatusType = {
  ALL: { text: '全部状态', value: -1 },
  DISCONTINUE: { text: '停用', value: 0 },
  ENACLE: { text: '启用', value: 1 }
}
/**
 * 员工毛利明细类型
 * @type {{OPENORDER: {text: string, value: number}, RETURNGOODS: {text: string, value: number}}}
 */
const detailTyp = {
  ALL: { text: '全部', value: -1 },
  OPENORDER: { text: '门店开单', value: 0 },
  RETURNGOODS: { text: '门店退货', value: 1 }
}
/**
 * 员工释放列表分配状态
 * @type {{OPENORDER: {text: string, value: number}, RETURNGOODS: {text: string, value: number}}}
 */
const distributionTyp = {
  ALL: { text: '全部', value: -1 },
  ALREADYALLOCATED: { text: '已分配', value: 0 },
  UNALLOCATED: { text: '未分配', value: 1 }
}
/**
 * 员工释放列表分配状态
 * @type {{OPENORDER: {text: string, value: number}, RETURNGOODS: {text: string, value: number}}}
 */
const warningTyp = {
  ALL: { text: '全部', value: -1 },
  LOWINVENTORY: { text: '低库存预警', value: 0 },
  HIGHINVENTORY: { text: '高库存预警', value: 1 }
}
/**
 * 人脉等级
 * @type {{OPENORDER: {text: string, value: number}, RETURNGOODS: {text: string, value: number}}}
 */
const levelTyp = {
  FISTLEVEL: { text: '一级', value: 0 },
  SECONDLEVEL: { text: '二级', value: 1 }
}
/**
 * 人脉等级
 * @type {{AUDITED: {text: string, value: number}, RETURNGOODS: {text: string, value: number}}}
 */
const settlementStatusTyp = {
  All: { text: '全部', value: -1 },
  AUDITED: { text: '待审核', value: 0 },
  ADOPT: { text: '通过', value: 1 },
  REJECT: { text: '驳回', value: 2 }
}
/**
 * 是否关注公众号
 * @type {{AUDITED: {text: string, value: number}, RETURNGOODS: {text: string, value: number}}}
 */
const followTyp = {
  AUDITED: { text: '是否关注', value: -1 },
  UNCONCERNED: { text: '未关注', value: 0 },
  CONCERNS: { text: '已关注', value: 1 },
  REMOVECONCERNS: { text: '取消关注', value: 2 }
}
/**
 * 发送方式
 * @type {{AUDITED: {text: string, value: number}, RETURNGOODS: {text: string, value: number}}}
 */
const sendingModeTyp = {
  AUDITED: { text: '所有', value: -1 },
  SCREEN: { text: '筛选发送', value: 0 },
  TIMING: { text: '定时发送', value: 1 },
  STAFF: { text: '员工发送', value: 2 },
  COLLADCARD: { text: '领卡赠送', value: 3 },
  FOLLOW: { text: '关注领券', value: 4 },
  INTRODUCE: { text: '介绍领券', value: 5 }
}
/**
 * 时效状态
 * @type {{AUDITED: {text: string, value: number}, RETURNGOODS: {text: string, value: number}}}
 */
const prescriptionTyp = {
  AUDITED: { text: '全部', value: -1 },
  EFFECTIVE: { text: '有效', value: 0 },
  VOID: { text: '已作废', value: 1 },
  EXHAUSTED: { text: '已用完', value: 2 },
  OVERDUE: { text: '过期', value: 3 }
}
/**
 * 领取状态
 * @type {{AUDITED: {text: string, value: number}, RETURNGOODS: {text: string, value: number}}}
 */
const receivingStatusTyp = {
  AUDITED: { text: '全部', value: -1 },
  HAVERECEIVED: { text: '已领取', value: 0 },
  UNCOLLECTED: { text: '未领取', value: 1 }
}
/**
 * 评价
 * @type {{AUDITED: {text: string, value: number}, RETURNGOODS: {text: string, value: number}}}
 */
const evaluateTyp = {
  ALL: { text: '全部', value: -1 },
  PRALSE: { text: '好评', value: 0 },
  MEDIUM: { text: '中评', value: 1 },
  NEGATIVE: { text: '差评', value: 2 }
}
/**
 * 评价
 * @type {{AUDITED: {text: string, value: number}, RETURNGOODS: {text: string, value: number}}}
 */
const appointmenTyp = {
  ALL: { text: '全部', value: -1 },
  UPONLINE: { text: '线下预约', value: 0 },
  ONLINE: { text: '在线预约', value: 1 }
}
/**
 * 时间筛选
 * @type {{AUDITED: {text: string, value: number}, RETURNGOODS: {text: string, value: number}}}
 */
const timeTyp = {
  DAY: { text: '周报', value: 0 },
  MONTH: { text: '月报', value: 1 },
  CUSTOM: { text: '自定义', value: 2 }
}
/**
 * 单据状态
 * @type {{NORMAL: {text: string, value: number}, RETURNEDGOODS: {text: string, value: number}, VOID: {text: string, value: number}, PARTIALRETYRN: {text: string, value: number}}}
 */
const documentTyp = {
  ALL: { text: '全部', value: -1 },
  NORMAL: { text: '正常', value: 0 },
  RETURNEDGOODS: { text: '已退货', value: 1 },
  VOID: { text: '作废', value: 2 },
  PARTIALRETYRN: { text: '部分退货', value: 3 }
}
/**
 * 提成方式
 * @type {{AUDITED: {text: string, value: number}, RETURNGOODS: {text: string, value: number}}}
 */
const royaltyWayTyp = {
  ALL: { text: '全部', value: -1 },
  PROPORTION: { text: '比例提成', value: 0 },
  FIXED: { text: '固定提成', value: 1 }
}
/**
 * 到期日期提醒
 * @type {{AUDITED: {text: string, value: number}, RETURNGOODS: {text: string, value: number}}}
 */
const remindTimeTyp = {
  EIGHT: { text: '8-9点', value: 8 },
  NINE: { text: '9-10点', value: 9 },
  TEN: { text: '10-11点', value: 10 },
  ELEVEN: { text: '11-12点', value: 11 },
  TWELVE: { text: '12-13点', value: 12 },
  THIRTEEN: { text: '13-14点', value: 13 },
  FOURTEEN: { text: '14-15点', value: 14 },
  FIFTEEN: { text: '15-16点', value: 15 },
  SIXTEEN: { text: '16-17点', value: 16 },
  SEVENTEEN: { text: '17-18点', value: 17 },
  EIGHTEEN: { text: '18-19点', value: 18 },
  NINETEEN: { text: '19-20点', value: 19 },
  TWENTY: { text: '20-21点', value: 20 },
  TWENTYONE: { text: '21-22点', value: 21 }
}
/**
 * 使用时间段
 * @type {{AUDITED: {text: string, value: number}, RETURNGOODS: {text: string, value: number}}}
 */
const usTimeTyp = {
  ZERO: { text: '0点', value: 0 },
  ONE: { text: '1点', value: 1 },
  TWO: { text: '2点', value: 2 },
  THREE: { text: '3点', value: 3 },
  FOUR: { text: '4点', value: 4 },
  FIF: { text: '5点', value: 5 },
  SIX: { text: '6点', value: 6 },
  SEVEN: { text: '7点', value: 7 },
  EIGHT: { text: '8点', value: 8 },
  NINE: { text: '9点', value: 9 },
  TEN: { text: '10点', value: 10 },
  ELEVEN: { text: '11点', value: 11 },
  TWELVE: { text: '12点', value: 12 },
  THIRTEEN: { text: '13点', value: 13 },
  FOURTEEN: { text: '14点', value: 14 },
  FIFTEEN: { text: '15点', value: 15 },
  SIXTEEN: { text: '16点', value: 16 },
  SEVENTEEN: { text: '17点', value: 17 },
  EIGHTEEN: { text: '18点', value: 18 },
  NINETEEN: { text: '19点', value: 19 },
  TWENTY: { text: '20点', value: 20 },
  TWENTYONE: { text: '21点', value: 21 },
  TWENTYTWO: { text: '22点', value: 22 },
  TWENTYTHREE: { text: '23点', value: 23 }
}
/**
 * 回访状态
 * @type {{WAIT: {text: string, value: number}, ALREADY: {text: string, value: number}}}
 */
const returnVisitStatusTyp = {
  ALL: { text: '全部', value: -1 },
  WAIT: { text: '待回访', value: 0 },
  ALREADY: { text: '已回访', value: 1 }
}
/**
 * 客户类型
 * @type {{WAIT: {text: string, value: number}, ALREADY: {text: string, value: number}}}
 */
const customerTyp = {
  ALL: { text: '全部', value: -1 },
  SHAREHOLDER: { text: '股东客户', value: 0 },
  ORDINARY: { text: '普通客户', value: 1 }
}
/**
 * 意向度
 * @type {{HIGH: {text: string, value: number}, IN: {text: string, value: number}, LOW: {text: string, value: number}}}
 */
const intentionalityType = {
  HIGH: { text: '高', value: 0 },
  IN: { text: '中', value: 1 },
  LOW: { text: '低', value: 2 }
}
/**
 * 发送状态
 * @type {{HIGH: {text: string, value: number}, IN: {text: string, value: number}, LOW: {text: string, value: number}}}
 */
const sendingStateType = {
  SUCCESS: { text: '发送成功', value: 0 },
  FAIL: { text: '发送失败', value: 1 }
}
/**
 * 类型状态
 * @type {{ADD: {text: string, value: number}, LOSS: {text: string, value: number}}}
 */
const customerKeyType = {
  ALL: { text: '所有', value: -1 },
  ADD: { text: '新增重点客户', value: 0 },
  LOSS: { text: '流失重点客户', value: 1 }
}
/**
 * 时间状态
 * @type {{ADD: {text: string, value: number}, LOSS: {text: string, value: number}}}
 */
const monthTyp = {
  ONE: { text: '1月', value: '01' },
  TWO: { text: '2月', value: '02' },
  THREE: { text: '3月', value: '03' },
  FOUR: { text: '4月', value: '04' },
  FIF: { text: '5月', value: '05' },
  SIX: { text: '6月', value: '06' },
  SEVEN: { text: '7月', value: '07' },
  EIGHT: { text: '8月', value: '08' },
  NINE: { text: '9月', value: '09' },
  TEN: { text: '10月', value: '10' },
  ELEVEN: { text: '11月', value: '11' },
  TWELVE: { text: '12月', value: '12' }
}
/**
 * 客户来源
 * @type {{UPONLINE: {text: string, value: number}, SHAREHOLDER: {text: string, value: number}, DISTRIBUTION: {text: string, value: number}, ACCUMULATION: {text: string, value: number}, EXTERNAL: {text: string, value: number}}}
 */
const customerSourceTyp = {
  ALL: { text: '所有', value: -1 },
  UPONLINE: { text: '线下', value: 0 },
  WECHAT: { text: '微信', value: 1 },
  SHAREHOLDER: { text: '股东发展', value: 2 },
  DISTRIBUTION: { text: '分销拓客', value: 3 },
  ACCUMULATION: { text: '积客活动', value: 4 },
  EXTERNAL: { text: '外部导入', value: 5 }
}
/**
 * 收银类型
 * @type {{WHOLESALE: {text: string, value: number}, CASH: {text: string, value: number}}}
 */
const cashType = {
  CASH: { text: '收银开单', value: 1 },
  WHOLESALE: { text: '批发销售', value: 0 }
}
/**
 * 关联客户
 * @type {{{AUDITED: {text: string, value: number}, RELATION: {text: string, value: number}, UNRELATION: {text: string, value: number}}}
 */
const relatedType = {
  ALL: { text: '所有', value: -1 },
  RELATION: { text: '已关联', value: 0 },
  UNRELATION: { text: '未关联', value: 1 }
}
const priceChannel = {
  RETAIL: { text: '零售', value: 0 },
  WHOLESALE: { text: '批发', value: 1 },
  DISTRIBUTION: { text: '分销', value: 2 },
  PURCHASE: { text: '采购', value: 3 }
}
/**
 * 退回状态
 * @type {{{UNCONFIRMED: {text: string, value: number}, CONFIRMED: {text: string, value: number}}}
 */
const sendBack = {
  UNCONFIRMED: { text: '待确认', value: 0 },
  CONFIRMED: { text: '已确认', value: 1 }
}
/**
 * 调拨出库状态
 * @type {{{UNEXAMINE: {text: string, value: number}, UNWAREHOUSING: {text: string, value: number}, WAREHOUSING: {text: string, value: number}, RETURN: {text: string, value: number}}}
 */
const stockOutStatus = {
  UNEXAMINE: { text: '未审核', value: 0 },
  UNWAREHOUSING: { text: '未入库', value: 1 },
  WAREHOUSING: { text: '已入库', value: 2 },
  RETURN: { text: '退回', value: 3 }
}
/**
 * 调拨入库记录状态
 * @type {{{UNEXAMINE: {text: string, value: number}, UNWAREHOUSING: {text: string, value: number}, WAREHOUSING: {text: string, value: number}, RETURN: {text: string, value: number}}}
 */
const stockEnterRecordStatus = {
  UNEXAMINE: { text: '未审核', value: 0 },
  WAREHOUSING: { text: '已入库', value: 1 }
}
/**
 * 充值方式
 * @type {{CASH: {text: string, value: number}, ALIPAY: {text: string, value: number}, WECHAT: {text: string, value: number}}}
 */
const rechargeType = {
  CASH: { text: '现金', value: 0 },
  ALIPAY: { text: '支付宝', value: 1 },
  WECHAT: { text: '微信', value: 2 }
}
/**
 * 会员上传类型
 * @type {{ESSENTIAL: {text: string, value: number}, BALANCE: {text: string, value: number}, PACKAGEITEMS: {text: string, value: number}, MEMBERPOINTS: {text: string, value: number}}}
 */
const memberUploadType = {
  ESSENTIAL: { text: '基本信息', value: 0 },
  BALANCE: { text: '会员余额', value: 1 },
  PACKAGEITEMS: { text: '套餐项目', value: 2 },
  MEMBERPOINTS: { text: '会员积分', value: 3 }
}
/**
 * 股东分红明细类型
 * @type {{STORECONSUMPTION: {text: string, value: number}, STORERETURNS: {text: string, value: number},WECHAT: {text: string, value: number},VOIDORDER: {text: string, value: number},WHOLESALERETURNS: {text: string, value: number},WECHATMALL: {text: string, value: number},MANYCUSTOMERS: {text: string, value: number}}}
 */
const orderType = {
  STORECONSUMPTION: { text: '门店消费', value: 0 },
  STORERETURNS: { text: '门店退货', value: 1 },
  VOIDORDER: { text: '批发', value: 2 },
  WHOLESALERETURNS: { text: '批发退货', value: 3 }
}
export default {
  sexType,
  sexTypeKey: constantFormat(sexType),
  projectType,
  projectTypeKey: constantFormat(projectType),
  statusType,
  statusTypeKey: constantFormat(statusType),
  roomStatus,
  roomStatusKey: constantFormat(roomStatus),
  integralStatusType,
  integralStatusTypeKey: constantFormat(integralStatusType),
  stateType,
  stateTypeKey: constantFormat(stateType),
  employeeType,
  employeeTypeKey: constantFormat(employeeType),
  noticeWay,
  noticeWayKey: constantFormat(noticeWay),
  timeUnit,
  timeUnitKey: constantFormat(timeUnit),
  payWay,
  payWayKey: constantFormat(payWay),
  storeType,
  storeTypeKey: constantFormat(storeType),
  categoryType,
  categoryTypeKey: constantFormat(categoryType),
  otherBasic,
  otherBasicKey: constantFormat(otherBasic),
  noticeType,
  noticeTypeKey: constantFormat(noticeType),
  toExamine,
  toExamineKey: constantFormat(toExamine),
  paymentWay,
  paymentWayKey: constantFormat(paymentWay),
  storageType,
  storageTypeKey: constantFormat(storageType),
  businessType,
  businessTypeKey: constantFormat(businessType),
  discountType,
  discountTypeKey: constantFormat(discountType),
  royaltyType,
  royaltyTypeKey: constantFormat(royaltyType),
  receivablesType,
  receivablesTypeKey: constantFormat(receivablesType),
  partialType,
  partialTypeKey: constantFormat(partialType),
  statusWithdrawalsType,
  statusWithdrawalsTypeKey: constantFormat(statusWithdrawalsType),
  withdrawalsType,
  withdrawalsTypeKey: constantFormat(withdrawalsType),
  sourceType,
  sourceTypeKey: constantFormat(sourceType),
  bonusType,
  bonusTypeKey: constantFormat(bonusType),
  introduceType,
  introduceTypeKey: constantFormat(introduceType),
  customerType,
  customerTypeKey: constantFormat(customerType),
  releaseType,
  releaseTypeKey: constantFormat(releaseType),
  distributorStatusType,
  distributorStatusTypeKey: constantFormat(distributorStatusType),
  detailTyp,
  detailTypKey: constantFormat(detailTyp),
  distributionTyp,
  distributionTypKey: constantFormat(distributionTyp),
  warningTyp,
  warningTypKey: constantFormat(warningTyp),
  levelTyp,
  levelTypKey: constantFormat(levelTyp),
  settlementStatusTyp,
  settlementStatusTypKey: constantFormat(settlementStatusTyp),
  followTyp,
  followTypKey: constantFormat(followTyp),
  sendingModeTyp,
  sendingModeTypKey: constantFormat(sendingModeTyp),
  prescriptionTyp,
  prescriptionTypKey: constantFormat(prescriptionTyp),
  receivingStatusTyp,
  receivingStatusTypKey: constantFormat(receivingStatusTyp),
  evaluateTyp,
  evaluateTypKey: constantFormat(evaluateTyp),
  appointmenTyp,
  appointmenTypKey: constantFormat(appointmenTyp),
  timeTyp,
  timeTypKey: constantFormat(timeTyp),
  documentTyp,
  documentTypKey: constantFormat(documentTyp),
  royaltyWayTyp,
  royaltyWayTypKey: constantFormat(royaltyWayTyp),
  remindTimeTyp,
  remindTimeTypKey: constantFormat(remindTimeTyp),
  usTimeTyp,
  usTimeTypKey: constantFormat(usTimeTyp),
  returnVisitStatusTyp,
  returnVisitStatusTypKey: constantFormat(returnVisitStatusTyp),
  customerTyp,
  customerTypKey: constantFormat(customerTyp),
  intentionalityType,
  intentionalityTypeKey: constantFormat(intentionalityType),
  sendingStateType,
  sendingStateTypeKey: constantFormat(sendingStateType),
  customerKeyType,
  customerKeyTypeKey: constantFormat(customerKeyType),
  monthTyp,
  monthTypKey: constantFormat(monthTyp),
  customerSourceTyp,
  customerSourceTypKey: constantFormat(customerSourceTyp),
  cashType,
  cashTypeKey: constantFormat(cashType),
  relatedType,
  relatedTypeKey: constantFormat(relatedType),
  priceChannel,
  priceChannelKey: constantFormat(priceChannel),
  sendBack,
  sendBackKey: constantFormat(sendBack),
  stockOutStatus,
  stockOutStatusKey: constantFormat(stockOutStatus),
  stockEnterRecordStatus,
  stockEnterRecordStatusKey: constantFormat(stockEnterRecordStatus),
  rechargeType,
  rechargeTypeKey: constantFormat(rechargeType),
  memberUploadType,
  memberUploadTypeKey: constantFormat(memberUploadType),
  orderType,
  orderTypeKey: constantFormat(orderType)
}
