import Vue from 'vue'

export default Vue.extend({
  template: `
        <span style="font-weight: bold;">{{value}}</span>
    `,
  data () {
    return {
      value: ''
    }
  },
  beforeMount () {
    const _this = this
    if (_this.params.colDef.summary) {
      _this.value = _this.params.value
    } else {
      _this.value = ''
    }
  }
})
