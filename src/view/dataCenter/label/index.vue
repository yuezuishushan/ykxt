<template>
<div>
  <Form :model="listData.filter" inline :label-width="0" @submit.native.prevent="handleSearch" >
    <FormItem>
      <Button type="primary" @click="handleAdd()"> <Icon type="md-add" />新建</Button>
    </FormItem>
    <FormItem>
      <Button type="error" @click="handleDel()"><Icon type="md-trash" />删除</Button>
    </FormItem>
    <FormItem>
      <Button type="success" @click="handleEdit()"><Icon type="md-create" />编辑</Button>
    </FormItem>
    <div class="fr">
      <FormItem label="标签名称" prop="name" :label-width="100">
        <Input v-model="listData.filter.name" placeholder="单号、商品名称"></Input>
      </FormItem>
      <FormItem :label-width="0">
        <Button class="searchBtn" @click="handleSearch" :loading="listData.loading">搜索</Button>
      </FormItem>
    </div>
    <div class="tips">
      <Icon type="ios-alert" class="icon" />
      <span>已选择 {{batchOperateList.length}} 项</span>
    </div>
    <Table :loading="listData.loading" border stripe :columns="listData.columns" :data="listData.list" @on-select="handleSelectRow" @on-select-cancel="handleSelectRow" @on-select-all="handleSelectRow" @on-select-all-cancel="handleSelectRow" style="clear: both">
      <template slot="action" slot-scope="{ column, row, index }">
        <span style="color: #1890FF;cursor: pointer" @click="handleSee">查看话术列表</span>
      </template>
    </Table>
    <Page v-if="listData.total > 0"  :current="listData.filter.pageNum" :page-size="listData.filter.pageSize" :total="listData.total" show-total show-sizer show-elevator @on-change="handleChangePage" @on-page-size-change="handleChangePageSize"/>
  </Form>
  <Modal v-model="editModalData.visible" :width="640" :loading="editModalData.loading" :mask-closable="false" :title="editModalData.title" @on-ok="handleSubmit" @on-cancel="handleCancel" ok-text="保存">
    <Form ref="editModalForm" :model="editModalData.model" :rules="editModalData.rules" :label-width="120">
      <FormItem label="标签名称:" prop="labelName">
        <Input v-model="editModalData.model.labelName" ></Input>
      </FormItem>
      <FormItem prop="depict" label="描述:" >
        <Input type="textarea" v-model="editModalData.model.depict"></Input>
      </FormItem>
    </Form>
  </Modal>
