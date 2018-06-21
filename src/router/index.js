import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const home = () => import(/* webpackChunkName:'home' */ '../pages/home.vue')
const puzzle = () => import(/* webpackChunkName:'game' */ '../pages/puzzle/index.vue')
const game = () => import(/* webpackChunkName:'game' */ '../pages/puzzle/game.vue')
const know = () => import(/* webpackChunkName:'know' */ '../pages/know/index.vue')
const knowgame = () => import(/* webpackChunkName:'know' */ '../pages/know/game.vue')
const gameover = () => import(/* webpackChunkName:'gameover' */ '../pages/gameover.vue')
const scorelist = () => import(/* webpackChunkName:'scorelist' */ '../pages/scorelist.vue')

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: home
    },
    {
      name: 'puzzle',
      path: '/puzzle',
      component: puzzle,
      meta: {
        isbg: true
      }
    },
    {
      name: 'puzzlePlay',
      path: '/puzzle/play/:id',
      component: game
    },
    {
      name: 'know',
      path: '/know',
      component: know,
      meta: {
        isbg: true
      }
    },
    {
      name: 'knowPlay',
      path: '/know/play',
      component: knowgame
    },
    {
      name: 'gameover',
      path: '/gameover',
      component: gameover
    },
    {
      name: 'scorelist',
      path: '/scorelist',
      component: scorelist
    }
  ]
})
