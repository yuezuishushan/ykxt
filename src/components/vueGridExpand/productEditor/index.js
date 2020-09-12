import Vue from 'vue'
import TableSelect from '_c/tableSelect'
import { getCacheProduct, getCacheDeliveryProduct } from '@/api/common'
import mixin from '../mixin'

export default Vue.extend({
  mixins: [mixin],
  components: { TableSelect },
  template: `
    <TableSelect ref="productTableSelectRef" v-model="value" valueKey="auxPropGroupId" :data="list" filterable :columns="caleColumns" @on-change="handleSelect" :maxCount="25">
        <Icon slot="prefix" type="ios-more" @click.stop="handleSelectProductByModal()"/>
    </TableSelect>`,
  data () {
    return {
      value: '',
      list: [],
      columns: [
        {
          title: '助记码',
          key: 'code',
          minWidth: 100
        },
        {
          title: '产品名称',
          key: 'name',
          minWidth: 200
        },
        {
          title: '产品属性',
          key: 'productAuxProp',
          minWidth: 120
        }
      ],
      mode: 'STOCK'
    }
  },
  computed: {
    caleColumns () {
      let tempList = [...this.columns]
      if (this.mode === 'DELIVERY') {
        tempList.push({
          title: '库存',
          key: 'actQty',
          tooltip: true,
          width: 100
        })
      }
      return tempList
    }
  },
  methods: {
    handleSelect (data) {
      const _this = this
      if (!_this.isEmpty(data)) {
        for (let i in _this.list) {
          if (_this.list[i].auxPropGroupId === data) {
            _this.params.data.productName = _this.list[i].name
            break
          }
        }
      }
      _this.params.api.stopEditing()
    },
    handleSelectProductByModal () {
      const _this = this
      _this.params.api.stopEditing()
      if (_this.params.colDef.cellRendererParams.onCellSelectProductByModal) {
        _this.params.colDef.cellRendererParams.onCellSelectProductByModal(_this.params.rowIndex)
      }
    }
  },
  mounted () {
    Vue.nextTick(() => {
      const _this = this
      if (_this.$refs.productTableSelectRef) {
        _this.$refs.productTableSelectRef.showSelect()
        _this.$refs.productTableSelectRef.$refs.select.isFocused = true
      }
    })
  },
  beforeMount () {
    const _this = this
    _this.mode = _this.params.colDef.mode || 'STOCK'
    let tempApi = _this.mode === 'STOCK' ? getCacheProduct : getCacheDeliveryProduct
    tempApi().then(res => {
      _this.list = res
      _this.value = _this.params.value
    })
  }
})
