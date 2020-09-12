<style lang="less">
  @import './index.less';
</style>
<template>
  <i-select class="i-table-select" transfer-class-name="i-table-select-transfer"  v-bind="$attrs" :multiple="multiple" :filterable="filterable" ref="select" @on-change="handleChange" @on-open-change="handleOpenChange" transfer @keydown.enter.native.prevent="handleKeydown" @keydown.down.native.prevent="handleKeydown" @keydown.up.native.prevent="handleKeydown">
    <Table :max-height="240" :highlight-row="!multiple" ref="table" size="small" :columns="tableColumns" :data="tableList" @on-current-change="handleCurrentChange" @on-selection-change="handleSelectionChange"></Table>
    <slot name="prefix" slot="prefix"></slot>
  </i-select>
</template>
<script>
import Emitter from '../../mixin/emitter.js'
import { isEmpty } from '@/libs/util'

const findChild = (instance, checkFn) => {
  let match = checkFn(instance)
  if (match) return instance
  for (let i = 0, l = instance.$children.length; i < l; i++) {
    const child = instance.$children[i]
    match = findChild(child, checkFn)
    if (match) return match
  }
}
export default {
  name: 'TableSelect',
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number, Array]
    },
    valueKey: {
      type: String,
      default: 'id'
    },
    labelKey: {
      type: String,
      default: 'name'
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    maxCount: {
      type: Number,
      default: 30
    }
  },
  data () {
    return {
      currentValue: this.value,
      currentSelectedIndex: -1,
      currentSelectedList: [],
      isChangeValueInTable: false,
      isValueChangeByTable: false,
      tableList: [],
      tableColumns: [],
      query: ''
    }
  },
  watch: {
    value (val) {
      const _this = this
      if (_this.isChangeValueInTable) {
        _this.isChangeValueInTable = false
      } else {
        _this.currentValue = val
        _this.$refs.select.reset()
        _this.updateTableData(this.data, true)
        _this.handleUpdateSelectValue(val)
      }
    },
    data: {
      handler (val) {
        const _this = this
        _this.updateTableData(_this.data)
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    valueToArray () {
      return (typeof this.currentValue === 'object') ? this.currentValue : [this.currentValue]
    }
  },
  methods: {
    updateTableData (data, isInit = false) {
      const _this = this
      _this.tableList = []
      _this.currentSelectedIndex = -1
      _this.currentSelectedList = []
      if (_this.$refs.table) {
        _this.$refs.table.clearCurrentRow()
      }
      let tempTableList = []
      if (data && data.length) {
        for (let i in data) {
          let tempRecord = Object.assign({}, data[i])
          if (_this.query) {
            let tempFilterKeyList = _this.columns.map(item => item.key)
            let tempPushCheck = false
            for (let i in tempFilterKeyList) {
              if (tempRecord[tempFilterKeyList[i]] && tempRecord[tempFilterKeyList[i]].toString().indexOf(_this.query) > -1) {
                tempPushCheck = true
                break
              }
            }
            if (!tempPushCheck) {
              continue
            }
          }
          if (_this.valueToArray.includes(tempRecord[_this.valueKey])) {
            if (_this.multiple) {
              tempRecord._checked = true
              _this.currentSelectedList.push(Number(i))
            } else {
              tempRecord._highlight = true
              _this.currentSelectedIndex = Number(i)
            }
          }
          tempTableList.push(tempRecord)
        }
      }
      _this.tableList = tempTableList.slice(0, _this.maxCount)
      // Select 在 onOptionClick 方法中，如果是多选，会强制将 isFocused 设置为 true，初始时会有一个蓝框
      if (isInit) {
        _this.$refs.select.isFocused = false
      }
    },
    handleSelectionChange (selection) {
      const _this = this
      if (!_this.multiple) {
        return
      }
      _this.currentValue = selection.map(item => item[_this.valueKey])
      _this.handleUpdateSelectValue(_this.currentValue)
      _this.isChangeValueInTable = true

      _this.$emit('input', _this.currentValue)
      this.$emit('on-change', _this.currentValue)
      _this.dispatch('FormItem', 'on-form-change', _this.currentValue)
    },
    handleCurrentChange (currentRow) {
      const _this = this
      if (_this.multiple) {
        return
      }
      if (currentRow) {
        _this.currentValue = currentRow[_this.valueKey]
        _this.handleUpdateSelectValue(_this.currentValue)
        _this.isChangeValueInTable = true
        _this.$emit('input', _this.currentValue)
        _this.$emit('on-change', _this.currentValue)
        _this.dispatch('FormItem', 'on-form-change', _this.currentValue)
      }
    },
    handleUpdateSelectValue (val) {
      const _this = this
      if (isEmpty(val) || val.length === 0) {
        _this.$refs.select.reset()
      } else {
        _this.isValueChangeByTable = true
        for (let i in _this.data) {
          let tempRecord = _this.data[i]
          if ((typeof this.currentValue === 'string' && val === tempRecord[_this.valueKey]) || (typeof this.currentValue === 'object' && val.includes(tempRecord[_this.valueKey]))) {
            _this.$refs.select.onOptionClick({
              value: tempRecord[_this.valueKey],
              label: tempRecord[_this.labelKey]
            })
          }
        }
      }
    },
    handleChange (value = '') {
      const _this = this
      if (_this.isValueChangeByTable) {
        this.isValueChangeByTable = false
      } else {
        _this.currentValue = value
        _this.query = value || ''
        _this.$emit('input', value)
        _this.$emit('on-change', value)
        _this.dispatch('FormItem', 'on-form-change', value)
        _this.$refs.select.reset()
        _this.$nextTick(() => {
          _this.isValueChangeByTable = false
        })
      }
    },
    handleOpenChange (status) {
      const _this = this
      if (status) {
        const tableRef = _this.$refs.table
        _this.currentSelectedIndex = -1
        _this.currentSelectedList = []
        for (let i in tableRef.objData) {
          let tempRecord = tableRef.objData[i]
          if (_this.valueToArray.includes(tempRecord[_this.valueKey])) {
            if (_this.multiple) {
              tempRecord._checked = true
              _this.currentSelectedList.push(Number(i))
            } else {
              tempRecord._isHighlight = true
              _this.currentSelectedIndex = Number(i)
            }
          } else {
            if (_this.multiple) {
              tempRecord._checked = false
            } else {
              tempRecord._isHighlight = false
            }
          }
        }
        if (!_this.multiple) {
          _this.$nextTick(() => {
            setTimeout(() => {
              _this.focusScroll(_this.currentSelectedIndex)
            }, 600)
          })
        }
      }
      _this.$emit('on-open-change', status)
    },
    hideSelect () {
      const _this = this
      _this.$refs.select.hideMenu()
    },
    showSelect () {
      const _this = this
      _this.$refs.select.toggleMenu(null, true)
    },
    handleKeydown (e) {
      const _this = this
      const key = e.key || e.code
      const selectRef = _this.$refs.select
      if (key === 'Enter') {
        if (_this.currentSelectedIndex === -1) {
          return selectRef.hideMenu()
        }
        if (_this.$refs.table) {
          _this.$refs.table.handleCurrentRow('highlight', _this.currentSelectedIndex)
        }
      } else {
        if (selectRef.visible) {
          if (key === 'ArrowUp') {
            _this.navigateOptions(-1)
          }
          // prev
          if (key === 'ArrowDown') {
            _this.navigateOptions(1)
          }
        }
      }
    },
    navigateOptions (direction) {
      const _this = this
      const optionsLength = _this.tableList.length
      const optionsMaxIndex = optionsLength - 1
      if (optionsLength === 0) {
        return
      }
      const tableRef = _this.$refs.table
      let tempFocusIndex = -1
      if (direction > 0) {
        tempFocusIndex = _this.currentSelectedIndex + direction > optionsMaxIndex ? optionsMaxIndex : _this.currentSelectedIndex + direction
      } else {
        tempFocusIndex = _this.currentSelectedIndex + direction < 0 ? 0 : _this.currentSelectedIndex + direction
      }
      if (!_this.multiple) {
        tableRef.clearCurrentRow()
        tableRef.objData[tempFocusIndex]._isHighlight = true
        _this.currentSelectedIndex = tempFocusIndex
        _this.focusScroll(tempFocusIndex)
      }
    },
    focusScroll (index) {
      const _this = this
      const tableRef = _this.$refs.table
      if (index < 0) return
      if (!tableRef) {
        return
      }
      const optionInstance = tableRef.$refs.tbody.$children[index]
      let bottomOverflowDistance = optionInstance.$el.getBoundingClientRect().bottom - _this.$refs.table.$refs.body.getBoundingClientRect().bottom
      let topOverflowDistance = optionInstance.$el.getBoundingClientRect().top - _this.$refs.table.$refs.body.getBoundingClientRect().top
      if (bottomOverflowDistance > 0) {
        _this.$refs.table.$refs.body.scrollTop += bottomOverflowDistance
      }
      if (topOverflowDistance < 0) {
        _this.$refs.table.$refs.body.scrollTop += topOverflowDistance
      }
    }
  },
  mounted () {
    const _this = this
    let tempColumns = [..._this.columns]
    const selectRef = _this.$refs.select
    selectRef.onQueryChange = query => {
      _this.query = query || ''
      if (query.length > 0 && query !== selectRef.query) {
        if (selectRef.autoComplete) {
          let isInputFocused =
            document.hasFocus &&
            document.hasFocus() &&
            document.activeElement === selectRef.$el.querySelector('input')
          selectRef.visible = isInputFocused
        } else {
          selectRef.visible = true
        }
      }
      selectRef.query = query
      _this.updateTableData(this.data)
    }
    if (_this.multiple) {
      tempColumns.unshift({ type: 'selection', width: 60, align: 'center' })
    }
    _this.tableColumns = tempColumns
    _this.updateTableData(_this.data, true)
    _this.handleUpdateSelectValue(_this.value)
  }
}
</script>
