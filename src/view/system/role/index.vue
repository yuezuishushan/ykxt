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
      <FormItem label="角色名称:" prop="roleName" :label-width="100">
        <Input v-model="listData.filter.roleName" placeholder="请输入角色名称"></Input>
      </FormItem>
      <FormItem :label-width="0">
        <Button type="primary" @click="handleSearch" :loading="listData.loading">搜索</Button>
      </FormItem>
    </div>
    <div class="tips">
      <Icon type="ios-alert" class="icon" />
      <span>已选择 {{batchOperateList.length}} 项</span>
    </div>
    <Table :loading="listData.loading" border stripe :columns="listData.columns" :data="listData.list"  @on-select="handleSelectRow" @on-select-cancel="handleSelectRow" @on-select-all="handleSelectRow" @on-select-all-cancel="handleSelectRow" style="clear: both">
      <template slot="action" slot-scope="{ column, row, index }">
        <Dropdown>
          <a href="javascript:void(0)">
            下拉菜单
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>驴打滚</DropdownItem>
            <DropdownItem>炸酱面</DropdownItem>
            <DropdownItem disabled>豆汁儿</DropdownItem>
            <DropdownItem>冰糖葫芦</DropdownItem>
            <DropdownItem divided>北京烤鸭</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </template>
      <template slot="action" slot-scope="{ column, row, index }">
        <div class="action">
          <div @click="handleEdit(row)">编辑</div>
          <div>查看用户列表</div>
        </div>
      </template>
    </Table>
    <Page v-if="listData.total > 0" :current="listData.filter.pageNum" :page-size="listData.filter.pageSize" :total="listData.total" show-total show-sizer show-elevator @on-change="handleChangePage" @on-page-size-change="handleChangePageSize"/>
  </Form>
  <Modal v-model="editModalData.visible" :width="640" :loading="editModalData.loading" :mask-closable="false" :title="editModalData.title" @on-ok="handleSubmit" @on-cancel="handleCancel" ok-text="保存">
    <Form ref="editModalForm" :model="editModalData.model" :rules="editModalData.rules" :label-width="120">
      <FormItem label="角色名称:" prop="roleName">
        <Input v-model="editModalData.model.roleName" type="text"></Input>
      </FormItem>
      <FormItem prop="remark" label="描述:" >
        <Input type="textarea" v-model="editModalData.model.remark"></Input>
      </FormItem>
      <FormItem  label="角色权限:" >
        <Tree :data="listData.roleList" ref="tree" show-checkbox @on-check-change="handleCheckTree"></Tree>
      </FormItem>
    </Form>
  </Modal>
</div>
</template>
<script>
import { getRoleList, finMenuList, addRole, updateRole, deleteBatchRole, getRoleDetail } from '@/api/system/role'
export default {
  name: 'systemRole',
  data () {
    return {
      listData: {
        filter: {
          roleName: '',
          pageSize: 10,
          pageNum: 1
        },
        list: [],
        roleList: [],
        columns: [
          {
            type: 'selection',
            width: 50,
            align: 'center'
          },
          {
            title: '角色名称',
            key: 'roleName',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '用户数量',
            key: 'userCount',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '角色描述',
            key: 'remark',
            tooltip: true,
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
          roleId: '',
          menuIds: [],
          roleName: '',
          roleSign: '',
          remark: ''
        },
        rules: {
          roleName: [{ required: true, message: '请输名称', trigger: 'blur' }],
          comboId: [{ required: true, message: '请选择要绑定的套餐', trigger: 'blur' }],
          opusPictureList: [{ required: true, type: 'array', min: 1, message: '至少上传一张图片', trigger: 'blur' }]
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
      getRoleList(_this.listData.filter).then(res => {
        let tempData = res.data
        _this.listData.list = tempData.records
        _this.listData.total = tempData.total
        _this.listData.loading = false
      }).catch(() => {
        _this.listData.loading = false
      })
    },
    loadMenu () {
      let _this = this
      _this.listData.loading = true
      finMenuList().then(res => {
        let tempData = res.data.children
        _this.listData.loading = false
        _this.listData.roleList = _this.convertTree(tempData)
        _this.editModalData.visible = true
      }).catch(() => {
        _this.listData.loading = false
      })
    },
    convertTree (tree) {
      const result = []
      let _this = this
      tree.forEach((item) => {
        let menuList = _this.editModalData.model.menuIds
        let menuChecked = false
        if (menuList.length > 0){
          for (let i in menuList) {
            if (menuList[i] === item.menuId) {
              menuChecked = true
            }
          }
        }
        let {
          name: title,
          children: children,
          menuId: id
        } = item
        if (children) {
          children = _this.convertTree(children)
        }
        result.push({
          title,
          id,
          children,
          'checked': menuChecked,
        })
      })
      return result
    },
    handleCheckTree () {
      let _this = this
      let checkList = _this.$refs.tree.getCheckedNodes()
      _this.editModalData.model.menuIds = []
      for (let i in checkList) {
        _this.editModalData.model.menuIds.push(checkList[i].id)
      }
    },
    handleAdd () {
      let _this = this
      _this.restRole()
      _this.editModalData.title = '新增角色'
      _this.loadMenu()
    },
    restRole () {
      let _this = this
      _this.editModalData.model = {
        roleId: '',
        menuIds: [],
        roleName: '',
        roleSign: '',
        remark: ''
      }
      _this.$refs['editModalForm'].resetFields()
    },
    handleEdit(item) {
      let _this = this
      _this.restRole()
      _this.editModalData.title = '编辑角色'
      _this.editModalData.visible = true
      getRoleDetail(item.roleId).then(res => {
        _this.listData.loading = false
        _this.editModalData.model.roleId = res.data.role.roleId
        _this.editModalData.model.roleName = res.data.role.roleName
        _this.editModalData.model.roleSign = res.data.role.roleSign
        _this.editModalData.model.remark = res.data.role.remark
        _this.editModalData.model.menuIds = res.data.menuIds
        _this.loadMenu()
        _this.editModalData.visible = true
      }).catch(() => {
        _this.listData.loading = false
      })
    },
    handleSearch () {
      let _this = this
      _this.listData.filter.pageNum = 1
      _this.loadList()
    },
    handleSubmit () {
      let _this = this
      _this.$refs['editModalForm'].validate((valid) => {
        if (valid) {
          _this.editModalData.loading = true
          let tempApi = null
          let tempSubmitData = Object.assign({}, _this.editModalData.model)
          if (_this.editModalData.model.roleId === '') {
            delete tempSubmitData.roleId
            tempApi = addRole
          } else {
            tempApi = updateRole
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
      _this.restRole()
      _this.editModalData.visible = true
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
        tempFormData.push(_this.batchOperateList[i].roleId)
      }
      _this.$Modal.confirm({
        title: '提示',
        content: tempTips,
        onOk: () => {
          deleteBatchRole(tempFormData).then(res => {
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
    }
  },
  mounted () {
    let _this = this
    _this.initView()
  }
}
</script>
