<template>
  <div id="gameBody">
    <p>倒计时: <span>{{time}}秒</span></p>
    <p>难度: <span>{{nowLevel}}</span></p>
    <div id="wrap">
      <div id="imgArea"></div>
    </div>
  </div>
</template>

<script>
import PuzzleGame from '../../plugins/game'
export default {
  name: 'home',
  data () {
    return {
      pg: null,
      gameParams: {
        img: '/static/img/img1.jpg',
        level: this.$route.params.id,
        levelArr: [[3, 3], [4, 4], [5, 5]],
        suc: this.success
      },
      time: 30,
      timeInit: null
    }
  },
  mounted () {
    this.pg = new PuzzleGame(this.gameParams)
    this.pg.complete = this.success
    this.timeInit = setInterval(() => {
      this.time--
      console.log(this.time)
      if (this.time <= 0) {
        this.$router.push('/gameOver')
      }
    }, 1000)
  },
  destroyed () {
    clearInterval(this.timeInit)
  },
  computed: {
    nowLevel () {
      return this.gameParams.levelArr[this.gameParams.level][0] +
      'x' + this.gameParams.levelArr[this.gameParams.level][1]
    }
  },
  methods: {
    success () {
      clearInterval(this.timeInit)
      alert('恭喜您，成功完成本次游戏！')
      this.$router.push('/gameOver')
    }
  }
}
</script>

<style lang="scss">
  #gameBody{
    height: 100vh;
    padding-top: 80px;
    p{
      color: #fff;
      font-size: 30px;
      line-height: 72px;
      text-indent: 35px;
      span{
        font-size: 48px;
        text-indent: 10px;
      }
    }
  }
  #wrap{
    width: 680px;
    height: 680px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px auto 0;
    #imgArea{
      width: 660px;
      height: 660px;
      margin: 0 auto;
      position:relative;
      div.imgCell{
        float:left;
        width:73px;
        height:73px;
        border:1px solid #fff;
        border-radius:4px;
        position:absolute;
        z-index:10;
        box-shadow:0px 0px 8px #fff;
        transition-property:background-position;
        transition-duration:300ms;
        transition-timing-function:ease-in-out;
      }
    }   
  } 
</style>




