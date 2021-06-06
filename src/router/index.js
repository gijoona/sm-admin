import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Items from '../views/Items.vue'
import Accounts from '../views/Accounts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/items',
    name: 'Items',
    component: Items
  },
  {
    path: '/accounts',
    name: 'Accounts',
    component: Accounts
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
