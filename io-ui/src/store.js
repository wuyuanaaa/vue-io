import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connectStatus: false,
    loginStatus: false,
    nickName: '',
    users: [],
    messageList: []
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
    }
  },
  actions: {
    SOCKET_connect({commit}) {
      commit('CHANGE_CONNECT_STATUS', true)
    },
    SOCKET_message({commit}, data) {
      commit('ADD_MESSAGE', data)
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
    }
  }
})
