import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.config.productionTip = false

Vue.prototype.$http = axios

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
