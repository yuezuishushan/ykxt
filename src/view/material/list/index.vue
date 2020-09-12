<template>
<div>
  <Form :model="listData.filter" inline :label-width="0" @submit.native.prevent="handleSearch" >
    <FormItem>
      <Button type="primary" @click="handleGroup()"> <Icon type="md-add" />分组</Button>
    </FormItem>
    <FormItem>
      <Button type="error" @click="handleDel()"><Icon type="md-trash" />删除</Button>
    </FormItem>
    <div class="fr">
      <FormItem label="" prop="groupId" :label-width="0">
        <Select v-model="listData.filter.groupId">
          <Option  :value="-1" :key="-1">全部</Option>
          <Option v-for="item in listData.groupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="" prop="searchName">
        <Input type="text" v-model="listData.filter.searchName" placeholder="请输入搜索内容"></Input>
      </FormItem>
      <FormItem :label-width="0">
        <Button class="searchBtn" @click="handleSearch" :loading="listData.loading">查询</Button>
      </FormItem>
    </div>
    <div>
      <Access name="operateShareholderManageCardAdd">
        <FormItem :label-width="0">
          <Button type="primary" @click="handleAdd" >新增股东赠卡</Button>
        </FormItem>
      </Access>
    </div>
    <div class="tips">
      <Icon type="ios-alert" class="icon" />
      <span>已选择 {{batchOperateList.length}} 项</span>
    </div>
    <Table :loading="listData.loading" border stripe :columns="listData.columns" :data="listData.list" >
      <template slot="action" slot-scope="{ column, row, index }">
        <div class="operation">
          <Tooltip content="修改" transfer>
            <img :src="editImg" @click="handleEdit(row)">
          </Tooltip>
        </div>
      </template>
    </Table>
  </Form>
  <Modal v-model="editModalData.visible" :width="640" :loading="editModalData.loading" :mask-closable="false" title="编辑素材" @on-ok="handleSubmit" @on-cancel="handleCancel" ok-text="保存">
    <Form ref="editModalForm" :model="editModalData.model" :rules="editModalData.rules" :label-width="100">
      <FormItem label="素材组" prop="groupId">
        <Select v-model="listData.filter.groupId">
          <Option  :value="-1" :key="-1">全部</Option>
          <Option v-for="item in listData.groupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="素材名" prop="name">
        <Input v-model="editModalData.model.name" ></Input>
      </FormItem>
      <FormItem label="类型" prop="groupId" >
        <Select v-model="listData.filter.groupId">
          <Option  :value="-1" :key="-1">全部</Option>
          <Option v-for="item in listData.groupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="上传图片" prop="cardCover">
        <div class="upload-wrap">
          <div class="upload-list" v-if="editModalData.model.cardCover!== ''" >
            <template>
              <img v-lazy="editModalData.model.cardCover">
              <div class="upload-list-cover">
                <div class="action-cells">
                  <div class="cell">
                    <Icon title="预览" type="ios-eye-outline" @click.native="handlePreview(editModalData.model.cardCover)"></Icon>
                    <Icon title="删除" type="ios-trash-outline" @click.native="handleRemoveLicense()"></Icon>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div class="upload-btn" v-else>
            <Icon type="md-images" size="18" @click="handleShowCropper"/>
          </div>
        </div>
      </FormItem>
      <FormItem v-for="(item, index) in editModalData.model.jikeCardList" :key="index" label="文字:" :prop="`jikeCardList.${index}.jikeName`">
        <Input type="textarea"  v-model="item.jikeName"  style="width: 360px;float: left;"></Input>
        <div style="float: left; width: 60px">
          <Icon type="ios-add-circle"  style="color: #2DB7F5;font-size: 30px;cursor: pointer" @click="handleAddAccumulation()" />
          <Icon type="ios-remove-circle" style="color: #ED4014;font-size: 30px;cursor: pointer" v-if="editModalData.model.jikeCardList.length > 1"  @click="handleDelAccumulation(index)"  />
        </div>
      </FormItem>
    </Form>
  </Modal>
  <Modal title="图片选取" v-model="cropperModal.visible" :width="700" footer-hide @on-cancel="handleCancelCropper">
    <cropper v-if="cropperModal.visible" :src="cropperModal.imageSrc" :ext="cropperModal.extData" :aspectRatio="0" crop-button-text="确认提交" @on-crop="handleCroped"></cropper>
  </Modal>
