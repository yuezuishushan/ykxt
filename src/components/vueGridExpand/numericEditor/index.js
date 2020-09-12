import Vue from 'vue'
import $ from 'jquery'
import mixin from '../mixin'
export default Vue.extend({
  mixins: [mixin],
  template: `<Input ref="input" type="number" number v-model="value" :key="params.colDef.field + params.rowIndex"/>`,
  data () {
    return {
      value: ''
    }
  },
  watch: {
    'params._record': {
      handler (val) {
        const _this = this
        _this.value = val[_this.params.colDef.field]
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    Vue.nextTick(() => {
      const _this = this
      if (_this.$refs.input) {
        _this.$refs.input.focus()
        $(_this.$refs.input.$el).find('input').select()
      }
    })
  }
})
