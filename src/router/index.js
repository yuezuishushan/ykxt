import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import ViewUI from 'view-design'
import { setToken, getToken, canTurnTo, setTitle, localRead } from '@/libs/util'
import config from '@/config'
const { homeName } = config

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'
const GRANT_PAGE_NAME = 'grant'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}

/**
 * 尚未初始化时可进入页面
 * @type {*[]}
 */
const INITIALIZE_PAGE_PREFIX__LIST = ['home']

router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start()
  const token = getToken()
  console.log(1)
  // console.log(to)
  console.log(2)
  if (to.name === LOGIN_PAGE_NAME && Number(localRead('REMEMBER_TOKEN')) === 0) {
    setToken('')
  }
  console.log(3)
  console.log(to)
  if (to.name === GRANT_PAGE_NAME) {
    let tempLoginData = {
      username: to.params.user,
      password: to.params.password,
      // grantType: 'encrypt',
      // sign: to.params.sign,
      // timestamp: to.params.timestamp
    }
    store.dispatch('handleLogin', tempLoginData).then(user => {
      console.log('走这里0')
      store.dispatch('getUserInfo').then(user => {
        console.log('走这里1')
        next({ name: 'home' })
      }).catch(() => {
        setToken('')
        console.log('走这里2')
        next({
          name: 'login'
        })
      })
    }).catch(() => {
      setToken('')
      next({
        name: 'login'
      })
      console.log('走这里3')
    })
  } else if (!token && to.name !== LOGIN_PAGE_NAME) {
    console.log('走这里4')
    next({
      name: LOGIN_PAGE_NAME
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    console.log('走这里5')
    next()
  } else {
    if (to.params.refreshView) {
      store.commit('setRefreshView', { name: to.name, val: to.params.refreshView })
      delete to.params.refreshView
    }
    if (store.state.user.hasGetInfo) {
      if (to.name === LOGIN_PAGE_NAME) {
        next({
          name: store.state.user.closeStatus ? homeName : 'initializeNavigation'
        })
      } else if (!store.state.user.closeStatus) {
        let tempAllowView = false
        for (let i in INITIALIZE_PAGE_PREFIX__LIST) {
          if (to.name.startsWith(INITIALIZE_PAGE_PREFIX__LIST[i])) {
            tempAllowView = true
            break
          }
        }
        if (!tempAllowView) {
          ViewUI.Message.warning('请先进行初始化')
          if (from.name !== 'initializeNavigation') {
            next({
              name: 'initializeNavigation'
            })
          } else {
            ViewUI.LoadingBar.finish()
            next(false)
          }
        } else {
          turnTo(to, store.state.user.access, next)
        }
      } else {
        turnTo(to, store.state.user.access, next)
      }
    } else {
      console.log('走这里9')
      console.log(to)
      console.log('走这里9')
      turnTo(to, '',next)
      // store.dispatch('getUserInfo').then(user => {
      //   if (to.name === LOGIN_PAGE_NAME) {
      //     next({
      //       name: user.defaultRoute
      //     })
      //   } else if (!user.closeStatus) {
      //     let tempAllowView = false
      //     for (let i in INITIALIZE_PAGE_PREFIX__LIST) {
      //       if (to.name.startsWith(INITIALIZE_PAGE_PREFIX__LIST[i])) {
      //         tempAllowView = true
      //         break
      //       }
      //     }
      //     if (!tempAllowView) {
      //       ViewUI.Message.warning('请先进行初始化')
      //       if (from.name !== 'initializeNavigation') {
      //         next({
      //           name: 'initializeNavigation'
      //         })
      //       } else {
      //         ViewUI.LoadingBar.finish()
      //         next(false)
      //       }
      //     } else {
      //       turnTo(to, store.state.user.access, next)
      //     }
      //   } else {
      //     turnTo(to, store.state.user.access, next)
      //   }
      // }).catch(() => {
      //   setToken('')
      //   next({
      //     name: 'login'
      //   })
      // })
    }
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  ViewUI.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
