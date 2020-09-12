<template>
<div>
  <Form :model="listData.filter" inline :label-width="0" @submit.native.prevent="handleSearch" >
    <FormItem>
      <Button type="primary" @click="handleAdd()"> <Icon type="md-add" />新建</Button>
    </FormItem>
    <FormItem>
      <Button type="error" @click="handleDel()"><Icon type="md-trash" />删除</Button>
    </FormItem>
    <div class="fr">
      <FormItem label="用户手机:" prop="userName" :label-width="100">
        <Input v-model="listData.filter.userName" placeholder="请输入用户手机进行模糊搜索"></Input>
      </FormItem>
      <FormItem label="角色" prop="roleId" :label-width="100">
        <Select v-model="listData.filter.roleId">
          <Option  :value="-1" :key="-1">全部</Option>
          <Option v-for="item in listData.roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem :label-width="0">
        <Button class="searchBtn" @click="handleSearch" :loading="listData.loading">搜索</Button>
      </FormItem>
    </div>
    <div class="tips">
      <Icon type="ios-alert" class="icon" />
      <span>已选择 {{batchOperateList.length}} 项</span>
    </div>
    <Table :loading="listData.loading" border stripe :columns="listData.columns" :data="listData.list" style="clear: both">
      <template slot="status" slot-scope="{ column, row, index }">
        <i-switch size="large" v-model="listData.list[index].status" @on-change="handleSetStatus(index)" :before-change="handleBeforeSetStatus" :true-value="1" :false-value="0">
          <span slot="open">启用</span>
          <span slot="close">禁用</span>
        </i-switch>
      </template>
      <template slot="roleName" slot-scope="{ column, row, index }">
        <Dropdown transfer>
          <a href="javascript:void(0)">
            {{row.roleName[0]}}
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list" v-for="item in row.roleName">
            <DropdownItem>{{item}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </template>
      <template slot="action" slot-scope="{ column, row, index }">
        <div class="action">
          <div @click="handleRole(row)">赋予角色</div>
          <div @click="handleEdit(row)">编辑</div>
        </div>
      </template>
    </Table>
    <Page v-if="listData.total > 0" :current="listData.filter.pageNum" :page-size="listData.filter.pageSize" :total="listData.total" show-total show-sizer show-elevator @on-change="handleChangePage" @on-page-size-change="handleChangePageSize"/>
  </Form>
  <Modal v-model="editModalData.visible" :width="640" :loading="editModalData.loading" :mask-closable="false" :title="editModalData.title" @on-ok="handleSubmit" @on-cancel="handleCancel" ok-text="保存">
    <Form ref="editModalForm" :model="editModalData.model" :rules="editModalData.rules" :label-width="120">
<!--      <img src="">-->
      <FormItem label="用户名称:" prop="nickname">
        <Input v-model="editModalData.model.nickname" placeholder="给用户起个名字（昵称）" type="text"></Input>
      </FormItem>
      <FormItem label="用户账号:" prop="userName" >
        <Input v-model="editModalData.model.userName" placeholder="用户用来登录的账号（手机号）" type="text"></Input>
      </FormItem>
      <FormItem label="登录密码:" prop="passWord">
        <Input v-model="editModalData.model.passWord" placeholder="用户用来登录的密码初始密码：666666（密码）" type="password"></Input>
      </FormItem>
      <FormItem label="起止时间:" >
        <DatePicker type="date" placeholder="开始时间"  v-model="editModalData.model.useStartTime"></DatePicker>
        -
        <DatePicker type="date" placeholder="结束时间" v-model="editModalData.model.useEndTime"></DatePicker>
      </FormItem>
      <FormItem label="是否启用：" prop="status">
        <i-switch size="large" v-model="editModalData.model.status"  :true-value="1" :false-value="0">
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-switch>
      </FormItem>
      <FormItem prop="allowEquipmentNum" label="设备的数量:" >
        <Input type="number" v-model="editModalData.model.allowEquipmentNum"></Input>
      </FormItem>
    </Form>
  </Modal>
  <Modal v-model="userRoleModal.visible" :width="640" :loading="userRoleModal.loading" :mask-closable="false" title="角色权限" @on-ok="handleRoleSubmit" @on-cancel="handleRoleCancel" ok-text="保存">
    <Form ref="userModalForm" :model="userRoleModal.model" :rules="userRoleModal.rules" :label-width="120">
      <FormItem  label="赋予角色:" >
        <Transfer :data="userRoleModal.sysRolesList" :titles="userRoleModal.titles" :target-keys="userRoleModal.userRoleIdsList":render-format="render" @on-change="handleTransferChange"></Transfer>
      </FormItem>
    </Form>
  </Modal>
</div>
</template>
<script>
import { getUserList, updateStatus, getRoles, associationRole, register, updateUser, getUserDetail } from '@/api/system/user'
import dateFormat from '@/filter/module/date'
export default {
  name: 'systemUser',
  data () {
    return {
      listData: {
        filter: {
          pageSize: 10,
          pageNum: 1,
          roleId: -1,
          userName: ''
        },
        list: [],
        columns: [
          {
            type: 'selection',
            width: 50,
            align: 'center'
          },
          {
            title: '用户名称',
            key: 'nickName',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '用户账号',
            key: 'userName',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '用户角色',
            slot: 'roleName',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '设备数量（台）',
            key: 'allowEquipmentNum',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '开通时间',
            key: 'useStartTime',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '截止时间',
            key: 'useEndTime',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '用户状态',
            slot: 'status',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '操作',
            slot: 'action',
            tooltip: true,
            minWidth: 120
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
          userId: '',
          headImageBase64: '',
          allowEquipmentNum: '',
          nickname: '',
          useStartTime: '',
          useEndTime: '',
          userName: '',
          passWord: '',
          status: ''
        },
        rules: {
          userName: [{ required: true, message: '请输入用户名称', trigger: 'blur' }]
        }
      },
      userRoleModal: {
        visible: false,
        sysRolesList: [],
        userRoleIdsList: [],
        selectKey: '',
        titles: ['所有角色','当前角色'],
        model: {
          roleIds: [],
          userId: ''
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
    * 查询列表
    * */
    loadList () {
      let _this = this
      _this.listData.loading = true
      let tempSubmit = Object.assign({}, _this.listData.filter)
      if (_this.listData.filter.roleId === -1) {
        tempSubmit.roleId = ''
      }
      getUserList(tempSubmit).then(res => {
        _this.listData.loading = false
        let tempData = res.data
        for (let i in tempData.records) {
          let tempRecord = tempData.records[i]
          tempRecord.roleName = tempData.records[i].roleName.split(',')
          _this.listData.list.push(tempRecord)
        }
        _this.listData.total = tempData.total
      }).catch(() => {
        _this.listData.loading = false
      })
    },
    handleSearch () {
      let _this = this
      _this.listData.filter.pageNum = 1
      _this.loadList()
    },
    handleAdd () {
      let _this = this
      _this.restEditModal()
      _this.editModalData.title = '新增管理用户'
      _this.editModalData.visible = true
    },
    handleEdit (item) {
      let _this = this
      _this.restEditModal()
      getUserDetail(item.userId).then(res => {
        let tempData = res.data[0]
        _this.editModalData.model.userId = tempData.userId
        _this.editModalData.model.userName = tempData.userName
        _this.editModalData.model.passWord = tempData.passWord
        _this.editModalData.model.allowEquipmentNum = tempData.allowEquipmentNum
        _this.editModalData.model.nickname = tempData.nickname
        _this.editModalData.model.useStartTime = tempData.useStartTime
        _this.editModalData.model.useEndTime = tempData.useEndTime
        _this.editModalData.model.status = parseInt(tempData.status)
        _this.editModalData.title = '编辑管理用户'
        _this.editModalData.visible = true
        _this.listData.loading = false
      }).catch(() => {
        _this.listData.loading = false
      })
    },
    restEditModal () {
      let _this = this
      _this.editModalData.model = {
        userId: '',
        headImageBase64: '',
        allowEquipmentNum: '',
        nickname: '',
        useStartTime: '',
        useEndTime: '',
        userName: '',
        passWord: '',
        status: ''
      }
      _this.$refs['editModalForm'].resetFields()
    },
    handleSubmit () {
      let _this = this
      _this.$refs['editModalForm'].validate((valid) => {
        if (valid) {
          _this.editModalData.loading = true
          let tempApi = null
          let tempSubmitData = Object.assign({}, _this.editModalData.model)
          if (_this.editModalData.model.useStartTime !== '') {
            tempSubmitData.useStartTime = dateFormat(_this.editModalData.model.useStartTime, 'yyyy-MM-dd 00:00:00')
          }
          if (_this.editModalData.model.useEndTime !== '') {
            tempSubmitData.useEndTime = dateFormat(_this.editModalData.model.useEndTime, 'yyyy-MM-dd 23:59:59')
          }
          if (_this.editModalData.model.userId === '') {
            delete tempSubmitData.userId
            tempApi = register
          } else {
            tempApi = updateUser
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
    handleCancel () {
      let _this = this
      _this.restEditModal()
      _this.editModalData.visible = false
    },
    handleBeforeSetStatus () {
      return new Promise((resolve) => {
        this.$Modal.confirm({
          title: '提示',
          content: `确认切换状态?`,
          onOk: () => {
            resolve()
          }
        })
      })
    },
    /*
    * 切换模式
    * */
    handleSetStatus (index) {
      let _this = this
      _this.handleMethodSetStatus(index)
    },
    /*
    * 切换
    * */
    handleMethodSetStatus (index) {
      let _this = this
      let status = _this.listData.list[index].status === 0 ? 0 : 1
      let tempSubmit = {
        userId: _this.listData.list[index].userId,
        status: status
      }
      updateStatus(tempSubmit).then(res => {
        _this.listData.loading = false
      }).catch(() => {
        _this.listData.loading = false
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
    render (item) {
      return item.label
    },
    handleTransferChange (newTargetKeys, direction, moveKeys) {
      let _this = this
      _this.userRoleModal.userRoleIdsList = newTargetKeys
    },
    handleRole (item) {
      let _this = this
      _this.restRole()
      _this.userRoleModal.sysRolesList = []
      _this.userRoleModal.userRoleIdsList = []
      _this.userRoleModal.model.userId = item.userId
      getRoles({userId: item.userId}).then(res => {
        _this.userRoleModal.sysRolesList = []
        _this.userRoleModal.userRoleIdsList = []
        let sysRoleData = res.data.sysRoles
        let userRoleData = res.data.userRoleIds
        for (let i in sysRoleData) {
          _this.userRoleModal.sysRolesList.push({
            key: sysRoleData[i].roleId,
            label: sysRoleData[i].roleName
          })
        }
        for (let i in userRoleData) {
          _this.userRoleModal.userRoleIdsList.push(userRoleData[i].roleId)
        }
        _this.userRoleModal.visible = true
      }).catch(() => {
      })
    },
    handleRoleSubmit () {
      let _this = this
      let tempSubmit = _this.userRoleModal.model
      tempSubmit.roleIds = _this.userRoleModal.userRoleIdsList
      associationRole(tempSubmit).then(res => {
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
    handleRoleCancel () {
      let _this = this
      _this.restRole()
      _this.userRoleModal.visible = false
    },
    restRole() {
      let _this = this
      _this.userRoleModal.userRoleIdsList = []
      _this.userRoleModal.sysRolesList = []
      _this.userRoleModal.model = {
        roleIds: [],
        userId: ''
      }
      _this.$refs['userModalForm'].resetFields()
    }
  },
  mounted () {
    let _this = this
    _this.initView()
  }
}
</script>
