import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connectStatus: false,
    loginStatus: false,
    nickName: '',
    users: [],
    messageList: [],
    isVisible: '',
    unread: 0
  },
  mutations: {
    CHANGE_CONNECT_STATUS: (state, status) => {
      state.connectStatus = status
    },
    ADD_MESSAGE: (state, data) => {
      state.messageList.push(data)
    },
    SET_USERS: (state, data) => {
      state.users = data
    },
    CHANGE_LOGIN_STATUS: (state, status) => {
      state.loginStatus = status
    },
    SET_NICKNAME: (state, name) => {
      state.nickName = name
    },
    SET_VISIBLE: (state, val) => {
      state.isVisible = val
    },
    ADD_UNREAD: (state) => {
      state.unread++
      document.title = `[${state.unread}条新消息]mao-chat`
    },
    CLEAR_UNREAD: (state) => {
      state.unread = 0
      document.title = 'mao-chat'
    }
  },
  actions: {
    SOCKET_connect({commit}) {
      commit('CHANGE_CONNECT_STATUS', true)
    },
    SOCKET_message({commit, state}, data) {
      commit('ADD_MESSAGE', data)
      if(!state.isVisible) {
        commit('ADD_UNREAD')
      }
    },
    SOCKET_users({commit}, data) {
      commit('SET_USERS', data.users)
    },
    SOCKET_self({commit}, data) {
      commit('ADD_MESSAGE', data)
    },
    SOCKET_login({commit}, data) {
      if(data.status) {
        commit('SET_NICKNAME', data.nickName)
        commit('CHANGE_LOGIN_STATUS', true)
      } else {
        alert(data.msg)
      }
    },
    visibilitychange({commit}, data) {
      commit('SET_VISIBLE', data)
    },
    clearUnread({commit}) {
      commit('CLEAR_UNREAD')
    }
  }
})
