<style lang="less" scoped>
  @import './index.less';
</style>
<template>
<div>
  <Form :model="listData.filter" inline :label-width="0" @submit.native.prevent="handleSearch" >
    <div>
      <FormItem label="名称" prop="searchName" :label-width="60">
        <Input type="text" v-model="listData.filter.searchName" placeholder="请输入搜索内容"></Input>
      </FormItem>
      <FormItem label="类型:" prop="groupId" :label-width="60">
        <Select v-model="listData.filter.groupId">
          <Option  :value="-1" :key="-1">全部</Option>
          <Option v-for="item in listData.groupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem :label-width="0">
        <Button class="searchBtn" @click="handleSearch" :loading="listData.loading">搜索</Button>
      </FormItem>
    </div>
    <div class="plugIn">
      <div class="item-plugIn">1212</div>
    </div>
  </Form>

</div>
</template>
<script>
export default {
  name: 'adopt',
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
            title: '插件名称',
            key: 'subName',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '类别',
            key: 'subStatus',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '唯一标识',
            key: 'subStatus',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '插件版本号',
            key: 'subStatus',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '是否需要话术',
            key: 'subStatus',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '是否需要root',
            key: 'subStatus',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '是否启用',
            slot: 'isBonus',
            tooltip: true,
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
