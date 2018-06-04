import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const home = () => import(/* webpackChunkName:'home' */ '../pages/home.vue')
const game = () => import(/* webpackChunkName:'game' */ '../pages/game.vue')

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: home
    },
    {
      name: 'game',
      path: '/game/:id',
      component: game
    }
  ]
})
