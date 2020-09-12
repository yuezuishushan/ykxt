<template>
  <Layout style="height: 100%" class="main">
    <Sider hide-trigger collapsible :width="210" :collapsed-width="60" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
      <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
        <div class="logo-con">
          <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
          <img v-show="collapsed" :src="minLogo" key="min-logo" />
        </div>
      </side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <user :user-avatar="userAvatar"/>
          <language v-if="$config.useI18n" @on-lang-change="setLocal" style="margin-right: 10px;" :lang="local"/>
          <error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader" :has-read="hasReadErrorPage" :count="errorCount"></error-store>
          <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <Spin size="large" fix v-if="httpLoading" class="http-loading-spin"></Spin>
          <div class="tag-nav-wrapper">
            <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
          </div>
          <Content class="content-wrapper">
            <keep-alive :include="cacheList">
              <router-view/>
            </keep-alive>
            <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
          </Content>
        </Layout>
      </Content>
    </Layout>
    <Modal title="预览" v-model="previewModal.visible" class="preview-modal" @on-cancel="handleCancelPreview" :width="860">
      <Carousel v-model="previewModal.index" v-if="previewModal.visible" radius-dot dots="outside">
        <CarouselItem v-for="(item, index) in previewModal.imageList" :key="index">
          <div class="preview-wrapper">
            <img v-lazy="item.url" v-if="item.type === 'image'">
            <video :src="item.url" v-if="item.type === 'video'" controls></video>
            <audio :src="item.url" v-if="item.type === 'audio'" controls></audio>
            <embed :src="item.url" type="application/pdf" v-if="item.type === 'pdf'"></embed>
            <iframe v-if="item.type === 'excel'" :src="`https://view.officeapps.live.com/op/view.aspx?src=${item.url}`"></iframe>
            <iframe v-if="item.type === 'word'" :src="`https://view.officeapps.live.com/op/view.aspx?src=${item.url}`"></iframe>
            <iframe v-if="item.type === 'ppt'" :src="`https://view.officeapps.live.com/op/view.aspx?src=${item.url}`"></iframe>
          </div>
        </CarouselItem>
      </Carousel>
    </Modal>
  </Layout>
</template>
<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import ABackTop from './components/a-back-top'
import Fullscreen from './components/fullscreen'
import Language from './components/language'
import { mapState, mapMutations, mapActions } from 'vuex'
import { getNewTagList, routeEqual } from '@/libs/util'
import routers from '@/router/routers'
import minLogo from '@/assets/images/logo-min.png'
import maxLogo from '@/assets/images/logo.png'
import './main.less'
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    Language,
    TagsNav,
    Fullscreen,
    User,
    ABackTop
  },
  data () {
    return {
      collapsed: Boolean(sessionStorage.getItem('MENU_COLLAPSED')),
      minLogo,
      maxLogo,
      isFullscreen: false
    }
  },
  computed: {
    ...mapState({
      previewModal: state => state.app.previewModal,
      httpLoading: state => state.app.httpLoading
    }),
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    userAvatar () {
      return this.$store.state.user.avatarImgPath
    },
    cacheList () {
      const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
      return list
    },
    menuList () {
      return this.$store.getters.menuList
    },
    local () {
      return this.$store.state.app.local
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal',
      'setHomeRoute',
      'closeTag',
      'handleCancelPreview'
    ]),
    ...mapActions([
      'handleLogin'
    ]),
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleCloseTag (res, type, route) {
      const _this = this
      if (type !== 'others') {
        if (type === 'all') {
          _this.turnToPage(this.$config.homeName)
        } else {
          if (routeEqual(this.$route, route)) {
            _this.closeTag({ route })
          }
        }
      }
      _this.setTagNavList(res)
    },
    handleClick (item) {
      this.turnToPage(item)
    }
  },
  watch: {
    '$route' (newRoute) {
      const { name, query, params, meta } = newRoute
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
      this.setBreadCrumb(newRoute)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      this.$refs.sideMenu.updateOpenName(newRoute.name)
    },
    collapsed (val) {
      if (val) {
        sessionStorage.setItem('MENU_COLLAPSED', val)
      } else {
        sessionStorage.removeItem('MENU_COLLAPSED')
      }
    }
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.setHomeRoute(routers)
    const { name, params, query, meta } = this.$route
    this.addTag({
      route: { name, params, query, meta }
    })
    this.setBreadCrumb(this.$route)
    // 设置初始语言
    this.setLocal(this.$i18n.locale)
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      })
    }
  },
  created () {
    // this.$setWs.initWebSocket('ws://127.0.0.1:12593')
  }
}
</script>
