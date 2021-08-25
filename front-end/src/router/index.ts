import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Lobby from '../views/Lobby.vue'
import Table from '../views/Table.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/lobby',
    name: 'Lobby',
    component: Lobby,
  },
    {
    path: '/table',
    name: 'Table',
    component: Table
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
