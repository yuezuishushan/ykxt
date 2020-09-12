<style lang="less" scoped>
  @import './index.less';
</style>
<template>
  <div>
    <Form :model="listData.filter" inline :label-width="0" @submit.native.prevent="handleSearch">
      <FormItem>
        <Button type="primary" @click="handleAddGropu()"> <Icon type="md-add" />创建</Button>
      </FormItem>
      <FormItem>
        <Button type="error" @click="handleDel()"><Icon type="md-trash" />删除</Button>
      </FormItem>
      <div class="fr">
        <FormItem label="" prop="equipmentGroupName">
          <Input type="text" v-model="listData.filter.equipmentGroupName" placeholder="请输入搜索内容"></Input>
        </FormItem>
        <FormItem :label-width="0">
          <Button class="searchBtn" @click="handleSearch" :loading="listData.loading">查询</Button>
        </FormItem>
      </div>
    </Form>
    <div class="tips">
      <Icon type="ios-alert" class="icon" />
      <span>已选择 {{batchOperateList.length}} 项</span>
    </div>
    <Table :loading="listData.loading" border stripe :columns="listData.columns" :data="listData.list" @on-select="handleSelectRow" @on-select-cancel="handleSelectRow" @on-select-all="handleSelectRow" @on-select-all-cancel="handleSelectRow" style="margin-top: 10px;clear: both">
      <template slot="action" slot-scope="{ column, row, index }">
        <div class="action">
          <div @click="handleEdit(row)">编辑</div>
          <div @click="handleSee(row)">查看设备列表</div>
        </div>
      </template>
    </Table>
<!--    <Table row-key="id" :columns="listData.columns" :data="listData.list" border>-->
<!--      <template slot="action" slot-scope="{ column, row, index }">-->
<!--        <div class="action">-->
<!--          <div @click="handleEdit(row)">编辑</div>-->
<!--          <div @click="handleSee(row)">查看设备列表</div>-->
<!--        </div>-->
<!--      </template>-->
<!--    </Table>-->
    <Page v-if="listData.total > 0" :current="listData.filter.pageNum" :page-size="listData.filter.pageSize" :total="listData.total" show-total show-sizer show-elevator @on-change="handleChangePage" @on-page-size-change="handleChangePageSize"/>
    <Modal v-model="editModalData.visible" :width="640" :loading="editModalData.loading" :mask-closable="false" :title="editModalData.title" @on-ok="handleSubmit" @on-cancel="handleCancel" ok-text="保存">
      <Form ref="modalForm" :model="editModalData.model" :rules="editModalData.rules" :label-width="120">
        <FormItem label="设备组名称:" prop="equipmentGroupName">
          <Input v-model="editModalData.model.equipmentGroupName"></Input>
        </FormItem>
        <FormItem prop="depict" label="描述:" >
          <Input type="textarea" v-model="editModalData.model.depict"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { getGoupList, addGroup, getGroupDetail, updateVerbal, deleteBatchGroup } from '@/api/equipment/group'
