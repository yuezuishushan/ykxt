<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-logo">
      <img src="../../assets/images/logo_text.png">
    </div>
    <Carousel v-model="carouselData.active">
      <CarouselItem v-for="(item, index) in carouselData.list" :key="index">
        <img src="../../assets/images/test/login_test.png">
      </CarouselItem>
    </Carousel>
    <div class="login-con">
      <login-form></login-form>
    </div>
  </div>
</template>
<script>
import LoginForm from '_c/login-form'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      carouselData: {
        active: 0,
        list: [
          { url: '' },
          { url: '' }
        ]
      }
    }
  },
  components: {
    LoginForm
  },
  methods: {
    ...mapMutations(['setTagNavList'])
  },
  created () {
    this.setTagNavList([])
  }
}
</script>
