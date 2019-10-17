<template>
  <div class="wrap">
    <TopBar></TopBar>
    <div class="main">
      <UserList class="userList-container"></UserList>
      <div class="content-container">
        <div class="content" :class="{'blur':!loginStatus}">
          <MessageView class="content-message"></MessageView>
          <InputView class="content-input"></InputView>
        </div>
        <div class="cover" v-if="!loginStatus">
          <div class="info">输入用户名，即可加入聊天室</div>
          <div>
            <input class="nickName" type="text" v-model="nickName">
          </div>
          <div>
            <button class="btn" @click="handleLogin">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TopBar from  '@/components/TopBar'
import UserList from '@/components/UserList'
import MessageView from '@/components/MessageView'
import InputView from '@/components/InputView'

import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    TopBar,
    UserList,
    MessageView,
    InputView
  },
  data() {
    return {
      nickName: ''
    }
  },
  computed: {
    ...mapState(['loginStatus'])
  },
  methods: {
    handleLogin() {
      if(!this.nickName.length) {
        return
      }
      this.$socket.emit('login',{
        nickName: this.nickName
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -400px;
    margin-top: -340px;
    width: 800px;
    height: 680px;
    /* background-color: red; */
    box-shadow: 0 0 10px $theme-color;
    border: 1px solid $border-color;
  }

  .main {
    display: flex;
    padding-top: $topBar-height;
    height: 100%;
  }

  .userList-container {
    flex: 0 0 $userList-width;
  }

  .content-container {
    position: relative;
    flex: 1;

    .content,
    .cover {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      &.blur {
        filter: blur(5px)
      }
    }

    .content-message {
      flex: 1;
      border-bottom: 1px solid $border-color;
    }

    .content-input {
      flex: 0 0 180px;
    }

    .cover {
      justify-content: center;
      .info {
        font-size: 13px;
        color: #999;
        line-height: 2;
      }

      .nickName {
        padding: 4px 10px;
        margin: 10px 0;
      }

      .btn {
        height: 30px;
        padding: 0 10px;
        background-color: transparent;
        border: 1px solid $border-color;
        border-radius: 4px;
        font-size: 13px;
        outline: none;
        cursor: pointer;
        &:active {
          box-shadow: 0 0 10px $bg-color;
        }
      }
    }

  }

</style>
