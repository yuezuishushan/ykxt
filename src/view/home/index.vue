<style lang="less" scoped>
  @import './index.less';
</style>
<template>
  <div>
    <Row :gutter="16">
      <Col span="12" class="layout" style="padding: 0px;padding-bottom: 20px">
        <div class="head">
          <div class="title">
            <h4>今日数据</h4>
            <img :src="more" @click="handleBusiness">
            <p @click="handleBusiness">查看更多</p>
            <div class="dateTime">更新时间：{{listData.filter.date}}</div>
          </div>
        </div>
        <ve-histogram ref="chatRef" class="chat" :data="chartData" :settings="chartSettings" :loading="chartData.loading">
          <div class="data-empty"  v-if="chartData.rows.length === 0 ">暂无数据😂</div>
        </ve-histogram>
        <div class="other">
          <div class="itemOther">
            <div class="otherDetail">
              <div class="itemDetailTitle">
                <img :src="addMember">
                <span>新增客数（人）</span>
              </div>
              <div class="itemDetailToday">{{isEmpty(listData.list) ? '': listData.list[7].today }}</div>
              <div class="itemDetailYesterday">昨日：{{isEmpty(listData.list) ? '': listData.list[7].yesterday}}</div>
            </div>
          </div>
          <div class="itemOther itemOtherBorder">
            <div class="otherDetail">
              <div class="itemDetailTitle" >
                <img :src="openCardRecharge" style="width: 29px">
                <span>开卡充值会员数（人）</span>
              </div>
              <div class="itemDetailToday">{{isEmpty(listData.list) ? '': listData.list[3].today}}</div>
              <div class="itemDetailYesterday">昨日：{{isEmpty(listData.list) ? '': listData.list[3].yesterday}}</div>
            </div>
          </div>
          <div class="itemOther" >
            <div class="otherDetail">
              <div class="itemDetailTitle">
                <img :src="allMember" style="width: 26px">
                <span>总客数（人）</span>
              </div>
              <div class="itemDetailToday">{{isEmpty(listData.list) ? '': listData.list[8].today}}</div>
              <div class="itemDetailYesterday">昨日：{{isEmpty(listData.list) ? '': listData.list[8].yesterday}}</div>
            </div>
          </div>
          <div class="itemOther">
            <div class="otherDetail">
              <div class="itemDetailTitle">
                <img :src="balance" style="width: 26px">
                <span>客单价（元）</span>
              </div>
              <div class="itemDetailToday">{{isEmpty(listData.list) ? '': listData.list[9].today}}</div>
              <div class="itemDetailYesterday">昨日：{{isEmpty(listData.list) ? '': listData.list[9].yesterday}}</div>
            </div>
          </div>
        </div>
      </Col>
      <Col span="12">
        <div  style="margin-left: 20px;background: white">
          <div class="head" style="float: left;width: calc(100% - 25px)">
            <div class="title">
              <h4>预警信息</h4>
            </div>
          </div>
          <div style="clear: both;padding-top: 13px">
            <div class="warning">
              <div class="itemWarning">
                <div class="itemWarningtitle">
                  <img :src="earlyWarning">
                  <span>库存预警</span>
                </div>
                <div class="itemWarningMsg" @click="handleStock">
                  <p>您有<span>{{listData.model.highStockCount}}</span>件商品高于库存预警</p>
                  <img :src="more1">
                </div>
                <div class="itemWarningMsg" @click="handleStock">
                  <p>您有<span>{{listData.model.lowStockCount}}</span>件商品低于库存预警</p>
                  <img :src="more1">
                </div>
              </div>
              <div class="itemWarning">
                <div class="itemWarningtitle">
                  <img :src="quality">
                  <span>保质期预警</span>
                </div>
                <div class="itemWarningMsg" @click="handleQuality">
                  <p>您有<span>{{listData.model.expiryDateCount}}</span>件商品快过期
                  </p>
                  <img :src="more1">
                </div>
              </div>
            </div>
            <div class="warning">
              <div class="itemWarning" @click="handleReceivable">
                <div class="itemWarningtitle">
                  <img :src="earlyWarning1">
                  <span>应收款预警</span>
                </div>
                <div class="itemWarningMsg">
                  <p>您有<span>{{listData.model.debt}}</span> 位客户欠款已达<span>{{listData.model.amount}}元</span>
                  </p>
                  <img :src="more1">
                </div>
                <div class="itemWarningMsg">
                  <p>您有<span>{{listData.model.debtDay}}</span>位客户欠款已达<span>{{listData.model.days}}天</span>
                  </p>
                  <img :src="more1">
                </div>
              </div>
            </div>
            <div class="warning">
              <div class="itemWarning" >
                <div class="itemWarningtitle">
                  <img :src="remind">
                  <span>会员提醒</span>
                </div>
                <div class="itemWarningMsg">
                  <p>消费提醒:</p>
                  <p style="margin-left: 20px;">生日提醒:</p>
                  <p style="margin-left: 20px;">项目到期:</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pending">
          <div class="head">
            <div class="title">
              <h4>待办事项</h4>
            </div>
          </div>
          <div class="pendingMsg">
            <div class="itemPending">
              <div class="itemPendingNumber">
                {{listData.model.clientCount}}
                <span>订单</span>
              </div>
              <div class="itemPendingTyp">预约单—待服务</div>
            </div>
            <div class="itemPending">
              <div class="itemPendingNumber">
                {{listData.model.orderCount}}
                <span>订单</span>
              </div>
              <div class="itemPendingTyp">服务订单—待付款</div>
            </div>
            <div class="itemPending">
              <div class="itemPendingNumber">
                {{listData.model.wxOrderCount}}
                <span>订单</span>
              </div>
              <div class="itemPendingTyp">微信商城代发货</div>
            </div>
          </div>
        </div>
        <div class="system">
          <div class="head">
            <div class="title">
              <h4>系统消息</h4>
              <img :src="more" >
              <p>查看更多</p>
            </div>
          </div>
          <div class="systemMsg">
            <div class="itemSystemMsg">
              <span> 07.08</span>
              <span> 全新模块上线 </span>
            </div>
            <div class="itemSystemMsg">
              <span> 07.08</span>
              <span> 全新模块上线 </span>
            </div>
            <div class="itemSystemMsg">
              <span> 07.08</span>
              <span> 全新模块上线 </span>
            </div>
            <div class="itemSystemMsg">
              <span> 07.08</span>
              <span> 全新模块上线 </span>
            </div>
          </div>
        </div>
      </Col>
    </Row>
    <div class="footer">
      <div class="quick" @click="handleOpenCard">
        <div class="features">
          <img :src="openCard1">
          <span>快速开单</span>
        </div>
      </div>
      <div class="quick" @click="handleRecharge">
        <div class="features">
          <img :src="recharge">
          <span>会员充值</span>
        </div>
      </div>
      <div class="quick" @click="handleAppointment">
        <div class="features">
          <img :src="addAppion">
          <span>新增预约</span>
        </div>
      </div>
      <div class="customerSerive">
        <img :src="customerService">
        <p>在线客服</p>
        <p>服务热线：400-000-0000</p>
      </div>
      <div class="qqWeChat">
        <img :src="qq1">
        <p>QQ在线</p>
      </div>
      <div class="qqWeChat">
        <img :src="evaluation" style="margin-top: -27px">
        <p>服务评价</p>
      </div>
      <div class="install">
        <div>
          <img :src="install">
          <p>安卓端</p>
        </div>
        <div>
          <img :src="ios">
          <p>苹果端</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import more from '@/assets/images/icon/more.png'
