import CryptoJS from 'crypto-js'
import config from '@/config'
import md5 from 'js-md5'
import powerConfig from '@/libs/powerConfig'
import { forEach, hasOneOf, objEqual, oneOf } from '@/libs/tools'
const { title, useI18n } = config

export const TOKEN_KEY = 'token'

export const setToken = (token) => {
  sessionStorage.setItem(TOKEN_KEY, token)
}

export const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY) || ''
}

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}

const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.access) {
    if (oneOf(item.name, access)) return true
    else return false
  } else return true
}
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
  let res = []
  forEach(list, item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      if ((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {
        obj.children = getMenuByRouter(item.children, access)
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href
      if (showThisMenuEle(item, access)) res.push(obj)
    }
  })
  return res
}

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (route, homeRoute) => {
  let homeItem = { ...homeRoute, icon: homeRoute.meta.icon }
  let routeMetched = route.matched
  if (routeMetched.some(item => item.name === homeRoute.name)) return [homeItem]
  let res = routeMetched.filter(item => {
    return item.meta === undefined || !item.meta.hideInBread
  }).map(item => {
    let meta = { ...item.meta }
    if (meta.title && typeof meta.title === 'function') {
      meta.__titleIsFunction__ = true
      meta.title = meta.title(route)
    }
    let obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: meta
    }
    return obj
  })
  res = res.filter(item => {
    return !item.meta.hideInMenu
  })
  return [{ ...homeItem, to: homeRoute.path }, ...res]
}

export const getRouteTitleHandled = (route) => {
  let router = { ...route }
  let meta = { ...route.meta }
  let title = ''
  if (meta.title) {
    if (typeof meta.title === 'function') {
      meta.__titleIsFunction__ = true
      title = meta.title(router)
    } else title = meta.title
  }
  meta.title = title
  router.meta = meta
  return router
}

export const showTitle = (item, vm) => {
  let { title, __titleIsFunction__ } = item.meta
  if (!title) return
  if (useI18n) {
    if (title.includes('{{') && title.includes('}}') && useI18n) title = title.replace(/({{[\s\S]+?}})/, (m, str) => str.replace(/{{([\s\S]*)}}/, (m, _) => vm.$t(_.trim())))
    else if (__titleIsFunction__) title = item.meta.title
    else title = vm.$t(item.name)
  } else title = (item.meta && item.meta.title) || item.name
  return title
}

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
  localStorage.tagNaveList = JSON.stringify(list)
}
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = localStorage.tagNaveList
  return list ? JSON.parse(list) : []
}

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = (routers, homeName = 'home') => {
  let i = -1
  let len = routers.length
  let homeRoute = {}
  while (++i < len) {
    let item = routers[i]
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children, homeName)
      if (res.name) return res
    } else {
      if (item.name === homeName) homeRoute = item
    }
  }
  return homeRoute
}

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
  const { name, path, meta } = newRoute
  let newList = [...list]
  if (newList.findIndex(item => item.name === name) >= 0) return newList
  else newList.push({ name, path, meta })
  return newList
}

/**
 * @param {*} access 用户权限数组
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) return oneOf(route.name, access)
  else return true
}

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
  const routePermissionJudge = (list) => {
    return list.some(item => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      } else if (item.name === name) {
        return hasAccess(access, item)
      }
    })
  }

  return routePermissionJudge(routes)
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
  let res = {}
  if (list.length === 2) {
    res = getHomeRoute(list)
  } else {
    const index = list.findIndex(item => routeEqual(item, route))
    if (index === list.length - 1) res = list[list.length - 2]
    else res = list[index + 1]
  }
  return res
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}

/**
 * @param {Object} file 从上传组件得到的文件对象
 * @returns {Promise} resolve参数是解析后的二维数组
 * @description 从Csv文件中解析出表格，解析成二维数组
 */
export const getArrayFromFile = (file) => {
  let nameSplit = file.name.split('.')
  let format = nameSplit[nameSplit.length - 1]
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsText(file) // 以文本格式读取
    let arr = []
    reader.onload = function (evt) {
      let data = evt.target.result // 读到的数据
      let pasteData = data.trim()
      arr = pasteData.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(row => {
        return row.split('\t')
      }).map(item => {
        return item[0].split(',')
      })
      if (format === 'csv') resolve(arr)
      else reject(new Error('[Format Error]:你上传的不是Csv文件'))
    }
  })
}

