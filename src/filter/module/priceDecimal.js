import userStore from '@/store/module/user'
export default function (num, prefix) {
  let str = ''
  let len = userStore.state.setting.priceDecimal || 0
  if (num !== '') {
    str = Number(num).toFixed(len)
  }
  if (prefix) {
    str = prefix + str
  }

  return str
}
