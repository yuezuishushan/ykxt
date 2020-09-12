import Vue from 'vue'
import $ from 'jquery'
import mixin from '../mixin'
export default Vue.extend({
  mixins: [mixin],
  template: `<Input ref="input" v-model="value" :key="params.colDef.field + params.rowIndex"/>`,
  data () {
    return {
      value: ''
    }
  },
  methods: {
    getValue () {
      return this.value
    },
    isCancelBeforeStart () {
      return this.cancelBeforeStart
    }
  },
  mounted () {
    Vue.nextTick(() => {
      const _this = this
      _this.value = _this.params.value
      if (_this.$refs.input) {
        _this.$refs.input.focus()
        $(this.$refs.input.$el).find('input').select()
        _this.getValue()
      }
    })
  },
  beforeMount () {
    const _this = this
    _this.value = _this.params.value
  }
})
