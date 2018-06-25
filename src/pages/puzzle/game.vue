<template>
  <div id="gameBody" v-if="detail">
    <p>倒计时: <span>{{detail.gameTimeLeft}}秒</span></p>
    <p>难度: <span>{{detail.gameLevel + 'x' + detail.gameLevel}}</span>&emsp;&emsp;当前第 <em class="col">{{detail.currentQIndex}}</em>/{{detail.gameDetailCount}} 题</p>
    <div id="wrap">
      <div id="imgArea"></div>
    </div>
    <p class="nextQuestion" v-if="nowSuccess">下一题: <em>{{nextTime}}</em> 秒</p>
    <!-- 预览图片弹层 -->
    <mt-popup class="levelPopup lookPopup" v-model="lookPopup" :closeOnClickModal="false" popup-transition="popup-fade">
      <i class="closeBtn" @click="Play"></i>
      <div class="img">
        <img :src="detail.questionContent" alt="">
      </div>
      <p class="time">
        <span class="s1">预计倒计时:</span>
        <span class="s2">{{detail.gameViewTime}}</span>
        <span class="s3">S</span>
      </p>
      <mt-button class="btn" @click="Play"></mt-button>
    </mt-popup>
  </div>
</template>

<script>
import PuzzleGame from '../../plugins/game'
import {grefGameTime, postResult} from '../../plugins/api'
export default {
  name: 'puzzlePlay',
  data () {
    return {
      detail: JSON.parse(sessionStorage.getItem('gameDetail')) || null,
      pg: null,
      gameParams: {
        img: '',
        level: 0,
        levelArr: [[3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 10]],
        suc: this.success
      },
      lookPopup: true,
      nextTime: 3,
      nowSuccess: false
    }
  },
  mounted () {
    this.lookInit()
  },
  methods: {
    // 游戏打乱初始化
    gameInit () {
      this.gameParams.img = this.detail.questionContent
      this.gameParams.level = this.detail.gameLevel - 3
      this.pg = new PuzzleGame(this.gameParams)
    },
    // 弹层关闭开始游戏
    Play () {
      grefGameTime().then(res => {
        clearInterval(this.time2)
        this.lookPopup = false
        this.gameInit()
        this.timeInit()
      })
    },
    // 总游戏倒计时
    timeInit () {
      this.time1 = setInterval(() => {
        this.detail.gameTimeLeft--
        if (this.detail.gameTimeLeft <= 0) {
          clearInterval(this.time1)
          this.$router.push('/gameover')
        }
      }, 1000)
    },
    // 预览倒计时
    lookInit () {
      this.lookPopup = true
      clearInterval(this.time1)
      this.time2 = setInterval(() => {
        this.detail.gameViewTime--
        if (this.detail.gameViewTime <= 0) {
          clearInterval(this.time2)
          this.Play()
        }
      }, 1000)
    },
    // 下一题倒计时
    nextInit () {
      this.nowSuccess = true
      this.time3 = setInterval(() => {
        this.nextTime--
        if (this.nextTime <= 0) {
          clearInterval(this.time3)
          postResult({questionSelected: this.gameParams.img}).then(res => {
            if (res.data.gameDetail) {
              this.detail = res.data.gameDetail
              sessionStorage.setItem('gameDetail', JSON.stringify(this.detail))
              this.nowSuccess = false
              this.nextTime = 3
              this.lookInit()
            } else {
              this.$router.push('/gameover')
            }
          })
        }
      }, 1000)
    },
    // 拼图完成回调
    success () {
      this.$msg('完成拼图！')
      this.nextInit()
    }
  },
  destroyed () {
    clearInterval(this.time1)
    clearInterval(this.time2)
    clearInterval(this.time3)
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




