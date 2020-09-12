import { timeFormat } from '@/libs/util'

export default function (date, format) {
  format = format || 'yyyy-MM-dd hh:mm:ss'
  return timeFormat(date, format)
}
