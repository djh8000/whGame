import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const home = () => import(/* webpackChunkName:'home' */ '../pages/home.vue')
const puzzle = () => import(/* webpackChunkName:'game' */ '../pages/puzzle/index.vue')
const game = () => import(/* webpackChunkName:'game' */ '../pages/puzzle/game.vue')

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: home,
      meta: {
        nobg: true
      }
    },
    {
      name: 'puzzle',
      path: '/puzzle',
      component: puzzle
    },
    {
      name: 'puzzlePlay',
      path: '/puzzle/play/:id',
      component: game
    }
  ]
})
