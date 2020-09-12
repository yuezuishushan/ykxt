import { uploadConfig } from '@/api/common'
import { getToken, createSign } from '@/libs/util'

/**
 * 文件上传限制
 * handleUploadImageFormatError,handleUploadImageMaxSize,handleUploadAudioFormatError,handleUploadAudioMaxSize,handleUploadVideoFormatError,handleUploadVideoMaxSize,handleUploadExcelFormatError,handleUploadExcelMaxSize即将作废
 * 统一用handleUploadFormatError和handleUploadMaxSize
 */
const bytesToSize = limit => {
  let size = ''
  if (limit < 0.1 * 1024) {
    size = `${limit.toFixed(2)}B`
  } else if (limit < 0.1 * 1024 * 1024) {
    size = `${(limit / 1024).toFixed(2)}KB`
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {
    size = `${(limit / (1024 * 1024)).toFixed(2)}MB`
  } else {
    size = `${(limit / (1024 * 1024 * 1024)).toFixed(2)}GB`
  }

  let sizeStr = `${size}`
  let index = sizeStr.indexOf('.')
  let dou = sizeStr.substr(index + 1, 2)
  if (dou === '00') {
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size
}
const uploadMixin = {
  data () {
    return {
      uploadConfig: {
        url: uploadConfig.url,
        headers: {},
        maxImageSize: 2048,
        maxVideoSize: 20480,
        maxAudioSize: 20480,
        maxExcelSize: 204800,
        excelFormat: ['xls', 'xlsx'],
        imageFormat: ['jpg', 'jpeg', 'png'],
        audioFormat: ['mp3', 'ogg', 'wav'],
        videoFormat: ['mp4'],
        bothImageAndVideoFormat: ['jpg', 'jpeg', 'png', 'mp4']
      }
    }
  },
  methods: {
    beforeUploadSetting (file) {
      let _this = this
      _this.uploadConfig.headers.Authorization = getToken()
      let tempTimestamp = new Date().getTime().toString()
      _this.uploadConfig.headers.timestamp = tempTimestamp
      _this.uploadConfig.headers.sign = createSign(tempTimestamp)
      return true
    },
    handleUploadImageFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: file.name + '格式不正确, 请选择正确格式图片.'
      })
    },
    handleUploadImageMaxSize (file) {
      this.$Notice.warning({
        title: '超过文件大小限制',
        desc: '图片不能超过2M.'
      })
    },
    handleUploadAudioFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: file.name + '格式不正确, 请选择正确格式音频.'
      })
    },
    handleUploadAudioMaxSize (file) {
      this.$Notice.warning({
        title: '超过文件大小限制',
        desc: '音频不能超过20M.'
      })
    },
    handleUploadVideoFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: file.name + '格式不正确, 请选择正确格式视频.'
      })
    },
    handleUploadVideoMaxSize (file) {
      this.$Notice.warning({
        title: '超过文件大小限制',
        desc: '视频不能超过20M.'
      })
    },
    handleUploadExcelFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: file.name + '格式不正确, 请选择正确格式文件.'
      })
    },
    handleUploadExcelMaxSize (file) {
      this.$Notice.warning({
        title: '超过文件大小限制',
        desc: '文件不能超过200M.'
      })
    },
    handleUploadFormatError (file) {
      const _this = this
      _this.$Notice.warning({
        title: '文件格式不正确',
        desc: file.name + '格式不正确, 请选择正确格式文件.'
      })
    },
    handleUploadMaxSize (file) {
      const _this = this
      let tempFormat = file.name.split('.').pop().toLowerCase()
      let tempMaxSize = 0
      if (_this.imageFormat.includes(tempFormat)) {
        tempMaxSize = _this.maxImageSize
      } else if (_this.audioFormat.includes(tempFormat)) {
        tempMaxSize = _this.maxAudioSize
      } else if (_this.videoFormat.includes(tempFormat)) {
        tempMaxSize = _this.maxVideoSize
      } else if (_this.excelFormat.includes(tempFormat)) {
        tempMaxSize = _this.maxExcelSize
      }
      _this.$Notice.warning({
        title: '超过文件大小限制',
        desc: `文件不能超过${bytesToSize(tempMaxSize * 1024)}.`
      })
    },
    checkUploadSuccess (data, callback) {
      const _this = this
      if (data.res.code !== 100) {
        _this.$Message.error(data.res.msg)
        data.fileList.splice(data.fileList.indexOf(data.file), 1)
        return
      }
      if (callback) {
        callback()
      }
    }
  }
}

export default uploadMixin
