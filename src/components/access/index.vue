<script>
import store from '@/store'
export default {
  name: 'Access',
  props: {
    name: {
      type: String
    }
  },
  computed: {
    isPermission () {
      return store.state.user.access.includes(this.name)
    }
  },
  render (h, context) {
    return this.isPermission ? this.$slots.default : null
  }
}
</script>
