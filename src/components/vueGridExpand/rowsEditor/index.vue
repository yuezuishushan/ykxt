<style lang="less" scoped>
  .row-editor{
    display: flex;
    align-items: center;
    height: 100%;
    text-align: center;
    .actions{
      display: none;
      flex: 1;
      line-height: 0;
      .btn{
        height: 20px;
        width: 20px;
        padding: 0;
        margin: 2px;
        display: inline-block;
        &.add{
          background: url(../../../assets/images/icon/icon_add.png) no-repeat center;
          background-size: 100%;
        }
        &.remove{
          background: url(../../../assets/images/icon/icon_remove.png) no-repeat center;
          background-size: 100%;
        }
      }
    }
    .label{
      display: block;
      flex: 1;
    }
    &:hover{
      .actions{
        display: block;
      }
      .label{
        display: none;
      }
    }
  }
</style>
<template>
  <div class="row-editor">
    <div class="actions">
      <div class="btn add" @click.stop="handleAdd"></div>
      <div class="btn remove" @click.stop="handleRemove"></div>
    </div>
    <div class="label">{{index + 1}}</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      index: -1
    }
  },
  methods: {
    handleAdd () {
      const _this = this
      _this.params.handleAddRecord({ index: _this.index })
    },
    handleRemove () {
      const _this = this
      _this.params.handleRecordRecord({ index: _this.index })
    }
  },
  beforeMount () {
    const _this = this
    _this.index = _this.params.rowIndex
  }
}
</script>
