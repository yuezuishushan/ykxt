import userStore from '@/store/module/user'
export default function (num, len, prefix) {
  let str = ''
  len = len || userStore.state.setting.numberDecimal
  if (num !== '') {
    str = Number(num).toFixed(len)
  }
  if (prefix) {
    str = prefix + str
  }

  return str
}
