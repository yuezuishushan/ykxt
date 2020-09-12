import { constantFormat } from '@/libs/util'

/**
 * 模板类型
 * @type {{SYSTEM: {text: string, value: number}, CUSTOM: {text: string, value: number}}}
 */
const templateType = {
  SYSTEM: { text: '系统模板', value: 0 },
  CUSTOM: { text: '自建模板', value: 1 }
}

export default {
  templateType,
  templateTypeKey: constantFormat(templateType)
}