/**
 * @param {Array} array 表格数据二维数组
 * @returns {Object} { columns, tableData }
 * @description 从二维数组中获取表头和表格数据，将第一行作为表头，用于在iView的表格中展示数据
 */
export const getTableDataFromArray = (array) => {
  let columns = []
  let tableData = []
  if (array.length > 1) {
    let titles = array.shift()
    columns = titles.map(item => {
      return {
        title: item,
        key: item
      }
    })
    tableData = array.map(item => {
      let res = {}
      item.forEach((col, i) => {
        res[titles[i]] = col
      })
      return res
    })
  }
  return {
    columns,
    tableData
  }
}

export const findNodeUpper = (ele, tag) => {
  if (ele.parentNode) {
    if (ele.parentNode.tagName === tag.toUpperCase()) {
      return ele.parentNode
    } else {
      return findNodeUpper(ele.parentNode, tag)
    }
  }
}

export const findNodeUpperByClasses = (ele, classes) => {
  let parentNode = ele.parentNode
  if (parentNode) {
    let classList = parentNode.classList
    if (classList && classes.every(className => classList.contains(className))) {
      return parentNode
    } else {
      return findNodeUpperByClasses(parentNode, classes)
    }
  }
}

export const findNodeDownward = (ele, tag) => {
  const tagName = tag.toUpperCase()
  if (ele.childNodes.length) {
    let i = -1
    let len = ele.childNodes.length
    while (++i < len) {
      let child = ele.childNodes[i]
      if (child.tagName === tagName) return child
      else return findNodeDownward(child, tag)
    }
  }
}

export const showByAccess = (access, canViewAccess) => {
  return hasOneOf(canViewAccess, access)
}

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  let query1 = route1.query || {}
  let query2 = route2.query || {}
  let params1 = route1.params || {}
  let params2 = route2.params || {}
  if (!isEmpty(params1.refreshView)) {
    delete params1.refreshView
  }
  if (!isEmpty(params2.refreshView)) {
    delete params2.refreshView
  }
  return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
}

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
  let len = tagNavList.length
  let res = false
  doCustomTimes(len, (index) => {
    if (routeEqual(tagNavList[index], routeItem)) res = true
  })
  return res
}

export const localSave = (key, value) => {
  localStorage.setItem(key, value)
}

export const localRead = (key) => {
  return localStorage.getItem(key) || ''
}

// scrollTop animation
export const scrollTop = (el, from = 0, to, duration = 500, endCallback) => {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
    )
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)

  const scroll = (start, end, step) => {
    if (start === end) {
      endCallback && endCallback()
      return
    }

    let d = (start + step > end) ? end : start + step
    if (start > end) {
      d = (start - step < end) ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }
  scroll(from, to, step)
}

/**
 * @description 根据当前跳转的路由设置显示在浏览器标签的title
 * @param {Object} routeItem 路由对象
 * @param {Object} vm Vue实例
 */
export const setTitle = (routeItem, vm) => {
  const handledRoute = getRouteTitleHandled(routeItem)
  const pageTitle = showTitle(handledRoute, vm)
  let resTitle = pageTitle ? `${title} - ${pageTitle}` : title
  let meta = { ...routeItem.meta }
  if (meta.titlePrefix === false) {
    resTitle = pageTitle
  }
  window.document.title = resTitle
}

export const isEmpty = (data) => {
  return data === '' || data === undefined || data === null
}

/**
 * 数据解密方法
 */
