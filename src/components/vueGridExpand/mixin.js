const mixin = {
  methods: {
    getValue () {
      return this.value
    },
    isCancelBeforeStart () {
      return this.cancelBeforeStart
    }
  }
}

export default mixin
