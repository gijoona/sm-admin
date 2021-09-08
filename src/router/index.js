import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Items from '../views/Items.vue'
import Accounts from '../views/Accounts.vue'
import Langs from '../views/Langs.vue'
import Login from '../views/Login.vue'

import store from './../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Main,
    meta: { requiresAuth: true, icon: 'mdi-home-city' }
  },
  {
    path: '/items',
    name: 'Items',
    component: Items,
    meta: { requiresAuth: true, icon: 'mdi-folder' }
  },
  {
    path: '/accounts',
    name: 'Accounts',
    component: Accounts,
    meta: { requiresAuth: true, icon: 'mdi-account-multiple' }
  },
  {
    path: '/langs',
    name: 'Langs',
    component: Langs,
    meta: { requiresAuth: true, icon: 'mdi-translate' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { icon: 'mdi-login' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['user/isLogin'] || store.getters['user/isLogin'] === 'false') {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
