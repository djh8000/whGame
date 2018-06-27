<template>
  <div class="knowIndex" v-if="gameInfo">
    <div class="mainTit"></div>
    <div class="knowRole">
      <img src="../../assets/img/m-icon5.png" class="roleTit">
      <div class="scrollbar">
        <p v-html="gameInfo.gameRule"></p>
      </div>
    </div>
    <mt-button class="btn actionBtn" @click="gameStart"></mt-button>
    <mt-button class="btn scoreBtn" @click="goScore"></mt-button>
    <!-- 次数不够弹层 -->
    <mt-popup class="timesPopup" v-model="timesPopup" popup-transition="popup-fade">
      <p class="tips">今日机会已用完啦，<br>明天再来哦！</p>
      <router-link class="btn backHome" to="/"></router-link>
    </mt-popup>
  </div>
</template>

<script>
  import {getGameInfo, authLogin, gameStart} from '../../plugins/api'
  export default {
    name: 'know',
    data () {
      return {
        gameInfo: null,
        timesPopup: false
      }
    },
    mounted () {
      getGameInfo({id: this.$route.params.id}).then(res => {
        this.gameInfo = res.data.gameInfo
      })
    },
    methods: {
      gameStart () {
        this.$Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
        let userData = {
          userId: this.$store.state.userId,
          userName: this.$store.state.userName
        }
        authLogin(userData).then(res => {
          let gameData = {
            activityId: this.$store.state.activity.activity.activityId,
            gameMainId: this.gameInfo.gameMainId
          }
          gameStart(gameData).then(res => {
            this.$Indicator.close()
            if (res.data.canPlay === 1) {
              let detail = JSON.stringify(res.data.gameDetail)
              sessionStorage.setItem('gameDetail', detail)
              this.$router.push('/knowPlay')
            } else {
              this.timesPopup = true
            }
          })
        })
      },
      goScore () {
        this.$Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
        let userData = {
          userId: this.$store.state.userId,
          userName: this.$store.state.userName
        }
        authLogin(userData).then(res => {
          this.$Indicator.close()
          this.$router.push('/score')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .knowIndex{
    min-height: 100vh;
    background: url('../../assets/img/m-bg2.png') center bottom no-repeat;
    overflow: auto;
    position: relative;
    .mainTit{
      width: 428px;
      height: 291px;
      margin-top:50px;
      margin-left: 186px;
    }
    .knowRole{
      width: 620px;
      height: 450px;
      margin:65px auto 0;
      background-color: #fff;
      background-repeat: no-repeat;
      background-position: left 31px top 22px,right 31px top 22px;
      border-radius: 25px;
      padding: 80px 35px 80px 57px;
      position: relative;
      .roleTit{
        position: absolute;
        left: 50%;
        margin: -130px;
        top: 95px;
      }
      
      p{
        color: #5f4f4b;
        font-size: 28px;
        line-height: 48px;
        text-align: justify;
      }
    }
    .actionBtn{
      margin-top: 40px;
    }
    .scoreBtn{
      margin-top: 30px;
      margin-bottom: 50px;
    }
  }
</style>

