<template>
  <div class="puzzleHome">
    <img class="title" src="../../assets/img/icon2-1.png" alt="">
    <div class="p-main">
      <div class="scroll">
        <p>1.规则规则规则规则规则规则规则规则</p>
        <p>2.规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则</p>
        <p>3.规则规则规则规则规则规则规则规则</p>
        <p>4.规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则</p>
        <p>5.规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则</p>
      </div>
    </div>
    <mt-button class="btn actionBtn" @click="levelPopup = true"></mt-button>
    <router-link class="btn scoreBtn" to="/"></router-link>
    <!-- 难度选择弹层 -->
    <mt-popup class="levelPopup" v-model="levelPopup" popup-transition="popup-fade">
      <i class="closeBtn" @click="levelPopup = false"></i>
      <div class="img">
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
      <mt-button class="btn" @click="levelPopup = false; lookPopup = true"></mt-button>
    </mt-popup>
    <!-- 预览图片弹层 -->
    <mt-popup class="levelPopup lookPopup" v-model="lookPopup" popup-transition="popup-fade">
      <i class="closeBtn" @click="lookPopup = false"></i>
      <div class="img">
        <img src="/static/img/img3.jpg" alt="">
      </div>
      <p class="time">
        <span class="s1">预计倒计时:</span>
        <span class="s2">10</span>
        <span class="s3">S</span>
      </p>
      <router-link class="btn" :to="`/puzzle/play/${level}`"></router-link>
    </mt-popup>
  </div>
</template>

<script>
  export default {
    name: 'puzzle',
    data () {
      return {
        levelPopup: false,
        lookPopup: false,
        level: 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  .puzzleHome{
    height: 100vh;
    overflow: hidden;
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
        width:480px;
        height:360px;
        overflow-y: auto;
        font-size: 28px;
        p{
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
    .lookPopup{
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
  }
</style>

