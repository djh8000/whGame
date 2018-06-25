<template>
  <div id="gameBody">
    <p>倒计时: <span>{{time}}秒</span></p>
    <p>难度: <span>{{nowLevel}}</span>&emsp;&emsp;已连续答对 <em class="col">6</em>/12 题</p>
    <div id="wrap">
      <div id="imgArea"></div>
    </div>
    <p class="nextQuestion">下一题: <em>3</em> 秒</p>
    <!-- 预览图片弹层 -->
    <mt-popup class="levelPopup lookPopup" v-model="lookPopup" :closeOnClickModal="false" popup-transition="popup-fade">
      <i class="closeBtn" @click="Play"></i>
      <div class="img">
        <img :src="gameParams.img" alt="">
      </div>
      <p class="time">
        <span class="s1">预计倒计时:</span>
        <span class="s2">{{lookTime}}</span>
        <span class="s3">S</span>
      </p>
      <mt-button class="btn" @click="Play"></mt-button>
    </mt-popup>
  </div>
</template>

<script>
import PuzzleGame from '../../plugins/game'
import {grefGameTime} from '../../plugins/api'
export default {
  name: 'home',
  data () {
    return {
      pg: null,
      gameParams: {
        img: '/static/img/img1.jpg',
        level: 0,
        levelArr: [[3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 10]],
        suc: this.success
      },
      time: 120,
      lookPopup: true,
      lookTime: 30
    }
  },
  mounted () {
    let gameDetail = JSON.parse(sessionStorage.getItem('gameDetail'))
    this.gameParams.img = gameDetail.questionContent
    this.gameParams.level = gameDetail.gameLevel - 3
    this.time = gameDetail.gameTimeLeft
    this.lookTime = gameDetail.gameViewTime
    this.pg = new PuzzleGame(this.gameParams)
    this.pg.imgSplit()
    this.lookInit()
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
    Play () {
      grefGameTime().then(res => {
        this.lookPopup = false
        this.pg.gameState()
        this.timeStart()
      })
    },
    timeStart () {
      this.timeInit = setInterval(() => {
        this.time--
        if (this.time <= 0) {
          this.$router.push('/gameover')
        }
      }, 1000)
    },
    lookInit () {
      this.timeInit1 = setInterval(() => {
        this.lookTime--
        if (this.lookTime <= 0) {
          this.Play()
        }
      }, 1000)
    },
    success () {
      clearInterval(this.timeInit)
      alert('恭喜您，成功完成本次游戏！')
      // this.$router.push('/gameover')
    }
  },
  watch: {
    lookPopup (status) {
      if (status) {
        this.lookInit()
      } else {
        clearInterval(this.timeInit1)
      }
    }
  }
}
</script>

<style lang="scss">
  #gameBody{
    min-height: 100vh;
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
    .lookPopup{
      width: 620px;
      height: 770px;
      background-color: #ffffff;
      border-radius: 24px;
      padding: 0 50px;
      .img{
        width: 375px;
        height: 375px;
        border: solid 1px #b6b6b6;
        padding: 14px;
        margin: 88px auto 0;
        img{
          width: 100%;
        }
      }
      .time{
        text-align: center;
        margin-bottom: 35px;
        color: #333;
        .s1{
          font-size: 36px;
          letter-spacing: 2px;
        }
        .s2{
          font-size: 48px;
          color: #fe4800;
        }
        .s3{
          font-size: 30px;
        }
      }
      .btn{
        background: url('../../assets/img/btn2-4.png') center center no-repeat;
        margin-top: 0;
      }
    }
    .nextQuestion{
      color: #333333;
      font-size: 30px;
      text-align: center;
      line-height: 130px;
      em{
        font-size: 48px;
        color: #ff5a52;
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




