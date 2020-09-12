<style lang="less" scoped>
  @import './index.less';
</style>
<template>
  <div class="phone-box-view">
    <div class="phone-wrap">
      <div class="screen-view">
        <slot v-if="mode === 'slot'"></slot>
        <iframe ref="phoneIframeRef" v-if="mode === 'iframe'" :src="src"></iframe>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'phoneBox',
  data () {
    return {
      iframeReady: false
    }
  },
  props: {
    value: {
      type: Object,
      default: null
    },
    mode: {
      type: String,
      default: 'slot'
    },
    src: {
      type: String,
      default: ''
    },
    cmd: {
      type: String,
      default: ''
    }
  },
  methods: {
    sendMessage (params) {
      let _this = this
      if (_this.$refs.phoneIframeRef && _this.$refs.phoneIframeRef.contentWindow) {
        _this.$refs.phoneIframeRef.contentWindow.postMessage({
          cmd: _this.cmd,
          params: params
        }, '*')
      }
    }
  },
  mounted () {
    let _this = this
    window.addEventListener('message', event => {
      let tempMessageData = event.data
      if (tempMessageData.cmd === 'status') {
        _this.iframeReady = tempMessageData.params.iframeReady
        _this.sendMessage(_this.value)
      }
    })
  },
  destroyed () {
    let _this = this
    _this.iframeReady = false
    window.removeEventListener('message', () => {})
  }
}
</script>
