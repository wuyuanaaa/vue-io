import Vue from 'vue'


import 'normalize.css/normalize.css'
import '@/assets/styles/common.scss'

import App from './App.vue'
import router from './router'
import store from './store'

import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: process.env.VUE_APP_HOST,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
