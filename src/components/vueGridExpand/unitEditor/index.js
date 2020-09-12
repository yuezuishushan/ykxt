import Vue from 'vue'
import $ from 'jquery'
import mixin from '../mixin'
export default Vue.extend({
  mixins: [mixin],
  template: `
    <Select ref="select" id="select" v-model="value" transfer @on-change="handleSelect">
        <Option v-for="item in list" :value="item.unitId" :key="item.unitId">{{item.unitName}}</Option>
    </Select>`,
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
      if (this.$refs.select) {
        $(this.$refs.select.$el).find('.ivu-select-selection').focus()
        this.$refs.select.toggleMenu(null, true)
      }
    })
  },
  beforeMount () {
    const _this = this
    _this.list = _this.params.data.unitList
    _this.value = _this.params.value
  }
})
