<style lang="less">
  @import './index.less';
</style>
<template>
  <div class="row-wrapper">
    <div class="actions">
      <Button icon="md-add" type="success" ghost size="small" @click.stop="handleAdd"></Button>
      <Button icon="md-remove" class="removeBtn" type="error" ghost size="small" @click.stop="handleRemove"></Button>
    </div>
    <div class="label">{{label}}</div>
  </div>
</template>
<script>
export default {
  name: 'TablesActionRow',
  props: {
    label: {
      type: [String, Number],
      default: '0'
    }
  },
  methods: {
    handleAdd () {
      this.$emit('add')
    },
    handleRemove () {
      this.$emit('remove')
    }
  }
}
</script>
