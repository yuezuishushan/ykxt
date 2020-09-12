import Vue from 'vue'
import mixin from '../mixin'
export default Vue.extend({
  mixins: [mixin],
  template: ` <DatePicker ref="datePicker" v-model="value" transfer @on-change="handleSelect"></DatePicker>`,
  data () {
    return {
      value: '',
      list: []
    }
  },
  methods: {
    handleSelect (data) {
      this.params.api.stopEditing()
    }
  },
  mounted () {
    Vue.nextTick(() => {
      if (this.$refs.datePicker) {
        this.$refs.datePicker.handleFocus()
      }
    })
  },
  beforeMount () {
    const _this = this
    _this.value = _this.params.value
  }
})
