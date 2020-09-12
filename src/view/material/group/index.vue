<style lang="less" scoped>
  @import './index.less';
</style>
<template>
  <div>
    <Form :model="listData.filter" inline :label-width="0" @submit.native.prevent="handleSearch">
      <FormItem>
        <Button type="primary" @click="handleAddMember()"> <Icon type="md-add" />创建</Button>
      </FormItem>
      <FormItem>
        <Button type="error" @click="handleDel()"><Icon type="md-trash" />删除</Button>
      </FormItem>
      <div class="fr">
        <FormItem label="" prop="searchName">
          <Input type="text" v-model="listData.filter.searchName" placeholder="请输入搜索内容"></Input>
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
      <template slot="group" slot-scope="{ column, row, index }">
        <span style="color: #7958FC" @click="handleDetail">查看详情</span>
      </template>
    </Table>
    <Page v-if="listData.total > 0" :current="listData.filter.pageNum" :page-size="listData.filter.pageSize" :total="listData.total" show-total show-sizer show-elevator @on-change="handleChangePage" @on-page-size-change="handleChangePageSize"/>
    <Modal v-model="detailData.visible" :width="640" :loading="detailData.loading" :mask-closable="false" title="创建素材组" @on-ok="handleSubmit" @on-cancel="handleCancel" ok-text="保存">
      <Form ref="modalForm" :model="detailData.model" :rules="detailData.rules" :label-width="120">
        <FormItem label="素材组名称:" prop="name">
          <Input v-model="detailData.model.name"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import userStore from '@/store/module/user'
export default {
  name: 'materialGroup',
  data () {
    return {
      listData: {
        loading: false,
        total: 0,
        screen: false,
        filter: {
          pageNum: 1,
          pageSize: 10,
          source: -1,
          deleted: -1,
          storeId: -1,
          searchName: '',
          expenditure: '',
          consumptionNum: '',
          level: '',
          beginTime: '',
          endTime: '',
          beginIntegral: '',
          endIntegral: ''
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
            key: 'subName',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '创建时间',
            key: 'subStatus',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '查看素材',
            slot: 'group',
            tooltip: true,
            minWidth: 100
          }
        ]
      },
      list: [],
      batchOperateList: [],
      detailData: {
        loading: true,
        visible: false,
        filter: {
          pageSize: 100,
          pageNum: 1
        },
        model: {
          id: '',
          name: '',
          storeId: userStore.state.storeId
        },
        rules: {
          name: [{ required: true, message: '请输入设备组名称', trigger: 'blur' }]
        }
      }
    }
  },
  methods: {
    initView () {
      let _this = this
      _this.listData.filter = Object.assign({}, _this.listData.filter, {
        pageNum: 1,
        pageSize: 10
      })
      _this.loadList()
    },
    /*
    * 查询会员列表
    * */
    loadList () {
      let _this = this
      _this.listData.loading = true
      _this.batchOperateList = []
      selectMemberList(_this.listData.filter).then(res => {
        let tempData = res.data
        _this.listData.list = tempData.enties
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
    handleDetail () {},
    /*
    * 添加会员
    * */
    handleAddMember (item) {
      let _this = this
      _this.restAddMember()
      _this.detailData.visible = true
    },
    restAddMember () {
      let _this = this
      _this.detailData.model = {
        id: '',
        name: '',
        mobile: '',
        sex: 2,
        birthday: '',
        storeId: userStore.state.storeId,
        subId: '',
        source: '',
        levelId: '',
        province: '',
        city: '',
        county: '',
        address: '',
        remark: '',
        areaList: [],
        organizationContacts: []
      }
      _this.$refs['modalForm'].resetFields()
      _this.detailData.model.organizationContacts = []
      _this.detailData.model.organizationContacts.push({
        name: '',
        telephone: '',
        editStatus: _this.editColumnsStatus
      })
    },
    /*
    * 删除
    * */
    handleDel (item) {
      let _this = this
      let tempTips = ''
      let tempFormData = []
      if (item) {
        tempTips = `删除的数据将不能恢复,确认删除:${item.name}?`
        tempFormData.push(item.id)
      } else {
        if (_this.batchOperateList.length === 0) {
          _this.$Message.warning('未选择数据')
          return
        }
        tempTips = `删除的数据将不能恢复?`
        for (let i in _this.batchOperateList) {
          tempFormData.push(_this.batchOperateList[i].id)
        }
      }
      _this.$Modal.confirm({
        title: '提示',
        content: tempTips,
        onOk: () => {
          delCategory(tempFormData).then(res => {
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
    handleCancel () {
      let _this = this
      _this.detailData.visible = false
    },
    handleSubmit () {
      let _this = this
      _this.$refs['modalForm'].validate((valid) => {
        if (valid) {
          _this.detailData.loading = true
          let tempSubmitData = Object.assign({}, _this.detailData.model)
          if (tempSubmitData.areaList) {
            tempSubmitData.province = tempSubmitData.areaList[0]
            tempSubmitData.city = tempSubmitData.areaList[1]
            tempSubmitData.county = tempSubmitData.areaList[2]
            delete tempSubmitData.areaList
          }
          saveMember(tempSubmitData).then(res => {
            _this.$Message.success('保存成功')
            _this.detailData.visible = false
            _this.loadList()
          }).catch(() => {
            _this.detailData.loading = false
            _this.$nextTick(() => {
              _this.detailData.loading = true
            })
          })
        } else {
          _this.detailData.loading = false
          _this.$nextTick(() => {
            _this.detailData.loading = true
          })
        }
      })
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
