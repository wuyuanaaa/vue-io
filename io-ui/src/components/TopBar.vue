<template>
  <div class="topBar" :class="{'connect': connectStatus}">
    <span class="titile">mao-chat</span>
    -
    <span class="status">{{connectStatus ? '已连接' : '已断线'}}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['connectStatus'])
  }
}
</script>

<style lang="scss" scoped>
  .topBar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: $topBar-height;
    line-height: $topBar-height;
    background-color: #eee;
    color: #999;
    &.connect {
      color: rgb(0, 115, 160);
    }
  }
</style>