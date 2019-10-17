<template>
  <div class="userList-wrap">
    <div class="title">
      当前人数 {{users.length}}
    </div>
    <div class="content">
      <div
        class="user-item"
        v-for="user in users" 
        :key="user.id"
      >
        <div class="nickName">{{user.nickName}}</div>
        <div class="enterTime">{{user.enterTime | formatTime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['users'])
    
  },
  filters: {
    formatTime(time) {
      let date = new Date(time)
      let hour = ('0' + date.getHours()).slice(-2)
      let min = ('0' + date.getMinutes()).slice(-2)

      return `${hour}:${min}`
    }
  },
  mounted() {
    console.log(this.users)
  }
}
</script>

<style lang="scss" scoped>
  .userList-wrap {
    height: 100%;
    overflow: hidden;
    color: $theme-color;
    border-right: 1px solid $border-color;
  }
  .title {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    border-bottom: 1px solid $border-color;
  }
  .content {
    margin-right: -20px;
    height: calc(100% - 30px);
    overflow-y: scroll;
  }

  .user-item {
    padding: 0 10px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .nickName {
      font-size: 14px;
      color: $theme-color;
    }
    .enterTime {
      font-size: 12px;
      color: #999;
    }
  }
  
</style>
