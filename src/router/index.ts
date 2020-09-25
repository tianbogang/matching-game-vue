import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/', name: '', component: () => import('../views/game/newgame.vue') },
  { path: '/newgame', name: 'NewGame', component: () => import('../views/game/newgame.vue') },
  { path: '/playgame', name: 'PlayGame', component: () => import('../views/game/playgame.vue') },
  { path: '/gameover', name: 'GameOver', component: () => import('../views/game/gameover.vue') }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
