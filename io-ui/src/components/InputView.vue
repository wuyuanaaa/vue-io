<template>
  <div class="input-wrap">
    <div class="util-bar">
      工具栏占位
    </div>
    <textarea class="textarea" v-model="value" @keydown.enter.prevent="handleSendClick">

    </textarea>
    <div class="send">
      <button class="send-btn" @click="handleSendClick" :disabled="!value.length">发送</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      value: ''
    }
  },
  computed: {
    ...mapState(['nickName'])
  },
  methods: {
    handleSendClick() {
      if(!this.value.length) {
        return
      }
      this.$socket.emit('message',{
        text: this.value,
        nickName: this.nickName
      })
      
      this.value = ''
    }
  }

}
</script>

<style lang="scss" scoped>
  .input-wrap {
    display: flex;
    flex-direction: column;
  }

  .util-bar {
    flex: 0 0 40px;
    line-height: 40px;
    font-size: 12px;
    color: #ddd;
    background-color: $theme-color-tint;
  }

  .textarea {
    padding: 10px;
    flex: 1;
    resize: none;
    width: 100%;
    border: none;
    outline: none;
  }

  .send {
    flex: 0 0 40px;

    .send-btn {
      margin-right: 10px;
      float: right;
      width: 60px;
      height: 30px;
      border: none;
      font-size: 13px;
      color: #fff;
      background-color: $theme-color;
      border-radius: 4px;
      outline: none;
      cursor: pointer;
      &:disabled {
        background-color: #ccc;
        cursor: default;
        &:hover {
          background-color: #ccc;
        }
      }

      &:hover {
        background-color: $theme-color-tint;
      }
      &:active {
        padding-right: 0.5px;
        line-height: 31px;
      }
    }
  }
</style>
