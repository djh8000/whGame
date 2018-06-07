import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const home = () => import(/* webpackChunkName:'home' */ '../pages/home.vue')
const puzzle = () => import(/* webpackChunkName:'game' */ '../pages/puzzle/index.vue')
const game = () => import(/* webpackChunkName:'game' */ '../pages/puzzle/game.vue')
const know = () => import(/* webpackChunkName:'know' */ '../pages/know/index.vue')
const gameOver = () => import(/* webpackChunkName:'gameOver' */ '../pages/gameOver.vue')
const scoreList = () => import(/* webpackChunkName:'scoreList' */ '../pages/scoreList.vue')

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
      name: 'gameOver',
      path: '/gameOver',
      component: gameOver
    },
    {
      name: 'scoreList',
      path: '/scoreList',
      component: scoreList
    }
  ]
})
