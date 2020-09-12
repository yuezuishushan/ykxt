<style lang="less">
  @import './index.less';
</style>
<template>
  <div class="quill-editor-wrap">
    <quill-editor ref="quillEditorRef" v-model="editorContent" :options="editorOption"></quill-editor>
  </div>
</template>
<script>
import { quillEditor, Quill } from 'vue-quill-editor'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
import imageFormat from '@/filter/module/image'
import { uploadConfig } from '@/api/common'
import { getToken, createSign } from '@/libs/util'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Quill.register('modules/ImageExtend', ImageExtend)
export default {
  name: 'editor',
  components: {
    quillEditor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    excludeOption: {
      type: Array,
      default: null
    }
  },
  data () {
    let tempContainer = JSON.parse(JSON.stringify(container))
    if (this.excludeOption) {
      for (let i in this.excludeOption) {
        for (let j in tempContainer) {
          let tempIndex = tempContainer[j].findIndex(item => (item === this.excludeOption[i]))
          if (tempIndex >= 0) {
            tempContainer[j].splice(tempIndex, 1)
            break
          }
        }
      }
    }
    return {
      editorOption: {
        placeholder: '请输入内容',
        modules: {
          ImageExtend: {
            loading: true,
            name: 'file',
            size: 2,
            action: uploadConfig.url,
            response: (res) => {
              return imageFormat(res.data)
            },
            headers: (xhr) => {
              let tempTimestamp = new Date().getTime().toString()
              xhr.setRequestHeader('Authorization', getToken())
              xhr.setRequestHeader('timestamp', tempTimestamp)
              xhr.setRequestHeader('sign', createSign(tempTimestamp))
            },
            sizeError: () => {
              this.$Notice.warning({
                title: '文件大小超过限制',
                desc: '文件太大，请上传不超过2M的文件.'
              })
            },
            start: () => {},
            end: () => {},
            error: () => {},
            change: (xhr, formData) => {}
          },
          toolbar: {
            container: tempContainer,
            handlers: {
              'image': function () {
                QuillWatch.emit(this.quill.id)
              }
            },
            theme: 'snow'
          }
        }
      },
      editorContent: ''
    }
  },
  watch: {
    value (val) {
      this.editorContent = val
    },
    editorContent: {
      handler (newVal) {
        let _this = this
        _this.$emit('input', newVal)
      },
      immediate: true
    }
  }
}
</script>
