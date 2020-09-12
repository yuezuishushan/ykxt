<style lang="less" scoped>
  @import './index.less';
</style>
<template>
  <div>
    <Form :model="listData.filter" inline :label-width="0" @submit.native.prevent="handleSearch">
      <FormItem>
        <Button type="info" @click="handleGroup()"> <Icon type="md-add" />分组</Button>
      </FormItem>
      <FormItem>
        <Button type="success" @click="handleUnbundling()"><Icon type="ios-link" />解绑</Button>
      </FormItem>
      <FormItem>
        <Button type="warning" @click="handleDel()"><Icon type="md-cloud-upload" />发布任务</Button>
      </FormItem>
      <FormItem>
        <Button type="error" @click="handleDel()"><Icon type="ios-square" />停止任务</Button>
      </FormItem>
      <div class="fr">
        <FormItem label="设备组" prop="equipmentGroupId" :label-width="80">
          <Select v-model="listData.filter.equipmentGroupId" transfer style="width: 120px;">
            <Option  :value="-1" :key="-1">全部</Option>
            <Option v-for="item in listData.groupList" :value="item.equipmentGroupId" :key="item.equipmentGroupId">{{ item.equipmentGroupName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="设备名称" prop="equipmentGroupName" :label-width="80">
          <Input type="text" v-model="listData.filter.equipmentGroupName" placeholder="请输入设备名称"></Input>
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
          <div @click="handleDel(row)">解绑</div>
        </div>
      </template>
    </Table>
    <Page v-if="listData.total > 0" :current="listData.filter.pageNum" :page-size="listData.filter.pageSize" :total="listData.total" show-total show-sizer show-elevator @on-change="handleChangePage" @on-page-size-change="handleChangePageSize"/>
    <Modal v-model="detailData.visible" :width="640" :loading="detailData.loading" :mask-closable="false" title="添加会员" @on-ok="handleSubmit" @on-cancel="handleCancel" ok-text="保存">
      <Form ref="modalForm" :model="detailData.model" :rules="detailData.rules" :label-width="120">
        <FormItem label="" prop="groupId" :label-width="0">
          <Select v-model="detailData.model.groupId">
            <Option  :value="-1" :key="-1">全部</Option>
            <Option v-for="item in listData.groupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="设备组名称:" prop="name">
          <Input v-model="detailData.model.name"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { getEquipmentList, findGroup } from '@/api/equipment/list'
export default {
  name: 'equipmentList',
  data () {
    return {
      listData: {
        loading: false,
        total: 0,
        screen: false,
        filter: {
          pageNum: 1,
          pageSize: 10,
          equipmentName: '',
          onlineStatus: '',
          operatingStatus: '',
          equipmentGroupId: -1
        },
        list: [],
        groupList: [],
        columns: [
          {
            type: 'selection',
            width: 50,
            align: 'center'
          },
          {
            title: '设备名称',
            key: 'subName',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '设备型号',
            key: 'subStatus',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '设备序列号',
            key: 'subStatus',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '设备分组',
            key: 'subStatus',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '在线状态',
            key: 'subStatus',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '运行状态',
            key: 'subStatus',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '操作',
            key: 'action',
            tooltip: true,
            minWidth: 100
          }
        ]
      },
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
          groupId: ''
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
      _this.loadList()
      _this.loadGroup()
    },
    loadGroup () {
      let _this = this
      _this.listData.groupList = []
      findGroup(true).then(res => {
        _this.listData.groupList = res.data
      }).catch(() => {
      })
    },
    /*
    * 查询列表
    * */
    loadList () {
      let _this = this
      _this.listData.loading = true
      let tempSubmit = _this.listData.filter
      _this.listData.list = []
      getEquipmentList(tempSubmit).then(res => {
        _this.listData.loading = false
        let tempData = res.data.records
        _this.listData.list = tempData
        _this.listData.total = res.data.total
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
    * 点击来源按钮显示列表
    * */
    handSource (item) {
      let _this = this
      if (item) {
        _this.listData.model.sourceId = item.id
        _this.listData.filter.source = item.id
      } else {
        _this.listData.model.sourceId = 0
        _this.listData.filter.source = -1
      }
      _this.loadList()
    },
    /*
   * 点击频次
   * */
    handFrequency (item) {
      let _this = this
      if (item) {
        if (item === 'expenditure') {
          _this.listData.model.frequencyId = -1
        } else {
          _this.listData.model.frequencyId = item.id
          _this.listData.filter.expenditure = item.frequency
        }
      } else {
        _this.listData.model.frequencyId = 0
        _this.listData.filter.expenditure = ''
      }
      _this.loadList()
    },
    /*
   * 点击消费次数
   * */
    handNumber (item) {
      let _this = this
      if (item) {
        if (item === 'number') {
          _this.listData.model.numberId = -1
        } else {
          _this.listData.model.numberId = item.id
          _this.listData.filter.consumptionNum = item.number
        }
      } else {
        _this.listData.model.numberId = 0
        _this.listData.filter.consumptionNum = ''
      }
      _this.loadList()
    },
    /*
   * 点击生日
   * */
    handBirthday (item) {
      let _this = this
      if (item) {
        if (item === 'time') {
          _this.listData.model.birthId = -1
        } else {
          _this.listData.model.birthId = item.id
          _this.listData.filter.beginTime = item.beginTime
          _this.listData.filter.endTime = item.endTime
        }
      } else {
        _this.listData.model.birthId = 0
        _this.listData.filter.beginTime = ''
        _this.listData.filter.endTime = ''
      }
      _this.loadList()
    },
    /*
   * 点击积分
   * */
    handIntegral (item) {
      let _this = this
      if (item === 'beginIntegral') {
        _this.listData.model.integralId = -1
        _this.listData.filter.beginIntegral = item.name
      } else if (item === 'endIntegral') {
        _this.listData.model.integralId = -1
        _this.listData.filter.endIntegral = item.name
      } else {
        _this.listData.model.integralId = 0
        _this.listData.filter.beginIntegral = ''
        _this.listData.filter.endIntegral = ''
      }
      _this.loadList()
    },
    /*
    * 查询
    * */
    handleSearch () {
      let _this = this
      _this.listData.filter.pageNum = 1
      _this.listData.filter.source = _this.listData.filter.source
      _this.listData.filter.expenditure = _this.listData.filter.expenditure
      _this.listData.filter.consumptionNum = _this.listData.filter.consumptionNum
      _this.listData.filter.level = _this.listData.filter.level
      _this.listData.filter.beginTime = _this.listData.filter.beginTime
      _this.listData.filter.endTime = _this.listData.filter.endTime
      _this.listData.filter.beginIntegral = _this.listData.filter.beginIntegral
      _this.listData.filter.endIntegral = _this.listData.filter.endIntegral
      _this.loadList()
    },
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
