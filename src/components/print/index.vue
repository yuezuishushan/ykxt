<style lang="less">
  @import './index.less';
</style>
<template>
  <Modal title="打印" v-model="visible">
    <Form :label-width="120">
      <FormItem label="选择模板">
        <Select v-model="templateId">
          <Option v-for="item in list" :key="item.id" :value="item.id">{{item.name}}</Option>
        </Select>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="error" v-if="wsMessage && wsMessage.data && wsMessage.data.design" @click="handlePrint('DESIGN')">设计</Button>
      <Button type="info" @click="handlePrint('PREVIEW')">预览</Button>
      <Button type="primary" @click="handlePrint('PRINT')">打印</Button>
    </div>
  </Modal>
</template>
<script>
import { getBillPrintTemplate } from '@/api/setting/print'
import { mapState } from 'vuex'
const CMD = {
  PRINT: 12,
  PREVIEW: 13,
  DESIGN: 14
}
export default {
  name: 'print',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    acctType: { // 单据类型（0：单据， 1：列表）
      type: Number,
      default: null
    },
    tranType: { // 单据BillId
      type: Number,
      default: null
    },
    variable: {
      type: Array,
      default: () => {
        return []
      }
    },
    dataSet: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      visible: false,
      list: [],
      templateId: '',
      printData: {
        loading: false,
        model: {
          Cmd: '',
          Template: '',
          Variable: [],
          DataSet: []
        }
      }
    }
  },
  computed: {
    ...mapState({
      wsMessage: state => state.app.wsMessage
    })
  },
  watch: {
    value: {
      handler (newVal) {
        let _this = this
        if (newVal) {
          _this.loadList()
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    loadList () {
      const _this = this
      if (_this.isEmpty(_this.acctType) || _this.isEmpty(_this.tranType)) {
        return
      }
      let tempFilter = {
        acctType: _this.acctType,
        tranType: _this.tranType
      }
      _this.visible = false
      _this.list = []
      getBillPrintTemplate(tempFilter, true).then(res => {
        let tempData = res.data
        if (tempData.length) {
          for (let i in tempData) {
            if (tempData[i].def === 1) {
              _this.templateId = tempData[i].id
            }
            _this.list.push(Object.assign({}, tempData[i]))
          }
          _this.visible = true
        } else {
          _this.$Message.warning('无可用模板')
          _this.$emit('input', false)
        }
      }).catch(() => {
        _this.$emit('input', false)
      })
    },
    handlePrint (cmd) {
      const _this = this
      if (_this.isEmpty(_this.templateId)) {
        _this.$Message.warning('请选择模板')
        return
      }
      let tempPrintData = Object.assign({}, _this.printData.model)
      tempPrintData.Cmd = CMD[cmd]
      for (let i in _this.list) {
        if (_this.list[i].id === _this.templateId) {
          tempPrintData.Template = _this.list[i].url
          break
        }
      }
      tempPrintData.Variable = [..._this.variable]
      tempPrintData.DataSet = [..._this.dataSet]
      _this.$setWs.wsSend(JSON.stringify(tempPrintData))
    }
  }
}
</script>
