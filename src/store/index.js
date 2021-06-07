import Vue from 'vue'
import Vuex from 'vuex'
import category from './modules/category.store'
import item from './modules/item.store'
import account from './modules/account.store'
import user from './modules/user.store'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    item,
    category,
    account,
    user
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
})