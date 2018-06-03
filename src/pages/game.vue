<template>
  <div id="mainBody">
    <div id="wrap">
      <div id="left">
        <ul>
          <li>
            选择图片：
            <select id="sel_img">
              <option value="1" selected="selected">图1</option>
              <option value="2">图2</option>
              <option value="3">图3</option>
            </select>
          </li>
          <li id="start">
            开始游戏:<span>开始</span>
          </li>
          <li id="level">
            难度选择:<span>3x3</span>
          </li>		
        </ul>
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
      img: '/static/img/img1.jpg',
      level: 2
    }
    this.pg = new PuzzleGame(initData)
  }
}
</script>

<style lang="scss" scoped>
</style>




