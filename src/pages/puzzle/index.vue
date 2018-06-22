<template>
  <div class="puzzleHome" v-if="gameInfo">
    <img class="title" src="../../assets/img/icon2-1.png" alt="">
    <div class="p-main">
      <div class="scroll scrollbar" v-html="gameInfo.gameRule"></div>
    </div>
    <mt-button class="btn actionBtn" @click="gameStart"></mt-button>
    <router-link class="btn scoreBtn" to="/scorelist"></router-link>
    <!-- 难度选择弹层 -->
    <!-- <mt-popup class="levelPopup" v-model="levelPopup" popup-transition="popup-fade">
      <i class="closeBtn" @click="levelPopup = false"></i>
      <div class="img">
        <img :src="require(`../../assets/img/level${level}.png`)" alt="">
      </div>
      <p>请选择难易程度:</p>
      <ul class="levels">
        <li @click="level = 0">
          <i :class="{active: level == 0}"></i>
          <span>3X3</span>
        </li>
        <li @click="level = 1">
          <i :class="{active: level == 1}"></i>
          <span>4X4</span>
        </li>
        <li @click="level = 2">
          <i :class="{active: level == 2}"></i>
          <span>5X5</span>
        </li>
      </ul>
      <mt-button class="btn" @click="lookBtn"></mt-button>
    </mt-popup> -->
    <!-- 次数不够弹层 -->
    <mt-popup class="timesPopup" v-model="timesPopup" popup-transition="popup-fade">
      <p class="tips">今日机会已用完啦，<br>明天再来哦！</p>
      <router-link class="btn backHome" to="/"></router-link>
    </mt-popup>
  </div>
</template>

<script>
  import {getGameInfo, authLogin, getGameTimes} from '../../plugins/api'
  export default {
    name: 'puzzle',
    data () {
      return {
        gameInfo: null,
        timesPopup: false,
        // levelPopup: false,
        level: 0,
        userId: 10,
        userName: 'djh'
      }
    },
    mounted () {
      getGameInfo({id: this.$route.params.id}).then(res => {
        this.gameInfo = res.data.gameInfo
      })
    },
    methods: {
      gameStart () {
        authLogin({userId: this.userId, userName: this.userName}).then(res => {
          let timesData = {
            userId: this.userId,
            activityId: this.$store.state.activity.activity.activityId,
            gameMainId: this.gameInfo.gameMainId
          }
          getGameTimes(timesData).then(res => {
            // this.levelPopup = true
            this.$router.push(`/puzzle/play/${this.$route.params.id}`)
            // if (res.data.canPlay === 1) {
            //   this.levelPopup = true
            // } else {
            //   this.timesPopup = true
            // }
          })
        })
      },
      lookBtn () {
        // this.levelPopup = false
        this.$router.push(`/puzzle/play/${this.level + 3}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .puzzleHome{
    min-height: 100vh;
    overflow: auto;
    position: relative;
    .title{
      display: block;
      margin: 40px auto 20px;
    }
    .p-main{
      width: 628px;
      height: 544px;
      display: flex;
      margin: 0 auto;
      justify-content: center;
      align-items: center;
      .scroll{
        width:460px;
        height:360px;
        font-size: 28px;
        p{
          text-align: justify;
          margin: 15px 0;
          line-height: 1.3;
        }
      }
    }
    .actionBtn{
      margin-top: 50px;
    }
    .scoreBtn{
      margin-top: 30px;
    }
    .levelPopup{
      width: 620px;
      height: 770px;
      background-color: #ffffff;
      border-radius: 24px;
      padding: 0 50px;
      .img{
        width: 290px;
        height: 290px;
        border: solid 1px #b6b6b6;
        margin: 70px auto 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      p{
        margin: 50px 0 35px;
        font-size: 32px;
      }
      .levels{
        display: flex;
        justify-content: space-between;
        li{
          i{
            display: inline-block;
            box-sizing: border-box;
            width: 62px;
            height: 62px;
            border-radius: 100%;
            border: 2px solid #999;
            vertical-align: middle;
          }
          span{
            font-size: 36px;
            vertical-align: middle;
          }
          i.active{
            background: url('../../assets/img/m-radio.png') -68px center no-repeat;
            border: none;
          }
        }
      }
      .btn{
        background: url('../../assets/img/btn2-5.png') center center no-repeat;
        margin-top: 60px;
      }
    }
  }
</style>

