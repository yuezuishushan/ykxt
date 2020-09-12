<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      {{globalUserData.userName}} -  {{globalUserData.storeName}}
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="updatePassword">修改密码</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>

    <Modal v-model="updatePasswordData.visible" :loading="updatePasswordData.loading" :mask-closable="false"
           title="密码修改" @on-ok="handleUpdatePasswordSubmit" @on-cancel="handleUpdatePasswordCancel" ok-text="修改">
      <Form ref="updatePasswordModalForm" :model="updatePasswordData.formData" :rules="updatePasswordData.formRule"
            :label-width="100">
        <FormItem label="旧密码" prop="oldPwd">
          <Input type="password" v-model="updatePasswordData.formData.oldPwd"></Input>
        </FormItem>
        <FormItem label="新密码" prop="pwd">
          <Input type="password" v-model="updatePasswordData.formData.pwd"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="confirmPwd">
          <Input type="password" v-model="updatePasswordData.formData.confirmPwd"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
import { updatePassword } from '@/api/user'
export default {
  name: 'User',
  props: {
    userAvatar: {
      type: String,
      default: ''
    }
  },
  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.updatePasswordData.formData.pwd) {
        callback(new Error('两次密码输入不一致!'))
      } else {
        callback()
      }
    }
    return {
      updatePasswordData: {
        visible: false,
        loading: true,
        formData: {
          oldPwd: '',
          pwd: '',
          confirmPwd: ''
        },
        formRule: {
          oldPwd: [
            { required: true, message: '旧密码不能为空', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '新密码不能为空', trigger: 'blur' }
          ],
          confirmPwd: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validatePassCheck, trigger: 'blur' }
          ]
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'handleLogout'
    ]),
    logout () {
      this.handleLogout().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
    resetUpdatePasswordModal () {
      let _this = this
      _this.updatePasswordData.formData = { oldPwd: '', pwd: '', confirmPwd: '' }
      _this.$refs['updatePasswordModalForm'].resetFields()
    },
    handleUpdatePasswordSubmit () {
      let _this = this
      _this.$refs['updatePasswordModalForm'].validate((valid) => {
        if (valid) {
          updatePassword(_this.updatePasswordData.formData).then(() => {
            _this.$Message.success('修改成功')
            _this.updatePasswordData.visible = false
          }).catch(() => {
            _this.updatePasswordData.loading = false
            _this.$nextTick(() => {
              _this.updatePasswordData.loading = true
            })
          })
        } else {
          _this.updatePasswordData.loading = false
          _this.$nextTick(() => {
            _this.updatePasswordData.loading = true
          })
        }
      })
    },
    handleUpdatePasswordCancel () {
      let _this = this
      _this.resetUpdatePasswordModal()
    },
    handleClick (name) {
      let _this = this
      switch (name) {
        case 'updatePassword':
          _this.resetUpdatePasswordModal()
          _this.updatePasswordData.visible = true
          break
        case 'logout':
          this.logout()
          break
      }
    }
  }
}
</script>