export default {
  name: 'equipmentGroup',
  data () {
    return {
      listData: {
        loading: false,
        total: 0,
        screen: false,
        filter: {
          pageNum: 1,
          pageSize: 10,
          equipmentGroupName: ''
        },
        list: [],
        columns: [
          {
            type: 'selection',
            width: 50,
            align: 'center'
          },
          {
            title: '设备组名称',
            key: 'equipmentGroupName',
            tooltip: true,
            tree: true,
            minWidth: 100
          },
          {
            title: '设备数量',
            key: 'equipmentGroupNum',
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
            minWidth: 100
          },
          {
            title: '操作',
            slot: 'action',
            tooltip: true,
            minWidth: 160
          }
        ]
      },
      list: [],
      batchOperateList: [],
      editModalData: {
        loading: true,
        visible: false,
        model: {
          equipmentGroupId: '',
          depict: '',
          equipmentGroupName: ''
        },
        rules: {
          equipmentGroupName: [{ required: true, message: '请输入设备组名称', trigger: 'blur' }]
        }
      }
    }
  },
  methods: {
    initView () {
      let _this = this
      _this.loadList()
    },
    /*
    * 查询会员列表
    * */
    loadList () {
      let _this = this
      _this.listData.loading = true
      getGoupList(_this.listData.filter).then(res => {
        let tempData = res.data
        _this.listData.list = tempData.records
        _this.listData.total = tempData.total
        _this.listData.loading = false
      }).catch(() => {
        _this.listData.loading = false
      })
    },
    /*
    * 多选列表
    * */
    handleSelectRow (selection) {
      let _this = this
      _this.batchOperateList = []
      for (let i in selection) {
        _this.batchOperateList.push(selection[i])
      }
    },
    /*
    * 查询
    * */
    handleSearch () {
      let _this = this
      _this.listData.filter.pageNum = 1
      _this.loadList()
    },
    handleAddGropu (item) {
      let _this = this
      _this.restAddMember()
      _this.editModalData.title = '添加设备组'
      _this.editModalData.visible = true
    },
    handleEdit(item) {
      let _this = this
      _this.restAddMember()
      _this.editModalData.title = '编辑设备组'
      _this.editModalData.visible = true
      getGroupDetail(item.equipmentGroupId).then(res => {
        _this.listData.loading = false
        _this.editModalData.model.equipmentGroupId = res.data.equipmentGroupId
        _this.editModalData.model.depict = res.data.depict
        _this.editModalData.model.equipmentGroupName = res.data.equipmentGroupName
        _this.editModalData.visible = true
      }).catch(() => {
        _this.listData.loading = false
      })
    },
    restAddMember () {
      let _this = this
      _this.editModalData.model = {
        id: '',
        depict: '',
        equipmentGroupName: ''
      }
      _this.$refs['modalForm'].resetFields()
    },
    handleCancel () {
      let _this = this
      _this.editModalData.visible = false
    },
    handleSubmit () {
      let _this = this
      _this.$refs['modalForm'].validate((valid) => {
        if (valid) {
          _this.editModalData.loading = true
          let tempApi = null
          let tempSubmitData = Object.assign({}, _this.editModalData.model)
          if (_this.editModalData.model.equipmentGroupId === '') {
            delete tempSubmitData.equipmentGroupId
            tempApi = addGroup
          } else {
            tempApi = updateVerbal
          }
          tempApi(tempSubmitData).then(res => {
            _this.$Message.success('保存成功')
            _this.editModalData.visible = false
            _this.loadList()
          }).catch(() => {
            _this.editModalData.loading = false
            _this.$nextTick(() => {
              _this.editModalData.loading = true
            })
          })
        } else {
          _this.editModalData.loading = false
          _this.$nextTick(() => {
            _this.editModalData.loading = true
          })
        }
      })
    },
    /*
    * 删除
    * */
    handleDel () {
      let _this = this
      let tempTips = ''
      let tempFormData = []
      if (_this.batchOperateList.length === 0) {
        _this.$Message.warning('未选择数据')
        return
      }
      tempTips = `删除的数据将不能恢复?`
      for (let i in _this.batchOperateList) {
        tempFormData.push(_this.batchOperateList[i].equipmentGroupId)
      }
      _this.$Modal.confirm({
        title: '提示',
        content: tempTips,
        onOk: () => {
          deleteBatchGroup(tempFormData).then(res => {
            _this.$Message.success('删除成功')
            _this.loadList()
          })
        }
      })
    },
    /*
    * 分页
    * */
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
    handleSee () {
      let _this = this
      _this.$router.push({ name: 'equipmentList' })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let _this = vm
      if (_this.listData.list.length === 0 || _this.refreshNav[_this.$route.name] === 1) {
        _this.initView()
      } else if (_this.refreshNav[_this.$route.name] === 2) {
        _this.loadList()
      }
      _this.clearRefreshView(_this.$route.name)
    })
  }
}
</script>
