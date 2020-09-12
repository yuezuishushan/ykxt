import config from '@/config'
const baseImgUrl = config.baseUrl.image

export default function (url) {
  let str = ''
  if (url) {
    if (url.indexOf('http') !== 0 && url.indexOf('data:') !== 0) {
      str = baseImgUrl + url
    } else {
      str = url
    }
  }

  return str
}
