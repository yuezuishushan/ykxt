<style lang="less">
  @import './index.less';
</style>
<template>
  <div>
    <Modal title="预览" v-model="visible" class="_preview-wrapper" @on-cancel="handleCancelPreview" :width="860">
      <Carousel v-model="current" v-if="visible" radius-dot>
        <CarouselItem v-for="(item, index) in carouselList" :key="index" v-bind:class="{active: current === index}">
          <div class="media-wrapper">
            <Button class="remove-btn" v-if="removeBtn" size="small" icon="md-remove" type="error" shape="circle" @click="handleRemoveItem(item.url, index)"></Button>
            <img v-lazy="item.url" v-if="item.type === 'image'">
            <video :src="item.url" v-if="item.type === 'video'" controls></video>
            <audio :src="item.url" v-if="item.type === 'audio'" controls></audio>
            <embed :src="item.url" v-if="item.type === 'pdf'" type="application/pdf"></embed>
            <iframe v-if="item.type === 'excel'" :src="`https://view.officeapps.live.com/op/view.aspx?src=${item.url}`"></iframe>
            <iframe v-if="item.type === 'word'" :src="`https://view.officeapps.live.com/op/view.aspx?src=${item.url}`"></iframe>
            <iframe v-if="item.type === 'ppt'" :src="`https://view.officeapps.live.com/op/view.aspx?src=${item.url}`"></iframe>
          </div>
        </CarouselItem>
      </Carousel>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'preview',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: null
    },
    index: {
      type: Number,
      default: 0
    },
    removeBtn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false,
      current: 0,
      carouselList: []
    }
  },
  watch: {
    value: {
      handler (newVal) {
        let _this = this
        _this.visible = newVal
        if (!newVal) {
          _this.carouselList = []
          _this.current = 0
        }
      },
      immediate: true,
      deep: true
    },
    index: {
      handler (newVal) {
        let _this = this
        _this.current = newVal
      },
      immediate: true,
      deep: true
    },
    list: {
      handler (newVal) {
        let _this = this
        _this.carouselList = []
        const getFileType = url => {
          let tempType = ''
          if (/.jpg/i.test(url) || /.jpeg/i.test(url) || /.png/i.test(url)) {
            tempType = 'image'
          } else if (/.mp4/i.test(url)) {
            tempType = 'video'
          } else if (/.mp3/i.test(url) || /.ogg/i.test(url) || /.wav/i.test(url)) {
            tempType = 'audio'
          } else if (/.pdf/i.test(url)) {
            tempType = 'pdf'
          } else if (/.xls/i.test(url) || /.xlsx/i.test(url) || /.csv/i.test(url)) {
            tempType = 'excel'
          } else if (/.doc/i.test(url) || /.docx/i.test(url)) {
            tempType = 'word'
          } else if (/.ppt/i.test(url) || /.pptx/i.test(url)) {
            tempType = 'ppt'
          }
          return tempType
        }
        if (typeof newVal === 'string') {
          _this.carouselList.push({
            url: url,
            type: getFileType(newVal)
          })
        } else {
          for (let i in newVal) {
            _this.carouselList.push({
              url: newVal[i],
              type: getFileType(newVal[i])
            })
          }
        }
        if (_this.carouselList.length > 0) {
          _this.current = _this.current > (_this.carouselList.length - 1) ? (_this.carouselList.length - 1) : _this.current
        } else {
          _this.$emit('input', false)
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleCancelPreview () {
      let _this = this
      _this.$emit('input', false)
    },
    handleRemoveItem (url, index) {
      let _this = this
      _this.$emit('on-remove', {
        url: url,
        index: index
      })
    }
  }
}
</script>
