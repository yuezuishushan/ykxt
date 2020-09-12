/**
 * 表格编辑相关方法
 * 调用页面中定义:
 *    data () {
 *      summaryTable(是否显示合计列)
 *    },
 *    computed: {
 *      editTableRef(可编辑表格对应ref),
 *      editTableDefaultRecord(每行默认数据)
 *      editTableData(数据源),
 *      editTableColumns(可编辑表格所有列),
 *      editColumnsStatus(可编辑字段当前状态)
 *    }
 * 页面表格columns添加editable: true, className: 'editable'
 * disabledVisible:设置不让操作列显示隐藏
 * destroy:设置销毁当前列
 * Table添加edit-table样式
 */
import numberDecimal from '@/filter/module/numberDecimal'
import TablesActionRow from '_c/table-action/row'
import TablesActionColumn from '_c/table-action/column'
import { accAdd } from '@/libs/math'
import { isEmpty } from '@/libs/util'
import $ from 'jquery'
const mixin = {
  components: {
    TablesActionRow,
    TablesActionColumn
  },
  data () {
    return {
      columnModal: {
        visible: false,
        title: '表格列配置',
        columns: [
          {
            title: '列名称',
            key: 'name',
            render: (h, params) => {
              let _this = this
              return h('div', _this.editTableColumns[params.row.key].content.defaultTitle)
            }
          },
          {
            title: '别名',
            key: 'alias',
            editable: true,
            className: 'editable',
            render: (h, params) => {
              let _this = this
              return h('Input', {
                props: {
                  size: 'small',
                  value: _this.editTableColumns[params.row.key].content.title
                },
                on: {
                  input: function (event) {
                    self.value = event
                    _this.editTableColumns[params.row.key].content.title = event
                  }
                }
              })
            }
          },
          {
            title: '是否显示',
            key: 'isVisible',
            render: (h, params) => {
              let _this = this
              return h('i-switch', {
                props: {
                  size: 'small',
                  value: _this.editTableColumns[params.row.key].visible,
                  disabled: !!_this.editTableColumns[params.row.key].disabledVisible
                },
                on: {
                  'on-change': (event) => {
                    self.value = event
                    _this.editTableColumns[params.row.key].visible = event
                  }
                }
              })
            }
          }
        ],
        list: [],
        selectedRow: null
      },
      summaryColumns: [],
      cloneColumns: null,
      editRow: -1
    }
  },
  computed: {
    visibleColumns () {
      let _this = this
      let tempColumns = []
      let tempColumnsDataArr = Object.keys(_this.editTableColumns).map(key => _this.editTableColumns[key]).sort(_this.compare('sort'))
      for (let i in tempColumnsDataArr) {
        if (tempColumnsDataArr[i].visible && !tempColumnsDataArr[i].destroy) {
          tempColumns.push(tempColumnsDataArr[i].content)
        }
      }
      return tempColumns
    },
    summaryData () {
      let _this = this
      if (!_this.summaryTable) {
        return []
      }
      let tempSummaryData = []
      let summaryField = {}
      for (let key in _this.editTableColumns) {
        if (_this.editTableColumns[key].summary) {
          summaryField[key] = _this.editTableColumns[key].fixed || 0
        }
      }

      let tempSummaryRecord = { rowIndex: '合计' }
      for (let i in _this.editTableData) {
        for (let key in summaryField) {
          tempSummaryRecord[key] = accAdd((tempSummaryRecord[key] || 0), (Number(_this.editTableData[i][key]) || 0))
        }
      }
      tempSummaryData.push(tempSummaryRecord)
      return tempSummaryData
    }
  },
  watch: {
    'columnModal.visible' (val) {
      let _this = this
      _this.columnModal.list = []
      if (val) {
        let tempColumnsDataArr = Object.keys(_this.editTableColumns).map(key => _this.editTableColumns[key]).sort(_this.compare('sort'))
        for (let i in tempColumnsDataArr) {
          if (tempColumnsDataArr[i].editColumn && !tempColumnsDataArr[i].destroy) {
            _this.columnModal.list.push({ key: tempColumnsDataArr[i].key, editStatus: { alias: false } })
          }
        }
      }
    },
    visibleColumns: {
      handler () {
        let _this = this
        _this.summaryTableFun()
      },
      immediate: true,
      deep: true
    },
    editTableData: {
      handler () {
        let _this = this
        _this.summaryTableFun()
      },
      immediate: true,
      deep: true
    },
    cloneColumns: {
      handler () {
        let _this = this
        _this.$nextTick(() => {
          _this.summaryTableFun()
        })
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleViewClick (e) {
      let _this = this
      if ($(e.target).parents('td.editable').length === 0) {
        for (let i in _this.editTableData) {
          for (let key in _this.editTableData[i].editStatus) {
            _this.editTableData[i].editStatus[key] = false
          }
        }
      }
    },
    handleFocus (props) {
      let _this = this
      for (let i in _this.editTableData) {
        for (let key in _this.editTableData[i].editStatus) {
          _this.editTableData[i].editStatus[key] = false
        }
      }
      if (props && props.row && props.row.editStatus) {
        props.row.editStatus[props.column.key] = true
        _this.editRow = props.index
      }
    },
    handleKey (props) {
      let _this = this
      for (let i in _this.editTableData) {
        for (let key in _this.editTableData[i].editStatus) {
          _this.editTableData[i].editStatus[key] = false
        }
      }
      let firstField = ''
      let nextToCheck = false
      for (let i in _this.$refs[_this.editTableRef].columns) {
        let tempColumnRecord = _this.$refs[_this.editTableRef].columns[i]
        if (tempColumnRecord.editable) {
          if (nextToCheck) {
            _this.editTableData[props.index].editStatus[tempColumnRecord.key] = true
            _this.editRow = props.index
            nextToCheck = false
            break
          }
          if (firstField === '') {
            firstField = tempColumnRecord.key
          }
          if (tempColumnRecord.key === props.column.key) {
            nextToCheck = true
          }
        }
      }
      if (nextToCheck) {
        if (props.index >= _this.editTableData.length - 1) {
          _this.handleAddRow({ lastPos: true })
        }
        _this.editTableData[props.index + 1].editStatus[firstField] = true
        _this.editRow = props.index + 1
      }
    },
    handleAddRow (props) {
      let _this = this
      if (props.lastPos) {
        _this.editTableData.push({ editStatus: _this.editColumnsStatus })
      } else {
        let tempRecord = Object.assign({}, _this.editTableDefaultRecord || {}, props.item || { editStatus: _this.editColumnsStatus })
        _this.editTableData.splice(props.index + 1, 0, tempRecord)
      }
    },
    handleRemoveRow (props) {
      let _this = this
      if (_this.editTableData.length > 1) {
        _this.editTableData.splice(props.index, 1)
      }
    },
    compare (property) {
      return function (a, b) {
        let value1 = a[property]
        let value2 = b[property]
        return value1 - value2
      }
    },
    exchangeItems (arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0]
      return arr
    },
    summaryTableFun () {
      let _this = this
      if (_this.summaryTable) {
        let tempSummaryColumns = []
        _this.$nextTick(() => {
          let tempEditTable = _this.$refs[_this.editTableRef]
          if (tempEditTable && tempEditTable.cloneColumns) {
            for (let i in tempEditTable.cloneColumns) {
              let tempColumnRecord = tempEditTable.cloneColumns[i]
              let tempColumn = {
                title: tempColumnRecord.title,
                width: tempColumnRecord._width,
                key: tempColumnRecord.key,
                tooltip: true,
                align: tempColumnRecord.align
              }
              if (tempColumnRecord.key !== 'rowIndex') {
                tempColumn.render = (h, params) => {
                  let tempStr = isEmpty(params.row[tempColumnRecord.key]) ? '' : isEmpty(tempColumnRecord.fixed) ? params.row[tempColumnRecord.key] : numberDecimal(params.row[tempColumnRecord.key], tempColumnRecord.fixed)
                  return h('div', tempStr)
                }
              }
              tempSummaryColumns.push(tempColumn)
            }
          }
          _this.summaryColumns = tempSummaryColumns
        })
      }
    },
    handleSummary () {
      let _this = this
      _this.$nextTick(() => {
        _this.editTableData.splice(0, 0)
      })
    },
    selectedColumnModalRow (currentRow, index) {
      let _this = this
      let tempRowData = {
        index: index,
        key: currentRow.key
      }
      _this.columnModal.selectedRow = tempRowData
    },
    handleEditTableSort (sortType) {
      let _this = this
      if (_this.columnModal.selectedRow !== null) {
        let currModalIndex = _this.columnModal.selectedRow.index
        let nextModalIndex = null
        if (sortType === 'up') {
          if (currModalIndex > 0) {
            nextModalIndex = currModalIndex - 1
          }
        } else if (sortType === 'down') {
          if (currModalIndex < _this.columnModal.list.length - 1) {
            nextModalIndex = currModalIndex + 1
          }
        }
        if (nextModalIndex !== null) {
          for (let i in _this.columnModal.list) {
            _this.columnModal.list[i]._highlight = false
          }
          _this.exchangeItems(_this.columnModal.list, currModalIndex, nextModalIndex)
          _this.columnModal.selectedRow.index = nextModalIndex
          _this.columnModal.list[nextModalIndex]._highlight = true
        }

        let tempColumnsDataArr = Object.keys(_this.editTableColumns).map(key => _this.editTableColumns[key]).sort(_this.compare('sort'))
        for (let i in tempColumnsDataArr) {
          if (tempColumnsDataArr[i].content.key === _this.columnModal.selectedRow.key) {
            let tempIndex = Number(i)
            if (sortType === 'up') {
              if (tempIndex > 1) {
                _this.editTableColumns[tempColumnsDataArr[tempIndex].key].sort = tempIndex - 1
                _this.editTableColumns[tempColumnsDataArr[tempIndex - 1].key].sort = tempIndex
              }
            } else if (sortType === 'down') {
              if (tempIndex < tempColumnsDataArr.length - 1) {
                _this.editTableColumns[tempColumnsDataArr[tempIndex].key].sort = tempIndex + 1
                _this.editTableColumns[tempColumnsDataArr[tempIndex + 1].key].sort = tempIndex
              }
            }
            break
          }
        }
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      $(document).on('click', '#app', vm.handleViewClick)
    })
  },
  beforeRouteLeave (to, from, next) {
    let _this = this
    $(document).unbind('click', _this.handleViewClick)
    next()
  },
  mounted () {
    let _this = this
    let tempEditTable = _this.$refs[_this.editTableRef]
    if (tempEditTable && tempEditTable.cloneColumns) {
      _this.cloneColumns = tempEditTable.cloneColumns
    }
  }
}

export default mixin
