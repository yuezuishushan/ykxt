import { mapState, mapMutations } from 'vuex'
import { isEmpty } from '@/libs/util'
const mixin = {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      globalUserData: state => state.user,
      constantData: state => state.constant,
      refreshNav: state => state.app.refreshNav
    })
  },
  methods: {
    ...mapMutations([
      'closeTag',
      'setRefreshNav',
      'setRefreshView',
      'clearRefreshView'
    ]),
    isEmpty,
    checkAccess (name) {
      return this.globalUserData.access.includes(name)
    }
  }
}

export default mixin
