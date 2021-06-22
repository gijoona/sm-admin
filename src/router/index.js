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
    name: 'Main',
    component: Main,
    meta: { requiresAuth: true }
  },
  {
    path: '/items',
    name: 'Items',
    component: Items,
    meta: { requiresAuth: true }
  },
  {
    path: '/accounts',
    name: 'Accounts',
    component: Accounts,
    meta: { requiresAuth: true }
  },
  {
    path: '/langs',
    name: 'Langs',
    component: Langs,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['user/isLogin']) {
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
