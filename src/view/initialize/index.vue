<style lang="less" scoped>
  @import './index.less';
</style>
<template>
  <div>
    <div class="navigationTitle">
      <div :class="[listData.index === 1 ? 'itemNavigation' : 'itemNavigation1']" @click="handleNavigation(1)">
        <div class="navigationNum">1</div>
        <span>资料</span>
      </div>
      <div :class="[listData.index === 2 ? 'itemNavigation' : 'itemNavigation1']" @click="handleNavigation(2)">
        <div class="navigationNum">2</div>
        <span>设置</span>
      </div>
      <div :class="[listData.index === 3 ? 'itemNavigation' : 'itemNavigation1']" @click="handleNavigation(3)">
        <div class="navigationNum">3</div>
        <span>会员</span>
      </div>
      <div :class="[listData.index === 4 ? 'itemNavigation' : 'itemNavigation1']" @click="handleNavigation(4)">
        <div class="navigationNum">4</div>
        <span>库存</span>
      </div>
      <div :class="[listData.index === 5 ? 'itemNavigation' : 'itemNavigation1']" @click="handleNavigation(5)">
        <div class="navigationNum">5</div>
        <span>财务</span>
      </div>
      <div :class="[listData.index === 6 ? 'itemNavigation' : 'itemNavigation1']" @click="handleNavigation(6)">
        <div class="navigationNum">6</div>
        <span>完成</span>
      </div>
    </div>
    <div class="initialInformation" v-if="listData.index === 1">
      <div class="initialTitle">初始资料录入</div>
      <div class="initialHead">根据您的业务现状进行个性化设置</div>
      <div class="information" style="width: 1300px">
        <div class="item active" @click="handleWarehouse">
          <div class="itemBack "  v-bind:class="{active: listData.model.stock === 1}">
            <img :src="navigationWarehouse">
          </div>
          <div class="itemTitle">仓库信息</div>
          <div class="itemHead">产品存放的位置</div>
        </div>
        <div class="item active" @click="handleService">
          <div class="itemBack"  v-bind:class="{active: listData.model.serve === 1}">
            <img :src="navigationSerive">
          </div>
          <div class="itemTitle">服务项目</div>
          <div class="itemHead">录入服务项目信息</div>
        </div>
        <div class="item active" @click="handleProduct">
          <div class="itemBack"  v-bind:class="{active: listData.model.product === 1}">
            <img :src="navigationProduct">
          </div>
          <div class="itemTitle">实物产品</div>
          <div class="itemHead">产品信息及对应的期初信息</div>
        </div>
        <div class="item active" @click="handleSupplier">
          <div class="itemBack"  v-bind:class="{active: listData.model.supplier === 1}">
            <img :src="navigationSup">
          </div>
          <div class="itemTitle">供应商</div>
          <div class="itemHead">进行采购业务时需要选择供应商</div>
        </div>
      </div>
    </div>
    <div class="initialInformation" v-if="listData.index === 2">
      <div class="initialTitle">系统设置</div>
      <div class="initialHead">准确的录入含仓库、商品（服务项目、实物产品）供应商信心，能够有效的保障经营数据的完整</div>
      <div class="information" style="width: 1000px">
        <div class="item active" @click="handleSetting">
          <div class="itemBack active">
            <img :src="basicSeting">
          </div>
          <div class="itemTitle">基本设置</div>
        </div>
        <div class="item active" @click="handleMemberSetting">
          <div class="itemBack active">
            <img :src="memberSeting">
          </div>
          <div class="itemTitle">会员设置</div>
        </div>
        <div class="item active" @click="handleDefaultWarehouse">
          <div class="itemBack"  v-bind:class="{active: listData.model.defaultStock === 1}">
            <img :src="warehouseSeting">
          </div>
          <div class="itemTitle">默认仓库设置</div>
        </div>
      </div>
    </div>
    <div class="initialInformation" v-if="listData.index === 3">
      <div class="initialTitle">会员信息录入</div>
      <div class="initialHead">维护您的客户信息，销售的时候选择会员信息，能够有效的保障经营数据的完整</div>
      <div class="information" style="width: 1000px">
        <div class="item active" @click="handleMember">
          <div class="itemBack"  v-bind:class="{active: listData.model.orgCount === 1}">
            <img :src="member">
          </div>
          <div class="itemTitle">会员信息</div>
        </div>
      </div>
    </div>
    <div class="initialInformation" v-if="listData.index === 4">
      <div class="initialTitle">库存初始化</div>
      <div class="initialHead">导入现有的仓库产品存量</div>
      <div class="information" style="width: 1000px">
        <div class="item active" @click="handleStock">
          <div class="itemBack"  v-bind:class="{active: listData.model.initial === 1}">
            <img :src="stock">
          </div>
          <div class="itemTitle">库存导入</div>
        </div>
      </div>
    </div>
    <div class="initialInformation" v-if="listData.index === 5">
      <div class="initialTitle">财务初始化</div>
      <div class="initialHead">导入应收账款和应付账款</div>
      <div class="information" style="width: 1000px">
        <div class="item active" @click="handleFinance(0)">
          <div class="itemBack"  v-bind:class="{active: listData.model.payable === 1}">
            <img :src="payment">
          </div>
          <div class="itemTitle">应付账款导入</div>
        </div>
        <div class="item active" @click="handleFinance(1)">
          <div class="itemBack"  v-bind:class="{active: listData.model.receivable === 1}">
            <img :src="collection">
          </div>
          <div class="itemTitle">应收账款导入</div>
        </div>
      </div>
    </div>
    <div class="initialInformation" v-if="listData.index === 6">
      <div class="initialTitle">系统初始化完成</div>
      <div class="information" style="width: 1000px">
        <div class="item ">
          <div >
            <img :src="success" style="width: 130px">
          </div>
          <Button type="primary" @click="handleBegin" style="margin-top: 30px">开始使用</Button>
        </div>
      </div>
    </div>
    <Modal v-model="useModal.visible" :loading="useModal.loading" :width="500" @on-cancel="handleCancelModal" @on-ok="handleSubmitModal" ok-text="确认开账">
      <Form ref="useModalForm" :model="useModal.filter" :rules="useModal.rules" >
        <div class="tips">本系统会计期间界定为<span>自然月份</span>，会计年度期间数为<span>12</span>个</div>
        <FormItem prop="expireMonth" label="启用账期为" >
         <DatePicker type="month" placeholder="月" style="width: 100px"  v-model="useModal.filter.expireMonth" @on-change="handleDate"></DatePicker>期
        </FormItem>
        <FormItem label="帐套启用日期：" :label-width="140" style="clear: both">
          {{useModal.filter.date}}
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import navigationWarehouse from '@/assets/images/icon/navigationWarehouse.png'
import navigationSerive from '@/assets/images/icon/navigationSerive.png'
import navigationProduct from '@/assets/images/icon/navigationProduct.png'
import navigationSup from '@/assets/images/icon/navigationSup.png'
import basicSeting from '@/assets/images/icon/basicSeting.png'
import warehouseSeting from '@/assets/images/icon/warehouseSeting.png'
import memberSeting from '@/assets/images/icon/memberSeting.png'
import member from '@/assets/images/icon/member.png'
import stock from '@/assets/images/icon/stock.png'
import payment from '@/assets/images/icon/payment.png'
import success from '@/assets/images/icon/success.png'
import collection from '@/assets/images/icon/collection.png'
import date from '@/filter/module/date'
import { findData, findSet, findOrg, findInitial, findInitialize, saveFinish } from '@/api/initialize/initialize'
import { mapActions } from 'vuex'
import { getCaptcha } from '@/api/common'
export default {
  name: 'initializeNavigation',
  data () {
    return {
      navigationWarehouse,
      navigationSerive,
      navigationProduct,
      navigationSup,
      basicSeting,
      warehouseSeting,
      memberSeting,
      member,
      stock,
      payment,
      success,
      collection,
      listData: {
        index: 1,
        loading: false,
        model: {
          product: 0,
          serve: 0,
          stock: 0,
          supplier: 0,
          defaultStock: 0,
          orgCount: 0,
          initial: 0,
          payable: 0,
          receivable: 0
        }
      },
      useModal: {
        visible: false,
        loading: false,
        filter: {
          expireYear: '',
          expireMonth: '',
          date: ''
        }
        // rules: {
        //   expireYear: [{ required: true, message: '请选择启用年', trigger: 'blur' }],
        //   expireMonth: [{ required: true, message: '请选择启用月份', trigger: 'blur' }]
        // }
      }
    }
  },
  methods: {
    ...mapActions([
      'getUserInfo'
    ]),
    handleGetCaptcha () {
      const _this = this
      getCaptcha().then(res => {
        let tempData = res.data
        _this.captchaSrc = `data:image/png;base64,${tempData.image}`
        _this.loginModel.captchaId = tempData.captchaId
      })
    },
    handleNavigation (index) {
      let _this = this
      _this.listData.index = index
    },
    loadList () {
      let _this = this
      _this.listData.loading = true
      findData().then(res => {
        _this.listData.model.product = res.data.product
        _this.listData.model.serve = res.data.serve
        _this.listData.model.stock = res.data.stock
        _this.listData.model.supplier = res.data.supplier
        _this.listData.loading = false
      }).catch(() => {
        _this.listData.loading = false
      })
      findSet().then(res => {
        _this.listData.model.defaultStock = res.data.defaultStock
        _this.listData.loading = false
      }).catch(() => {
        _this.listData.loading = false
      })
      findOrg().then(res => {
        _this.listData.model.orgCount = res.data.orgCount
        _this.listData.loading = false
      }).catch(() => {
        _this.listData.loading = false
      })
      findInitial().then(res => {
        _this.listData.model.initial = res.data.initial
        _this.listData.loading = false
      }).catch(() => {
        _this.listData.loading = false
      })
      findInitialize().then(res => {
        _this.listData.model.payable = res.data.payable
        _this.listData.model.receivable = res.data.receivable
        _this.listData.loading = false
      }).catch(() => {
        _this.listData.loading = false
      })
    },
    handleBegin () {
      let _this = this
      _this.useModal.filter.expireMonth = date(new Date(), 'yyyy-MM-dd')
      _this.useModal.filter.date = date(_this.useModal.filter.expireMonth, 'yyyy-MM-dd')
      _this.useModal.visible = true
    },
    handleDate () {
      let _this = this
      _this.useModal.filter.date = date(_this.useModal.filter.expireMonth, 'yyyy-MM-dd')
    },
    handleCancelModal () {
      let _this = this
      _this.useModal.visible = false
    },
    handleSubmitModal () {
      let _this = this
      _this.$refs['useModalForm'].validate((valid) => {
        if (valid) {
          let billDate = date(_this.useModal.filter.expireMonth, 'yyyy-MM-dd')
          saveFinish(billDate).then(res => {
            _this.$Message.success('初始化完成')
            _this.getUserInfo().then(user => {
              console.log(user)
              _this.loginLoading = false
              _this.$router.push({
                name: user.defaultRoute
              })
            }).catch(() => {
              _this.loginLoading = false
              _this.handleGetCaptcha()
            })
          }).catch(() => {
            _this.useModal.loading = false
            _this.$nextTick(() => {
              _this.useModal.loading = true
            })
          })
        } else {
          _this.useModal.loading = false
          _this.$nextTick(() => {
            _this.useModal.loading = true
          })
        }
      })
    },
    handleWarehouse () {
      let _this = this
      _this.$router.push({ name: 'basicWarehouse' })
    },
    handleService () {
      let _this = this
      _this.$router.push({ name: 'basicService' })
    },
    handleProduct () {
      let _this = this
      _this.$router.push({ name: 'basicProduct' })
    },
    handleSupplier () {
      let _this = this
      _this.$router.push({ name: 'basicSupplier' })
    },
    handleSetting () {
      let _this = this
      _this.$router.push({ name: 'settingBasic' })
    },
    handleMemberSetting () {
      let _this = this
      _this.$router.push({ name: 'settingMember' })
    },
    handleDefaultWarehouse () {
      let _this = this
      _this.$router.push({ name: 'settingDefaultWarehouse' })
    },
    handleMember () {
      let _this = this
      _this.$router.push({ name: 'memberInitialization' })
    },
    handleStock () {
      let _this = this
      _this.$router.push({ name: 'stockInitialization' })
    },
    handleFinance (type) {
      let _this = this
      if (type === 0) {
        _this.$router.push({ name: 'financeInitialization', params: { name: 'payment' } })
      } else {
        _this.$router.push({ name: 'financeInitialization', params: { name: 'receivables' } })
      }
    }
  },
  mounted () {
    let _this = this
    _this.loadList()
  }
}
</script>
