import axios from 'axios'
import { Message } from 'view-design'
import { getToken, decrypt, createSign } from '@/libs/util'
import store from '@/store'
import md5 from 'js-md5'
const GLOBAL_RESPONSE_CODE = { SUCCESS: 100 }

class HttpRequest {
  constructor (baseUrl = '') {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {}
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      setTimeout(() => {
        store.commit('setHttpLoading', false)
      }, 400)
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      if (!config.notQueue) {
        this.queue[url] = true
      }
      // 添加全局的loading...
      if (Object.keys(this.queue).length) {
        store.commit('setHttpLoading', true)
      }
      config.headers.Authorization = getToken()
      let tempTimestamp = new Date().getTime().toString()
      config.headers.timestamp = tempTimestamp
      if (getToken()) {
        config.headers.sign = createSign(tempTimestamp)
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      if (res.data.code && res.data.code !== GLOBAL_RESPONSE_CODE.SUCCESS) {
        Message.error(res.data.msg)
        return Promise.reject(res)
      }
      if (res.data.encrypt) {
        let tempData = decrypt(md5(res.config.headers.timestamp.substring(0, 2) + res.config.headers.timestamp.substring(5, 6) + res.config.headers.timestamp.substring(10, 12)).substr(0, 16), res.data.data)
        try {
          res.data.data = JSON.parse(tempData)
        } catch (e) {
          res.data.data = tempData
        }
      }
      return res.data
    }, error => {
      this.destroy(url)
      Message.error(error.response.data.msg)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
  getAxios () {
    return axios
  }
}
export default HttpRequest