export const decrypt = (keyStr, word) => {
  let key = CryptoJS.enc.Utf8.parse(keyStr)
  let decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

/**
 * 创建sign
 * @param timestamp
 * @returns {string}
 */
export const createSign = (timestamp) => {
  let tempSign = ''
  if (getToken()) {
    tempSign = md5(getToken().substr(7) + timestamp.substring(0, 2) + timestamp.substring(5, 6) + timestamp.substring(10, 12) + timestamp)
  }
  return tempSign
}

export const weekFormat = (date) => {
  let tempStr = ''
  if (date) {
    let days = date.getDay()
    switch (days) {
      case 0:
        tempStr = '星期日'
        break
      case 1:
        tempStr = '星期一'
        break
      case 2:
        tempStr = '星期二'
        break
      case 3:
        tempStr = '星期三'
        break
      case 4:
        tempStr = '星期四'
        break
      case 5:
        tempStr = '星期五'
        break
      case 6:
        tempStr = '星期六'
        break
    }
  }
  return tempStr
}

export const timeFormat = (date, format) => {
  if (!date) return ''
  let d = date
  if (typeof date === 'string') {
    if (date.indexOf('/Date(') > -1) {
      d = new Date(parseInt(date.replace('/Date(', '').replace(')/', ''), 10))
    } else {
      d = new Date(Date.parse(date.replace(/-/g, '/').replace('T', ' ').split('.')[0]))
    }
  } else if (typeof date === 'number') {
    d = new Date(date)
  }
  if (format === 'Date') {
    return d
  }
  let o = {
    'M+': d.getMonth() + 1,
    'd+': d.getDate(),
    'h+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
    'q+': Math.floor((d.getMonth() + 3) / 3),
    'S': d.getMilliseconds() // millisecond
  }
  let week = {
    '0': '日',
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六'
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(format)) {
    format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[d.getDay() + ''])
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

/**
 * 格式化数字显示方式
 * 用法
 * formatNumber('#,##0.00',12345.999);
 * formatNumber('#,##0.##',12345.999);
 * formatNumber('000000',);
 */
export const formatNumber = (format, v) => {
  if (v == null) { return v }
  let strarr = v ? v.toString().split('.') : ['0']
  let fmtarr = format ? format.split('.') : ['']
  let retstr = ''
  // 整数部分
  let str = strarr[0]
  let fmt = fmtarr[0]
  let i = str.length - 1
  let comma = false
  for (let f = fmt.length - 1; f >= 0; f--) {
    switch (fmt.substr(f, 1)) {
      case '#':
        if (i >= 0) retstr = str.substr(i--, 1) + retstr
        break
      case '0':
        if (i >= 0) retstr = str.substr(i--, 1) + retstr
        else retstr = '0' + retstr
        break
      case ',':
        comma = true
        retstr = ',' + retstr
        break
    }
  }
  if (i >= 0) {
    if (comma) {
      var l = str.length
      for (; i >= 0; i--) {
        retstr = str.substr(i, 1) + retstr
        if (i > 0 && ((l - i) % 3) == 0) retstr = ',' + retstr
      }
    } else retstr = str.substr(0, i + 1) + retstr
  }
  retstr = retstr + '.'
  // 处理小数部分
  str = strarr.length > 1 ? strarr[1] : ''
  fmt = fmtarr.length > 1 ? fmtarr[1] : ''
  i = 0
  for (let k = 0; k < fmt.length; k++) {
    switch (fmt.substr(k, 1)) {
      case '#':
        if (i < str.length) retstr += str.substr(i++, 1)
        break
      case '0':
        if (i < str.length) retstr += str.substr(i++, 1)
        else retstr += '0'
        break
    }
  }
  return retstr.replace(/^,+/, '').replace(/\.$/, '')
}

/**
 * 获取位运算的集合
 * @param num
 * @returns {Array}
 */
export const getBitwiseList = (num) => {
  let tempList = []
  for (let i = 0; i < 64; i++) {
    if (Math.pow(2, i) > num) {
      break
    }
    if (num & (0x01 << i)) {
      tempList.push(num & (0x01 << i))
    }
  }
  return tempList
}

/**
 * 自定义常量格式转化
 * 在store中使用
 * @param data
 */
export const constantFormat = (data) => {
  let tempObj = {}
  for (let key in data) {
    tempObj[data[key].value] = data[key]
    tempObj[data[key].value].keyword = key
  }
  return tempObj
}

/**
 * 获取单据billId
 * @param key
 * @returns {*}
 */
export const getBillID = key => {
  for (let i in powerConfig) {
    if (powerConfig[i].key === key) {
      return powerConfig[i].billId
    }
  }
}

export const getObjectFormTree = (tree, key, value) => {
  let tempObj = null
  const calcFun = (item) => {
    if (tempObj) {
      return
    }
    if (item[key] === value) {
      tempObj = Object.assign({}, item)
      return
    }
    if (item.children && item.children.length) {
      for (let i in item.children) {
        if (tempObj) {
          return
        }
        calcFun(item.children[i])
      }
    }
  }
  if (tree && tree.length) {
    for (let i in tree) {
      if (tempObj) {
        break
      }
      calcFun(tree[i])
    }
  }
  return tempObj
}
