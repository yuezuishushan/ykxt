<template>
<div>
  <Form :model="listData.filter" inline :label-width="0" @submit.native.prevent="handleSearch" >
    <FormItem>
      <Button type="primary" @click="handleAdd()"> <Icon type="md-add" />新建</Button>
    </FormItem>
    <div class="fr">
      <FormItem label="菜单名称" prop="menuName" :label-width="80">
        <Input type="text" v-model="listData.filter.menuName" placeholder="请输入菜单名称"></Input>
      </FormItem>
      <FormItem :label-width="0">
        <Button type="info" @click="handleSearch" :loading="listData.loading">查询</Button>
      </FormItem>
    </div>
    <div class="tips">
      <Icon type="ios-alert" class="icon" />
      <span>已选择 {{batchOperateList.length}} 项</span>
    </div>
    <Table :loading="listData.loading" border stripe row-key="menuId" :columns="listData.columns" :data="listData.list" >
      <template slot="type" slot-scope="{ column, row, index }">
        <div class="menu" v-if="row.type === '菜单'">{{row.type}}</div>
        <div class="catalog" v-else>{{row.type}}</div>
      </template>
    </Table>
    <Page v-if="listData.total > 0" :current="listData.filter.pageNum" :page-size="listData.filter.pageSize" :total="listData.total" show-total show-sizer show-elevator @on-change="handleChangePage" @on-page-size-change="handleChangePageSize"/>
  </Form>
  <Modal v-model="editModalData.visible" :width="640" :loading="editModalData.loading" :mask-closable="false" title="编辑素材" @on-ok="handleSubmit" @on-cancel="handleCancel" ok-text="保存">
    <Form ref="editModalForm" :model="editModalData.model" :rules="editModalData.rules" :label-width="100">
      <FormItem label="上级菜单" prop="groupId" >
        <Select v-model="listData.filter.groupId">
          <Option  :value="-1" :key="-1">全部</Option>
          <Option v-for="item in listData.groupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="菜单类型" prop="name">
        <RadioGroup v-model="editModalData.model.type">
          <Radio :label="0">目录</Radio>
          <Radio :label="1">菜单</Radio>
          <Radio :label="2">按钮</Radio>
        </RadioGroup>
      </FormItem>
<!--      <FormItem label="图标" prop="cardCover">-->
<!--        <div class="upload-wrap">-->
<!--          <div class="upload-list" v-if="editModalData.model.cardCover!== ''" >-->
<!--            <template>-->
<!--              <img v-lazy="editModalData.model.cardCover">-->
<!--              <div class="upload-list-cover">-->
<!--                <div class="action-cells">-->
<!--                  <div class="cell">-->
<!--                    <Icon title="预览" type="ios-eye-outline" @click.native="handlePreview(editModalData.model.cardCover)"></Icon>-->
<!--                    <Icon title="删除" type="ios-trash-outline" @click.native="handleRemoveLicense()"></Icon>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </template>-->
<!--          </div>-->
<!--          <div class="upload-btn" v-else>-->
<!--            <Icon type="md-images" size="18" @click="handleShowCropper"/>-->
<!--          </div>-->
<!--        </div>-->
<!--      </FormItem>-->
      <FormItem label="菜单名称" prop="name">
        <Input v-model="editModalData.model.name" ></Input>
      </FormItem>
      <FormItem label="显示排序" prop="name">
        <Input v-model="editModalData.model.name" ></Input>
      </FormItem>
      <FormItem label="请求地址" prop="name">
        <Input v-model="editModalData.model.name" ></Input>
      </FormItem>
      <FormItem label="权限标识" prop="name">
        <Input v-model="editModalData.model.name" ></Input>
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
import { getMenuList } from '@/api/system/menu'
export default {
  name: 'systemMenu',
  mixins: [uploadMixin],
  components: { Cropper },
  data () {
    return {
      listData: {
        filter: {
          pageSize: 10,
          pageNum: 1,
          menuName: ''
        },
        list: [],
        columns: [
          {
            type: 'selection',
            width: 50,
            align: 'center'
          },
          {
            title: '菜单名称',
            key: 'name',
            tree: true,
            minWidth: 100
          },
          {
            title: '序号',
            key: 'orderNum',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '请求地址',
            key: 'url',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '类型',
            slot: 'type',
            tooltip: true,
            minWidth: 100
          },
          {
            title: '权限标识',
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
      getMenuList(_this.listData.filter).then(res => {
        let tempData = res.data
        _this.listData.list = tempData.records
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
