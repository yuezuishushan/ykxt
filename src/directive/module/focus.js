import $ from 'jquery'
export default {
  inserted: function (el, binding) {
    if (binding.value !== false) {
      const tagNameList = ['INPUT', 'SELECT', 'TEXTAREA']
      setTimeout(() => {
        if (tagNameList.includes($(el).prop('tagName')) && $(el).is(':visible')) {
          $(el).focus()
        } else if (!$(el).find('input[type!=hidden]').length) {
          $(el).find('.ivu-select-selection').focus()
        } else {
          $(el).find('input:visible').focus()
        }
      }, 100)
    }
  },
  update: function (el, binding) {
    if (binding.value !== false) {
      const tagNameList = ['INPUT', 'SELECT', 'TEXTAREA']
      setTimeout(() => {
        if (tagNameList.includes($(el).prop('tagName')) && $(el).is(':visible')) {
          $(el).focus()
        } else if (!$(el).find('input[type!=hidden]').length) {
          $(el).find('.ivu-select-selection').focus()
        } else {
          $(el).find('input:visible').focus()
        }
      }, 100)
    }
  }
}