</div>
</template>
<script>
import { getLabelList, getTabelDetail, updateLabel, addLable, deleteLable } from '@/api/dataCenter/label'
export default {
  name: 'dataCenterLabel',
  data () {
    return {
      listData: {
        filter: {
          storeId: '',
          beginBillDate: '',
          endBillDate: '',
          name: '',
          pageSize: 10,
          pageNum: 1,
          status: 0
        },
        list: [],
        columns: [
          {
            type: 'selection',
            width: 50,
            align: 'center'
          },
          {
            title: '标签名称',
            key: 'labelName',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '话术数量',
            key: 'countVerbal',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '描述',
            key: 'depict',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '创建时间',
            key: 'createTime',
            tooltip: true,
            sortable: true,
            minWidth: 100
          },
          {
            title: '操作',
            slot: 'action',
            tooltip: true,
            minWidth: 100
          }
        ],
        total: 0
      },
      batchOperateList: [],
      editModalData: {
        visible: false,
        title: '',
        loading: true,
        model: {
          labelId: '',
          depict: '',
          labelName: ''
        },
        rules: {
          labelName: [{ required: true, message: '请输入标签名字', trigger: 'blur' }]
        }
      }
    }
  },
  methods: {
    initView () {
      let _this = this
      _this.loadList()
    },
    loadList () {
      let _this = this
      _this.listData.loading = true
      let tempSubmit = _this.listData.filter
      _this.listData.list = []
      getLabelList(tempSubmit).then(res => {
        _this.listData.loading = false
        let tempData = res.data.records
        _this.listData.list = tempData
        _this.listData.total = res.data.total
      }).catch(() => {
        _this.listData.loading = false
      })
    },
    handleChangePage (page) {
      let _this = this
      _this.listData.filter.pageNum = page
      _this.loadList()
    },
    handleChangePageSize (pageSize) {
      let _this = this
      _this.listData.filter.pageSize = pageSize
      _this.loadList()
    },
    handleAdd () {
      let _this = this
      _this.restLabel()
      _this.editModalData.title = '新增标签'
      _this.editModalData.visible = true
    },
    handleSee () {
      let _this = this
      _this.$router.push({ name: 'dataCenterTalkingSkills' })
    },
    handleSearch () {
      let _this = this
      _this.listData.filter.pageNum = 1
      _this.loadList()
    },
    handleCancel () {
      let _this = this
      _this.restLabel()
      _this.editModalData.visible = false
    },
    handleSubmit () {
      let _this = this
      _this.$refs['editModalForm'].validate((valid) => {
        if (valid) {
          if ( _this.editModalData.model.labelId !== '') {
            _this.updateSubmit()
          } else {
            _this.addSubmit()
          }
        } else {
          _this.editModalData.loading = false
          _this.$nextTick(() => {
            _this.editModalData.loading = true
          })
        }
      })
    },
    updateSubmit() {
      let _this = this
      let tempSubmit = Object.assign({}, _this.editModalData.model)
      delete tempSubmit.labelId
      updateLabel( _this.editModalData.model.labelId, tempSubmit).then(res => {
        _this.$Message.success('保存成功')
        _this.editModalData.visible = false
        _this.loadList()
      }).catch(() => {
        _this.editModalData.loading = false
        _this.$nextTick(() => {
          _this.editModalData.loading = true
        })
      })
    },
    addSubmit() {
      let _this = this
      let tempSubmit = Object.assign({}, _this.editModalData.model)
      delete tempSubmit.labelId
      addLable(tempSubmit).then(res => {
        _this.$Message.success('保存成功')
        _this.editModalData.visible = false
        _this.loadList()
      }).catch(() => {
        _this.editModalData.loading = false
        _this.$nextTick(() => {
          _this.editModalData.loading = true
        })
      })
    },
    handleSelectRow (selection) {
      let _this = this
      _this.batchOperateList = []
      for (let i in selection) {
        _this.batchOperateList.push(selection[i])
      }
    },
    handleEdit() {
      let _this = this
      if (_this.batchOperateList.length === 0) {
        _this.$Message.warning('未选择数据')
        return
      }
      if (_this.batchOperateList.length > 1) {
        _this.$Message.warning('只能进行单选编辑')
        return
      }
      _this.restLabel()
      _this.editModalData.title = '编辑标签'
      _this.listData.loading = true
      getTabelDetail(_this.batchOperateList[0].labelId).then(res => {
        _this.listData.loading = false
        _this.editModalData.model.labelId = res.data.labelId
        _this.editModalData.model.labelName = res.data.labelName
        _this.editModalData.model.depict = res.data.depict
        _this.editModalData.visible = true
      }).catch(() => {
        _this.listData.loading = false
      })
    },
    restLabel() {
      let _this = this
      _this.editModalData.model = {
        labelId: '',
        depict: '',
        labelName: ''
      }
      _this.$refs['editModalForm'].resetFields()
    },
    handleDel() {
      let _this = this
      let tempTips = ''
      let tempFormData = []
      if (_this.batchOperateList.length === 0) {
        _this.$Message.warning('未选择数据')
        return
      }
      tempTips = `删除的数据将不能恢复?`
      for (let i in _this.batchOperateList) {
        tempFormData.push(_this.batchOperateList[i].labelId)
      }
      _this.$Modal.confirm({
        title: '提示',
        content: tempTips,
        onOk: () => {
          deleteLable(tempFormData).then(res => {
            _this.$Message.success('删除成功')
            _this.loadList()
          })
        }
      })
    },
  },
  mounted () {
    let _this = this
    _this.initView()
  }
}
</script>