import addMember from '@/assets/images/icon/addMember.png'
import openCardRecharge from '@/assets/images/icon/openCardRecharge.png'
import allMember from '@/assets/images/icon/allMember.png'
import balance from '@/assets/images/icon/balance.png'
import earlyWarning from '@/assets/images/icon/earlyWarning.png'
import quality from '@/assets/images/icon/quality.png'
import earlyWarning1 from '@/assets/images/icon/earlyWarning1.png'
import remind from '@/assets/images/icon/remind.png'
import more1 from '@/assets/images/icon/more1.png'
import openCard1 from '@/assets/images/icon/openCard1.png'
import recharge from '@/assets/images/icon/recharge.png'
import addAppion from '@/assets/images/icon/addAppion.png'
import customerService from '@/assets/images/icon/customerService.png'
import qq1 from '@/assets/images/icon/qq1.png'
import evaluation from '@/assets/images/icon/evaluation.png'
import ios from '@/assets/images/icon/ios.png'
import install from '@/assets/images/icon/install.png'
import date from '@/filter/module/date'
// import { getAllBoard } from '@/api/finance/business'
import { getWarningInfo, getWarningReceivable, getOrderTodo } from '@/api/home/home'
import userStore from '@/store/module/user'
import { VeHistogram } from 'v-charts'
import 'v-charts/lib/style.css'
export default{
  components: {
    VeHistogram
  },
  data () {
    return {
      more,
      addMember,
      openCardRecharge,
      allMember,
      balance,
      earlyWarning,
      quality,
      earlyWarning1,
      more1,
      remind,
      openCard1,
      recharge,
      addAppion,
      customerService,
      qq1,
      evaluation,
      ios,
      install,
      chartSettings: {
        metrics: ['金额'],
        dimension: ['类型']
      },
      chartData: {
        columns: ['类型', '金额'],
        rows: [
        ],
        loading: false
      },
      listData: {
        filter: {
          endDate: '',
          date: '',
          timeTyp: 2,
          store: userStore.state.storeId
        },
        model: {
          highStockCoun: '',
          lowStockCount: '',
          expiryDateCount: '',
          orderCount: '',
          clientCount: '',
          wxOrderCount: ''
        }
      }
    }
  },
  methods: {
    initView () {
      let _this = this
      _this.loadList()
      _this.loadEarlyWarning()
    },
    loadEarlyWarning () {
      let _this = this
      _this.listData.loading = false
      getWarningInfo().then(res => {
        _this.listData.model.highStockCoun = res.data.highStockCoun
        _this.listData.model.lowStockCount = res.data.lowStockCount
        _this.listData.model.expiryDateCount = res.data.expiryDateCount
        _this.listData.loading = false
      }).catch(() => {
        _this.listData.loading = false
      })
      getWarningReceivable().then(res => {
        _this.listData.model.amount = res.data.amount
        _this.listData.model.days = res.data.days
        _this.listData.model.debt = res.data.debt
        _this.listData.model.debtDay = res.data.debtDay
        _this.listData.loading = false
      }).catch(() => {
        _this.listData.loading = false
      })
      getOrderTodo().then(res => {
        _this.listData.model.orderCount = res.data.orderCount
        _this.listData.model.clientCount = res.data.clientCount
        _this.listData.model.wxOrderCount = res.data.wxOrderCount
        _this.listData.loading = false
      }).catch(() => {
        _this.listData.loading = false
      })
    },
    loadList () {
      let _this = this
      _this.chartData.loading = true
      _this.chartData.rows = []
      // getAllBoard(_this.listData.filter).then(res => {
      //   _this.chartData.loading = false
      //   _this.listData.list = res.data
      //   _this.chartData.rows.push(
      //     { '类型': '实收金额', '金额': res.data[0].today },
      //     { '类型': '会员消耗', '金额': res.data[1].today },
      //     { '类型': '开卡充值', '金额': res.data[2].today },
      //     { '类型': '服务销售', '金额': res.data[3].today },
      //     { '类型': '产品销售', '金额': res.data[4].today }
      //   )
      //   _this.$nextTick(() => {
      //     _this.$refs.chatRef.resize()
      //   })
      // }).catch(() => {
      //   _this.chartData.loading = false
      // })
    },
    handleBusiness () {
      let _this = this
      _this.$router.push({ name: 'financeBusiness', params: { name: 'integral' } })
    },
    handleOpenCard () {
      let _this = this
      _this.$router.push({ name: 'cashierBill' })
    },
    handleRecharge () {
      let _this = this
      _this.$router.push({ name: 'cashierRecharge' })
    },
    handleAppointment () {
      let _this = this
      _this.$router.push({ name: 'cashierAppointment' })
    },
    handleStock () {
      let _this = this
      _this.$router.push({ name: 'stockReportWarn' })
    },
    handleQuality () {
      let _this = this
      _this.$router.push({ name: 'stockReportQuality' })
    },
    handleReceivable () {
      let _this = this
      _this.$router.push({ name: 'financeReceivableList' })
    }
  },
  mounted () {
    let _this = this
    _this.initView()
    _this.listData.filter.date = date(new Date(), 'yyyy-MM-dd hh:ss')
    _this.listData.filter.endDate = date(new Date(), 'yyyy-MM-dd hh:ss')
  }
}
</script>
