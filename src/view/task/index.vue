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
      <Button type="error" @click="handleDel()"><Icon type="ios-square" />取消任务</Button>
    </FormItem>
    <div class="fr">
      <FormItem label="任务名称" prop="name" :label-width="100">
        <Input v-model="listData.filter.name" placeholder="任务名称"></Input>
      </FormItem>
      <FormItem label="执行方式" prop="groupId" :label-width="100">
        <Select v-model="listData.filter.groupId">
          <Option  :value="-1" :key="-1">全部</Option>
          <Option v-for="item in listData.groupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="日期:" :label-width="80">
        <DatePicker type="date" placeholder="开始时间" style="width: 120px" v-model="listData.filter.beginTime"></DatePicker>
        -
        <DatePicker type="date" placeholder="结束时间" style="width: 120px"  v-model="listData.filter.endTime"></DatePicker>
      </FormItem>
      <FormItem :label-width="0">
        <Button class="searchBtn" @click="handleSearch" :loading="listData.loading">搜索</Button>
      </FormItem>
    </div>
    <Table :loading="listData.loading" border stripe :columns="listData.columns" :data="listData.list" style="clear: both">
      <template slot="action" slot-scope="{ column, row, index }">
        <span>重发</span>
      </template>
    </Table>
  </Form>
  <Modal v-model="editModalData.visible" :width="640" :loading="editModalData.loading" :mask-closable="false" title="编辑素材" @on-ok="handleSubmit" @on-cancel="handleCancel" ok-text="保存">
    <Form ref="editModalForm" :model="editModalData.model" :rules="editModalData.rules" :label-width="120">
      <FormItem label="任务名称:" prop="name">
        <Input v-model="editModalData.model.name" ></Input>
      </FormItem>
      <FormItem label="选择插件:" prop="name">
        <Input v-model="editModalData.model.name" ></Input>
      </FormItem>
      <FormItem label="执行方式:" prop="groupId" >
        <Select v-model="editModalData.model.groupId">
          <Option  :value="-1" :key="-1">全部</Option>
          <Option v-for="item in listData.groupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="定时执行时间:" >
        <DatePicker type="date" placeholder="开始时间" style="width: 120px" v-model="editModalData.model.beginTime"></DatePicker>
        -
        <DatePicker type="date" placeholder="结束时间" style="width: 120px"  v-model="editModalData.model.endTime"></DatePicker>
      </FormItem>
      <FormItem prop="remark" label="选择设备:" >
        <Input type="textarea" v-model="editModalData.model.remark"></Input>
      </FormItem>
    </Form>
  </Modal>
</div>
</template>
<script>
export default {
  name: 'task',
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
            title: '任务名称',
            key: 'subName',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '执行方式',
            key: 'subStatus',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '执行情况',
            key: 'subStatus',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '创建时间',
            key: 'subStatus',
            tooltip: true,
            sortable: true,
            minWidth: 100
          },
          {
            title: '操作',
            slot: 'action',
            tooltip: true,
            width: 100
          }
        ],
        total: 0
      },
      batchOperateList: [],
      editModalData: {
        visible: false,
        title: '',
        loading: true,
        bonusCaseList: [],
        model: {
          id: '',
          storeId: '',
          name: '',
          typ: 0,
          cardCover: '',
          appointment: 1,
          comboId: '',
          comboName: '',
          comboAmount: '',
          gudongShareNum: '',
          customShareNum: '',
          jikeCardList: [],
          introduce: '',
          remark: '',
          isPayable: 0,
          paybleAmount: ''
        },
        rules: {
          name: [{ required: true, message: '请输入赠卡名称', trigger: 'blur' }],
          comboId: [{ required: true, message: '请选择要绑定的套餐', trigger: 'blur' }],
          gudongShareNum: [{ required: true, type: 'number', message: '请输入股东可赠送数量', trigger: 'blur' }]
        },
        defaultIntroduceList: [],
        uploadIntroduceList: []
      }
    }
  },
  methods: {
    initView () {
      let _this = this
      _this.loadList()
    },
    loadList () {
    },
    handleAdd () {
      let _this = this
      _this.editModalData.visible = true
    },
    handleSearch () {
      let _this = this
      _this.listData.filter.pageNum = 1
      _this.loadList()
    },
    handleSubmit () {},
    handleCancel () {},
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
      let originalStatus = _this.listData.list[index].isBonus === _this.constantData.statusType.DISABLED.value ? _this.constantData.statusType.ENABLED.value : _this.constantData.statusType.DISABLED.value
      if (originalStatus === _this.constantData.statusType.ENABLED.value && _this.caleEditAccess) {
        _this.$Message.warning('权限不足')
        _this.$nextTick(() => {
          _this.$set(_this.listData.list[index], 'isBonus', originalStatus)
        })
        return
      }
      if (originalStatus === _this.constantData.statusType.DISABLED.value && _this.caleEditAccess) {
        _this.$Message.warning('权限不足')
        _this.$nextTick(() => {
          _this.$set(_this.listData.list[index], 'isBonus', originalStatus)
        })
        return
      }
      _this.handleChangeService(index)
    },
    /*
    * 切换
    * */
    handleMethodSetStatus (index) {
      let _this = this
      _this.handleBeforeSetStatus()
      _this.handleChangeServiceDetail(index)
    }
  },
  mounted () {
    let _this = this
    _this.initView()
  }
}
</script>
