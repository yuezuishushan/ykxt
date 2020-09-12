<style lang="less">
  @import './index.less';
</style>
<template>
  <div class="login-wrap">
    <div class="wrap-header">欢迎登录后台管理系统</div>
<!--    <Login @on-submit="handleSubmit">-->
<!--      <UserName name="userName" enter-to-submit />-->
<!--      <Password name="passWord" enter-to-submit />-->
<!--      <div class="auto-login">-->
<!--        <Checkbox v-model="autoLogin" :true-value="1" :false-value="0">自动登录</Checkbox>-->
<!--      </div>-->
<!--      <Submit :loading="loginLoading"/>-->
<!--    </Login>-->
<!--    <p class="login-tip"></p>-->
     <Form ref="modalForm" :model="loginModel" :rules="rules" :label-width="0">
      <FormItem prop="userName" style="margin-top: 10px">
        <Input v-model="loginModel.userName" type="text">
          <Icon type="ios-contact-outline" slot="prefix" />
        </Input>
      </FormItem>
       <FormItem prop="passWord">
         <Input v-model="loginModel.passWord" type="password">
           <Icon type="ios-lock-outline" slot="prefix" />
         </Input>
       </FormItem>
       <Button type="info" @click="handleSubmit()" style="width: 100%">登录</Button>
    </Form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { localSave } from '@/libs/util'
export default {
  name: 'LoginForm',
  props: {},
  data () {
    return {
      loginLoading: false,
      autoLogin: 0,
      loginModel: {
        userName: '',
        passWord: ''
      },
      rules: {
        userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        passWord: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      // 'getUserInfo'
    ]),
    handleSubmit () {
      const _this = this
      _this.loginLoading = true
      _this.$refs['modalForm'].validate((valid) => {
        if (valid) {
          _this.handleLogin(_this.loginModel).then(res => {
            console.log('REMEMBER_TOKEN===' + _this.autoLogin)
            localSave('REMEMBER_TOKEN', _this.autoLogin)
            _this.$router.push({
                name: 'home'
              })
            // _this.getUserInfo().then(user => {
            //   _this.loginLoading = false
            //   console.log(user)
            //   _this.$router.push({
            //     name: user.defaultRoute
            //   })
            // }).catch(() => {
            //   _this.loginLoading = false
            // })
          }).catch(() => {
            _this.loginLoading = false
          })
        } else {
          _this.loginLoading = false
        }
      })
    }
  }
}
</script>
<style lang="less">
  .ivu-login-captcha{
    .ivu-form-item-content{
      .ivu-btn {
        padding: 0;
        img {
          vertical-align: middle;
        }
      }
    }
  }
</style>
