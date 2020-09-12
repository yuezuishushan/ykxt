import { AgGridVue } from '@ag-grid-community/vue'
// import { AllModules } from '@ag-grid-enterprise/all-modules'
import { AllCommunityModules } from '@ag-grid-community/all-modules'

/**
 * 使用方法
 *  引用页定义：
 *  <ag-grid-vue class="ag-theme-alpine" :gridOptions="gridOptions" :columnDefs="columns" :rowData="list" @gridReady="onGridReady" :modules="agGridModules" :pinnedBottomRowData="[summaryData]"></ag-grid-vue>
 *    data () {
 *      return {
 *        columns: [],  //表格字段
 *        list: [],   //列表数据
 *        summaryData: {}, //合计
 *        gridOptions: null //表格配置
 *      }
 *    }
 *    computed: {
 *      editTableData () {  :列表数据
 *        return this.list
 *      }
 *      editTableDefaultRecord: {}  默认字段(填写需要编辑的字段)
 *    },
 *    beforeMount () {
 *      this.gridOptions = {
 *        stopEditingWhenGridLosesFocus: true, //输入框失去焦点退出编辑
 *        defaultColDef: {}, //字段默认配置
 *        frameworkComponents: {}, //cell引用的组件
 *        onCellEditingStopped: event => {}, //停止编辑后调用方法
 *      }
 *    }
 *
 *
 * @type {{components: {AgGridVue: *}, data(): *, methods: {onGridReady(*): void, caleEditable(*): boolean, handleRemoveRow(*): void, handleAddRow(*): void}}}
 */
const mixin = {
  components: { AgGridVue },
  data () {
    return {
      agGridModules: AllCommunityModules
    }
  },
  methods: {
    onGridReady (params) {
      params.api.sizeColumnsToFit()
    },
    handleAddRow (props) {
      let _this = this
      if (props.lastPos) {
        _this.editTableData.push(Object.assign({}, _this.editTableDefaultRecord))
      } else {
        _this.editTableData.splice(props.index + 1, 0, Object.assign({}, _this.editTableDefaultRecord))
      }
    },
    handleRemoveRow (props) {
      let _this = this
      if (_this.editTableData.length > 1) {
        _this.editTableData.splice(props.index, 1)
      }
    },
    caleEditable (item) {
      if (item.node.rowPinned) {
        return false
      }
      return true
    },
    calcCellClass (params) {
      let tempCheck = false
      if (params.colDef.editable) {
        if (typeof params.colDef.editable === 'boolean') {
          tempCheck = params.colDef.editable
        } else if (typeof params.colDef.editable === 'function') {
          tempCheck = params.colDef.editable(params)
        }
      }
      return tempCheck ? 'ag-cell-custom-edit' : ''
    }
  }
}

export default mixin
