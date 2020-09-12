import Vue from 'vue'
import $ from 'jquery'
import { getCacheWarehouse } from '@/api/common'
import mixin from '../mixin'

export default Vue.extend({
  mixins: [mixin],
  template: `<TreeSelect ref="treeSelect" v-model="value" :data="list" transfer @on-change="handleChange"></TreeSelect>`,
  data () {
    return {
      value: '',
      list: [],
      modeStockId: '',
      disabledList: []
    }
  },
  methods: {
    handleChange (data) {
      this.params.api.stopEditing()
    }
  },
  mounted () {
    Vue.nextTick(() => {
      if (this.$refs.treeSelect) {
        $(this.$refs.treeSelect.$el).find('.ivu-select-selection').focus()
        this.$refs.treeSelect.$refs.select.toggleMenu(null, true)
      }
    })
  },
  beforeMount () {
    const _this = this
    if (_this.params.colDef.disabledList) {
      _this.disabledList = _this.params.colDef.disabledList() || []
    } else {
      _this.disabledList = []
    }
    _this.value = _this.params.value
    const formatTree = (item) => {
      let tempObj = { title: item.name, id: item.id, value: item.id, parentId: item.parentId, number: item.number, expand: true, selected: false, disabled: _this.disabledList.includes(item.id) }
      if (item.children && item.children.length > 0) {
        tempObj.children = []
        for (let i in item.children) {
          tempObj.children.push(formatTree(item.children[i]))
        }
      }
      return tempObj
    }
    _this.list = []

    if (_this.params.data.warehouseList) {
      _this.list = [..._this.params.data.warehouseList]
    } else {
      getCacheWarehouse({ storeId: _this.globalUserData.storeId }).then(res => {
        let tempData = res
        for (let i in tempData) {
          _this.list.push(formatTree(tempData[i]))
        }
      })
    }
  }
})
