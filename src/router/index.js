import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const home = () => import(/* webpackChunkName:'home' */ '../pages/home.vue')
const puzzle = () => import(/* webpackChunkName:'game' */ '../pages/puzzle/index.vue')
const game = () => import(/* webpackChunkName:'game' */ '../pages/puzzle/game.vue')
const know = () => import(/* webpackChunkName:'know' */ '../pages/know/index.vue')
const gameover = () => import(/* webpackChunkName:'gameover' */ '../pages/gameover.vue')
const score = () => import(/* webpackChunkName:'score' */ '../pages/score.vue')

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
      name: 'gameover',
      path: '/gameover',
      component: gameover
    },
    {
      name: 'score',
      path: '/score',
      component: score
    }
  ]
})
