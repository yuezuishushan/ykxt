import { getBreadCrumbList, setTagNavListInLocalstorage, getMenuByRouter, getTagNavListFromLocalstorage, getHomeRoute, getNextRoute, routeHasExist, routeEqual, getRouteTitleHandled, localSave, localRead } from '@/libs/util'
import router from '@/router'
import routers from '@/router/routers'
import config from '@/config'
const { homeName } = config

const closePage = (state, route, nextRoute) => {
  const tempNextRoute = nextRoute || getNextRoute(state.tagNavList, route)
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route)
  })
  router.push(tempNextRoute)
}

export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: {},
    local: localRead('local'),
    /**
     * 1：刷新页面， 2：刷新当前页， 其他：不刷新
     */
    refreshNav: {},
    previewModal: { visible: false, imageList: [], type: '', index: -1 },
    httpLoading: false,
    wsMessage: null
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access)
  },
  mutations: {
    setBreadCrumb (state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setHomeRoute (state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName)
    },
    setTagNavList (state, list) {
      let tagList = []
      if (list) {
        tagList = [...list]
      } else tagList = getTagNavListFromLocalstorage() || []
      if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
      let homeTagIndex = tagList.findIndex(item => item.name === homeName)
      if (homeTagIndex > 0) {
        let homeTag = tagList.splice(homeTagIndex, 1)[0]
        tagList.unshift(homeTag)
      }
      state.tagNavList = tagList
      setTagNavListInLocalstorage([...tagList])
    },
    closeTag (state, { route, nextRoute }) {
      let tag = state.tagNavList.filter(item => routeEqual(item, route))
      route = tag[0] ? tag[0] : null
      if (!route) return
      closePage(state, route, nextRoute)
    },
    addTag (state, { route, type = 'unshift' }) {
      let router = getRouteTitleHandled(route)
      if (router.meta && router.meta.replaceTag) {
        let tempIndex = state.tagNavList.findIndex(item => item.name === router.name)
        if (tempIndex >= 0) {
          state.tagNavList[tempIndex] = router
          setTagNavListInLocalstorage([...state.tagNavList])
        }
      }
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router)
        else {
          if (router.name === homeName) state.tagNavList.unshift(router)
          else state.tagNavList.splice(1, 0, router)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setLocal (state, lang) {
      localSave('local', lang)
      state.local = lang
    },
    setRefreshView (state, { name, val }) {
      state.refreshNav[name] = val
    },
    clearRefreshView (state, name) {
      state.refreshNav[name] = 0
    },
    handlePreview (state, url, index = 0) {
      state.previewModal.imageList = []
      const getFileType = url => {
        let tempType = ''
        if (/.jpg/i.test(url) || /.jpeg/i.test(url) || /.png/i.test(url)) {
          tempType = 'image'
        } else if (/.mp4/i.test(url)) {
          tempType = 'video'
        } else if (/.mp3/i.test(url) || /.ogg/i.test(url) || /.wav/i.test(url)) {
          tempType = 'audio'
        } else if (/.pdf/i.test(url)) {
          tempType = 'pdf'
        } else if (/.xls/i.test(url) || /.xlsx/i.test(url) || /.csv/i.test(url)) {
          tempType = 'excel'
        } else if (/.doc/i.test(url) || /.docx/i.test(url)) {
          tempType = 'word'
        } else if (/.ppt/i.test(url) || /.pptx/i.test(url)) {
          tempType = 'ppt'
        }
        return tempType
      }
      if (typeof url === 'string') {
        state.previewModal.imageList.push({
          url: url,
          type: getFileType(url)
        })
      } else {
        for (let i in url) {
          state.previewModal.imageList.push({
            url: url[i],
            type: getFileType(url)
          })
        }
      }
      state.previewModal.index = index
      state.previewModal.visible = true
    },
    handleCancelPreview (state) {
      state.previewModal = { visible: false, imageList: [], type: '', index: -1 }
    },
    setHttpLoading (state, val) {
      state.httpLoading = val
    },
    setWsMessage (state, data) {
      state.wsMessage = data
    }
  },
  actions: {
  }
}
