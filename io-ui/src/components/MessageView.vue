<template>
  <div class="message-wrap">
    <div class="messages" ref="messages">
      <div
        class="item"
        :class="{'sys': item.type==='sys','self': item.self}"
        v-for="item in messageList"
        :key="item.id"
      >
        <span v-if="item.type==='sys'" class="msg-sys">
          {{item.text}}
        </span>
        <template v-else>
          <div class="des">
            <span class="nickName">{{item.nickName}}</span>
            <span class="time">{{item.date | formatDate}}</span>
          </div>
          
          <span class="text">{{item.text}}</span>
        </template>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['messageList'])
  },
  filters: {
    formatDate(date) {
      date = new Date(date)
      let hour = ('0' + date.getHours()).slice(-2)
      let min = ('0' + date.getMinutes()).slice(-2)
      let sec = ('0' + date.getSeconds()).slice(-2)
      return `${hour}:${min}:${sec}` 
    }
  },
  watch: {
    messageList: function() {
      let messages = this.$refs.messages
      console.dir(messages)
      this.$nextTick(() => {
        messages.scrollTop = messages.scrollHeight + 100
      })
      
    }
  }

}
</script>

<style lang="scss" scoped>
  .message-wrap {
    padding: 6px 0;
    height: 100%;
    overflow: hidden;
  }
  .messages {
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: scroll;
    margin-right: -20px;

    .item {
      margin: 4px 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 60%;

      &.sys {
        max-width: 100%;
      }

      &.self {
        align-items: flex-end;
        align-self: flex-end;
      }
    }

    .msg-sys {
      font-size: 12px;
      align-self: center;
      color: #999;
    }

    .des {
      line-height: 2;
      flex-grow: 0;
      font-size: 12px;
      color: #999;
      .nickName {
        color: $theme-color;
      }
      .time {
        margin-left: 4px;
      }
    }
    .text {
      line-height: 2;
      flex-grow: 0;
      padding: 0 8px;
      background: $bg-color;
      color: #333;
      border-radius: 4px;
    }
  }
</style>