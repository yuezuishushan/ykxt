import { constantFormat } from '@/libs/util'

/**
 * 轮播图类型
 * @type {{ARTICLE: {text: string, value: number}, LINK: {text: string, value: number}, PRODUCT: {text: string, value: number}}}
 */
const wechatCarouselType = {
  ARTICLE: { text: '图文', value: 0 },
  LINK: { text: '链接地址', value: 1 },
  PRODUCT: { text: '商品', value: 2 }
}

/**
 * 上架状态
 * @type {{UPPER: {text: string, value: number}, LOWER: {text: string, value: number}}}
 */
const mallShelfStatus = {
  UPPER: { text: '上架', value: 0 },
  LOWER: { text: '下架', value: 1 }
}

/**
 * 首页显示状态
 * @type {{HIDE: {text: string, value: number}, SHOW: {text: string, value: number}}}
 */
const mallHomeShowStatus = {
  SHOW: { text: '显示', value: 1 },
  HIDE: { text: '隐藏', value: 0 }
}

export default {
  wechatCarouselType,
  wechatCarouselTypeKey: constantFormat(wechatCarouselType),
  mallShelfStatus,
  mallShelfStatusKey: constantFormat(mallShelfStatus),
  mallHomeShowStatus,
  mallHomeShowStatusKey: constantFormat(mallHomeShowStatus)
}
