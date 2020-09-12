import Vue from 'vue'
import { getProductBatchPoList } from '@/api/common'
import TableSelect from '_c/tableSelect'
import mixin from '../mixin'
import $ from 'jquery'

export default Vue.extend({
  components: { TableSelect },
  mixins: [mixin],
  template: `
    <Input ref="input" v-if="mode === 'create'" v-model="value" :key="params.colDef.field + params.rowIndex"></Input>
    <TableSelect v-else ref="tableSelect" v-model="value" valueKey="batchNo" :data="list" filterable :columns="columns" @on-change="handleSelect" :key="params.colDef.field + params.rowIndex">
        <Icon slot="prefix" type="ios-more" @click.stop="handleSelectBatchNoByModal()"/>
    </TableSelect>`,
  data () {
    return {
      value: '',
      mode: '',
      list: [],
      columns: [
        {
          title: '仓库',
          key: 'stockName',
          width: 100
        },
        {
          title: '批次号',
          key: 'batchNo',
          width: 200
        }
      ]
    }
  },
  methods: {
    handleSelect (data) {
      const _this = this
      if (_this.params.colDef.callback) {
        for (let i in _this.list) {
          let tempRecord = _this.list[i]
          if (tempRecord.batchNo === data) {
            _this.params.colDef.callback(_this.params, tempRecord)
            break
          }
        }
      }
      _this.params.api.stopEditing()
    },
    handleSelectBatchNoByModal () {
      const _this = this
      _this.params.api.stopEditing()
      if (_this.params.colDef.cellRendererParams.onCellSelectSelectBatchNoByModal) {
        _this.params.colDef.cellRendererParams.onCellSelectSelectBatchNoByModal(_this.params.rowIndex)
      }
    }
  },
  mounted () {
    Vue.nextTick(() => {
      const _this = this
      if (_this.mode === 'create') {
        if (_this.$refs.input) {
          _this.$refs.input.focus()
          $(this.$refs.input.$el).find('input').select()
          _this.getValue()
        }
      } else {
        if (_this.$refs.tableSelect) {
          _this.$refs.tableSelect.showSelect()
        }
      }
    })
  },
  beforeMount () {
    const _this = this
    _this.mode = _this.params.colDef.mode
    if (_this.mode !== 'create') {
      let tempFilter = _this.params.colDef.dataFilter(_this.params) || {}
      if (!tempFilter.itemId || !tempFilter.stockId) {
        return
      }
      getProductBatchPoList(tempFilter, true).then(res => {
        let tempData = res.data
        _this.list = tempData
        _this.value = _this.params.value
      })
    } else {
      _this.value = _this.params.value
    }
  }
})
