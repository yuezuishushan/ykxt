<style lang="less" scoped>
  @import './index.less';
</style>
<template>
  <div>
    <Modal v-model="insideColumnModal.visible" :title="insideColumnModal.title">
      <Row>
        <Col :span="20">
          <Table ref="modalTable" size="small" :height="320" highlight-row :columns="insideColumnModal.columns" :data="insideColumnModal.list" @on-row-click="selectedColumnModalRow"></Table>
          <div class="sort-action">
            <Button type="primary" size="small" icon="md-arrow-up" @click="handleEditTableSort('up')"></Button>
            <Button type="primary" size="small" icon="md-arrow-down" @click="handleEditTableSort('down')"></Button>
          </div>
        </Col>
      </Row>
      <div slot="footer" style="text-align: right;">
        <Button type="primary" @click="insideColumnModal.visible = false">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'TablesActionColumn',
  props: {
    value: {
      type: Object,
      default () {
        return {
          visible: false,
          title: '表格列配置',
          columns: {},
          list: [],
          selectedRow: null
        }
      }
    }
  },
  data () {
    return {
      insideColumnModal: {}
    }
  },
  methods: {
    handleEditTableSort (sortType) {
      this.$emit('on-sort', sortType)
    },
    selectedColumnModalRow (currentRow, index) {
      this.$emit('on-selected-column', currentRow, index)
    }
  },
  watch: {
    value: {
      handler (val) {
        this.insideColumnModal = val
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
