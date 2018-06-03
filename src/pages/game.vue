<template>
  <div id="mainBody">
    <div id="wrap">
      <div id="left">
        <span id="start">开始</span>
        <span id="level">3x3</span>
      </div>
      <div id="right">
        <div id="imgArea"></div>
      </div>
    </div>
  </div>
</template>

<script>
import '../../static/css/game.css'
import PuzzleGame from '../plugins/game'
export default {
  name: 'home',
  data () {
    return {
      pg: null
    }
  },
  mounted () {
    const initData = {
      img: '/static/img/img4.jpg',
      level: 0
    }
    this.pg = new PuzzleGame(initData)
    this.pg.complete = function () {
      console.log(8888)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>




