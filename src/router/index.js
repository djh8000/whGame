import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const home = () => import(/* webpackChunkName:'home' */ '../pages/home.vue')
const puzzle = () => import(/* webpackChunkName:'game' */ '../pages/puzzle/index.vue')
const game = () => import(/* webpackChunkName:'game' */ '../pages/puzzle/game.vue')
const know = () => import(/* webpackChunkName:'know' */ '../pages/know/index.vue')
const knowgame = () => import(/* webpackChunkName:'know' */ '../pages/know/game.vue')
const gameover = () => import(/* webpackChunkName:'gameover' */ '../pages/gameover.vue')
const score = () => import(/* webpackChunkName:'score' */ '../pages/score.vue')

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: home,
      meta: {
        title: '首页'
      }
    },
    {
      name: 'puzzle',
      path: '/puzzle/:id',
      component: puzzle,
      meta: {
        isbg: true,
        title: '游戏规则'
      }
    },
    {
      name: 'puzzlePlay',
      path: '/puzzlePlay',
      component: game,
      meta: {
        isLogin: true,
        title: '游戏中'
      }
    },
    {
      name: 'know',
      path: '/know/:id',
      component: know,
      meta: {
        isbg: true,
        title: '游戏规则'
      }
    },
    {
      name: 'knowPlay',
      path: '/knowplay',
      component: knowgame,
      meta: {
        isLogin: true,
        title: '游戏中'
      }
    },
    {
      name: 'gameover',
      path: '/gameover',
      component: gameover,
      meta: {
        isLogin: true,
        title: '游戏结束'
      }
    },
    {
      name: 'score',
      path: '/score',
      component: score,
      meta: {
        isLogin: true,
        title: '我的成绩'
      }
    }
  ]
})