</div>
</template>
<script>
import { mapMutations } from 'vuex'
import { uploadFile } from '@/api/common'
import uploadMixin from '@/mixin/upload'
import Cropper from '_c/cropper'
export default {
  name: 'adopt',
  mixins: [uploadMixin],
  components: { Cropper },
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
            title: '名称',
            key: 'subName',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '类型',
            key: 'subStatus',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '上传时间',
            key: 'subStatus',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '详情',
            key: 'subStatus',
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
      },
      batchOperateList: [],
      cropperModal: {
        visible: false,
        imageSrc: '',
        extData: {
          uploadLoading: false
        }
      }
    }
  },
  methods: {
    ...mapMutations(['handlePreview']),
    initView () {
      let _this = this
      _this.loadList()
    },
    loadList () {
      let _this = this
      selectGifCard(_this.listData.filter).then(res => {
        let tempData = res.data
        _this.listData.list = tempData.enties
        _this.listData.total = tempData.total
        _this.listData.loading = false
      }).catch(() => {
        _this.listData.loading = false
      })
    },
    handleSearch () {
      let _this = this
      _this.listData.filter.pageNum = 1
      _this.loadList()
    },
    handleShowCropper () {
      let _this = this
      _this.cropperModal.imageSrc = _this.editModalData.model.cardCover
      _this.cropperModal.visible = true
    },
    handleCroped (blob) {
      let _this = this
      let formData = new FormData()
      formData.append('file', blob)
      _this.cropperModal.extData.uploadLoading = true
      uploadFile(formData).then((res) => {
        _this.$Message.success('上传成功~')
        _this.editModalData.model.cardCover = res.data
        _this.resetCropperModal()
        _this.cropperModal.visible = false
      }).catch(() => {
        _this.cropperModal.extData.uploadLoading = false
      })
    },
    handleCancelCropper () {
      let _this = this
      _this.resetCropperModal()
    },
    resetCropperModal () {
      let _this = this
      _this.cropperModal.imageSrc = ''
      _this.cropperModal.extData.uploadLoading = false
    },
    handleRemoveLicense () {
      let _this = this
      _this.editModalData.model.cardCover = ''
    },
    resetModal () {
      let _this = this
      _this.editModalData.title = ''
      _this.editModalData.model = {
        id: '',
        name: '',
        typ: 0,
        cardCover: '',
        comboId: '',
        comboName: '',
        comboAmount: '',
        gudongShareNum: '',
        customShareNum: '',
        jikeCardList: [{ jikeId: '', jikeName: '' }],
        introduce: '',
        isPayable: 0,
        remark: ''
      }
      _this.editModalData.defaultIntroduceList = []
      _this.editModalData.uploadIntroduceList = []
      _this.$refs['editModalForm'].resetFields()
      _this.editModalData.uploadIntroduceList = _this.$refs.introduceUpload.fileList
    },
    handleSubmit () {
      let _this = this
      _this.$refs['editModalForm'].validate((valid) => {
        if (valid) {
          addCard(_this.editModalData.model).then((res) => {
            _this.$Message.success('保存成功')
            _this.resetModal()
            _this.loadList()
            _this.editModalData.visible = false
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
      _this.resetModal()
      _this.editModalData.visible = false
    },
    handleAdd () {
      let _this = this
      _this.editModalData.visible = true
      _this.resetModal()
    },
    handleEdit (item) {
      let _this = this
      _this.resetModal()
      _this.editModalData.visible = true
    },
    handleAddAccumulation () {
      let _this = this
      _this.editModalData.model.jikeCardList.push({
        jikeId: '',
        jikeName: ''
      })
    },
    handleDelAccumulation (index) {
      let _this = this
      _this.editModalData.model.jikeCardList.splice(index, 1)
    }
  },
  mounted () {
    let _this = this
    _this.initView()
  }
}
</script>
