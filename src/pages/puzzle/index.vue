<template>
  <div class="puzzleHome" v-if="gameInfo">
    <img class="title" src="../../assets/img/icon2-1.png" alt="">
    <div class="p-main">
      <div class="scroll scrollbar" v-html="gameInfo.gameRule"></div>
    </div>
    <mt-button class="btn actionBtn" @click="gameStart"></mt-button>
    <router-link class="btn scoreBtn" to="/score"></router-link>
    <!-- 次数不够弹层 -->
    <mt-popup class="timesPopup" v-model="timesPopup" popup-transition="popup-fade">
      <p class="tips">今日机会已用完啦，<br>明天再来哦！</p>
      <router-link class="btn backHome" to="/"></router-link>
    </mt-popup>
  </div>
</template>

<script>
  import {getGameInfo, authLogin} from '../../plugins/api'
  export default {
    name: 'puzzle',
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
          userName: this.$store.state.userName,
          activityId: this.$store.state.activity.activity.activityId,
          gameMainId: this.gameInfo.gameMainId
        }
        authLogin(userData).then(res => {
          this.$Indicator.close()
          if (res.data.canPlay === 1) {
            let detail = JSON.stringify(res.data.gameDetail)
            sessionStorage.setItem('gameDetail', detail)
            this.$router.push('/puzzlePlay')
          } else {
            this.timesPopup = true
          }
        })
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
  }
</style>

