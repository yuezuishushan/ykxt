<template>
<div>
  <Form :model="listData.filter" inline :label-width="0" @submit.native.prevent="handleSearch" >
    <FormItem>
      <Button type="primary" @click="handleAdd()"> <Icon type="md-add" />新建</Button>
    </FormItem>
    <FormItem>
      <Button type="success" @click="handleDel()"><Icon type="md-add" />贴标签</Button>
    </FormItem>
    <FormItem>
      <Button type="error" @click="handleBatchDel()"><Icon type="md-remove" />删除</Button>
    </FormItem>
    <div class="fr">
      <FormItem label="话术内容:" prop="content" :label-width="100">
        <Input v-model="listData.filter.content" placeholder="请输入话术内容模糊内容"></Input>
      </FormItem>
      <FormItem label="标签" prop="labelId" :label-width="60">
        <Select v-model="listData.filter.labelId"  style="width: 120px">
          <Option  :value="-1" :key="-1">全部</Option>
          <Option v-for="item in listData.labelList" :value="item.labelId" :key="item.labelId">{{ item.labelName }}</Option>
        </Select>
      </FormItem>
      <FormItem :label-width="0">
        <Button @click="handleSearch" :loading="listData.loading">搜索</Button>
      </FormItem>
    </div>
    <div class="tips">
      <Icon type="ios-alert" class="icon" />
      <span>已选择 {{batchOperateList.length}} 项</span>
    </div>
    <Table :loading="listData.loading" border stripe :columns="listData.columns" :data="listData.list" @on-select="handleSelectRow" @on-select-cancel="handleSelectRow" @on-select-all="handleSelectRow" @on-select-all-cancel="handleSelectRow"  style="clear: both">
      <template slot="labelGroup" slot-scope="{ column, row, index }">
        <Dropdown v-if="row.labelGroup !== null" transfer>
          <a href="javascript:void(0)">
            {{row.labelGroup[0]}}
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list" v-for="(item, index) in row.labelGroup" :key="index">
            <DropdownItem v-if="index > 0">{{item}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </template>
      <template slot="action" slot-scope="{ column, row, index }">
        <div class="action">
          <div @click="handleEdit(row)">编辑</div>
          <div @click="handleDel(row)">删除</div>
        </div>
      </template>
    </Table>
  </Form>
  <Modal v-model="editModalData.visible" :width="640" :loading="editModalData.loading" :mask-closable="false" :title="editModalData.title" @on-ok="handleSubmit" @on-cancel="handleCancel" ok-text="保存">
    <Form ref="editModalForm" :model="editModalData.model" :rules="editModalData.rules" :label-width="120">
      <FormItem label="话术内容:" prop="content">
        <Input v-model="editModalData.model.content" ></Input>
      </FormItem>
      <FormItem label="标签" prop="labelIds" >
        <Select v-model="editModalData.model.labelIds" multiple style="width:100%">
          <Option v-for="item in listData.labelList" :value="item.labelId" :key="item.labelId">{{ item.labelName }}</Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</div>
</template>
<script>
import { getVerbalList, findLabelList, addVerbal, updateVerbal, getVerbalDetail, deleteVerbal, deleteBatchVerbal } from '@/api/dataCenter/talkingSkills'
export default {
  name: 'dataCenterTalkingSkills',
  data () {
    return {
      listData: {
        filter: {
          pageSize: 10,
          pageNum: 1,
          labelId: '',
          content: ''
        },
        list: [],
        labelList: [],
        columns: [
          {
            type: 'selection',
            width: 50,
            align: 'center'
          },
          {
            title: '话术内容',
            key: 'content',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '标签分组',
            slot: 'labelGroup',
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
          content: '',
          labelIds: [],
          verbalId: ''
        },
        rules: {
          content: [{ required: true, message: '请输入话术名称', trigger: 'blur' }]
        }
      }
    }
  },
  methods: {
    initView () {
      let _this = this
      _this.loadLabel()
      _this.loadList()
    },
    loadLabel() {
      let _this = this
      _this.listData.list = []
      findLabelList(true).then(res => {
        _this.listData.labelList = res.data
      }).catch(() => {
      })
    },
    loadList () {
      let _this = this
      _this.listData.loading = true
      let tempSubmit = _this.listData.filter
      if (_this.listData.filter.labelId === -1) {
        tempSubmit.labelId = ''
      }
      _this.listData.list = []
      getVerbalList(tempSubmit).then(res => {
        let tempData = res.data.records
        for (let i in tempData) {
          let tempRecord = tempData[i]
          if (tempRecord.labelGroup !== null) {
            tempRecord.labelGroup = tempData[i].labelGroup.split(',')
          }
          _this.listData.list.push(tempRecord)
        }
        _this.listData.total = res.data.total
        _this.listData.loading = false
      }).catch(() => {
        _this.listData.loading = false
      })
    },
    handleDel (item) {
      let _this = this
      let tempTips = ''
      let tempFormData = []
      if (item) {
        tempTips = `删除的数据将不能恢复,确认删除数据?`
      }
      _this.$Modal.confirm({
        title: '提示',
        content: tempTips,
        onOk: () => {
          deleteVerbal(item.verbalId).then(res => {
            _this.$Message.success('删除成功')
            _this.loadList()
          })
        }
      })
    },
    handleBatchDel () {
      let _this = this
      let tempTips = ''
      let tempFormData = []
      if (_this.batchOperateList.length === 0) {
        _this.$Message.warning('未选择数据')
        return
      }
      tempTips = `删除的数据将不能恢复,确认删除选中数据?`
      for (let i in _this.batchOperateList) {
        tempFormData.push(_this.batchOperateList[i].verbalId)
      }
      _this.$Modal.confirm({
        title: '提示',
        content: tempTips,
        onOk: () => {
          deleteBatchVerbal(tempFormData).then(res => {
            _this.$Message.success('删除成功')
            _this.loadList()
          })
        }
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
      _this.restVerbal()
      _this.editModalData.visible = true
      _this.editModalData.title = '新增话术'
    },
    handleEdit(item) {
      let _this = this
      _this.restVerbal()
      _this.editModalData.title = '编辑话术'
      _this.listData.loading = true
      getVerbalDetail(item.verbalId).then(res => {
        _this.listData.loading = false
        _this.editModalData.model.verbalId = res.data.verbalId
        _this.editModalData.model.content = res.data.content
        _this.editModalData.model.labelIds = res.data.labelIds
        _this.editModalData.visible = true
      }).catch(() => {
        _this.listData.loading = false
      })
    },
    handleSelectRow (selection) {
      let _this = this
      _this.batchOperateList = []
      for (let i in selection) {
        _this.batchOperateList.push(selection[i])
      }
    },
    handleSearch () {
      let _this = this
      _this.listData.filter.pageNum = 1
      _this.loadList()
    },
    handleCancel () {
      let _this = this
      _this.restVerbal()
    },
    handleSubmit () {
      let _this = this
      _this.$refs['editModalForm'].validate((valid) => {
        if (valid) {
          if ( _this.editModalData.model.verbalId !== '') {
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
    updateSubmit () {
      let _this = this
      let tempSubmit = Object.assign({}, _this.editModalData.model)
      delete tempSubmit.verbalId
      updateVerbal( _this.editModalData.model.verbalId, tempSubmit).then(res => {
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
    addSubmit () {
      let _this = this
      let tempSubmit = Object.assign({}, _this.editModalData.model)
      delete tempSubmit.verbalId
      addVerbal(tempSubmit).then(res => {
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
    restVerbal() {
      let _this = this
      _this.editModalData.model = {
        content: '',
        labelIds: '',
        verbalId: ''
      }
      _this.$refs['editModalForm'].resetFields()
    },
  },
  mounted () {
    let _this = this
    _this.initView()
  }
}
</script>
