/**
 * 表格单元格合并
 * @type {{methods: {mergeColumn(*=, *=, *): void}}}
 */
const mixin = {
  methods: {
    mergeColumn (data, mergeColumnCount, key) {
      let tmpData = {}
      data.forEach((item) => {
        tmpData[item[key]] = tmpData[item[key]] || {}
        if (!tmpData[item[key]].rowCount) {
          item.showCell = true
          tmpData[item[key]].rowCount = 1
        } else {
          item.showCell = false
          tmpData[item[key]].rowCount++
        }
      })
      data.forEach((item) => {
        if (item.showCell) {
          item.rowCount = tmpData[item[key]].rowCount
        }
      })
      this.$nextTick(() => {
        let mergeColumn = document.getElementsByClassName('table-merge-column')
        Array.prototype.slice.call(mergeColumn, 0).forEach((item, index) => {
          if (index >= mergeColumnCount && data[Math.floor(index / mergeColumnCount) - 1].showCell === true) {
            item.setAttribute('rowspan', data[Math.floor(index / mergeColumnCount) - 1].rowCount)
          } else if (index >= mergeColumnCount) {
            item.style.display = 'none'
          }
        })
      })
    }
  }
}
export default mixin
