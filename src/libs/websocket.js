import store from '@/store'
import { Message } from 'view-design'
let wsConnection = {
  $ws: null,
  wsUrl: '',
  lockReturn: false,
  timeout: 60 * 1000 * 5,
  timeoutObj: null,
  timeoutNum: null,
  serverTimeoutObj: null,
  callbackQueue: {},
  initWebSocket: function (url) {
    if (url) {
      this.wsUrl = url
    }
    this.$ws = new WebSocket(this.wsUrl)
    this.$ws.onopen = this.wsOpen
    this.$ws.onclose = this.wsClose
    this.$ws.onmessage = this.wsMsg
    this.$ws.onerror = this.wsError
  },
  wsOpen: function (e) {
    wsConnection.startWsHeartbeat()
    if (wsConnection.callback) {
      wsConnection.callback()
    }
    let tempDeleteQueue = []
    for (let key in wsConnection.callbackQueue) {
      wsConnection.callbackQueue[key]()
      tempDeleteQueue.push(key)
    }
    for (let i in tempDeleteQueue) {
      delete wsConnection.callbackQueue[tempDeleteQueue[i]]
    }
  },
  wsClose: function (e) {
  },
  wsMsg: function (msg) {
    wsConnection.resetHeartbeat()
    let tempResponse = null
    if (msg && msg.data) {
      try {
        tempResponse = JSON.parse(msg.data)
      } catch (e) {
        tempResponse = null
      }
    }
    store.commit('setWsMessage', tempResponse)
  },
  wsSend: function (msg) {
    let _this = this
    if (_this.$ws.readyState != 1) {
      wsConnection.callbackQueue[`${new Date().getTime()}_fun`] = () => {
        wsConnection.$ws.send(msg)
      }
      wsConnection.initWebSocket()
    } else {
      wsConnection.$ws.send(msg)
    }
  },
  wsError: function (err) {
    Message.error('打印机连接出错，请检查服务')
    wsConnection.callbackQueue = {}
  },
  reconnect: function () {
    let _this = this
    if (_this.lockReturn) {
      return
    }
    _this.lockReturn = true
    _this.timeoutNum && clearTimeout(_this.timeoutNum)
    _this.timeoutNum = setTimeout(function () {
      _this.initWebSocket()
      _this.lockReturn = false
    }, 3000)
  },
  startWsHeartbeat: function () {
    let _this = this
    _this.timeoutObj && clearTimeout(_this.timeoutObj)
    _this.serverTimeoutObj && clearTimeout(_this.serverTimeoutObj)
    _this.timeoutObj = setInterval(function () {
      if (_this.$ws.readyState != 1) {
        _this.reconnect()
      }
    }, _this.timeout)
  },
  resetHeartbeat: function () {
    let _this = this
    clearTimeout(_this.timeoutObj)
    clearTimeout(_this.serverTimeoutObj)
    _this.startWsHeartbeat()
  }
}

export default wsConnection
