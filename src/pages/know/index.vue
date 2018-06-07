<template>
  <div class="knowIndex">
    <div class="mainTit"></div>
    <div class="knowRole">
      <img src="../../assets/img/m-icon5.png" class="roleTit">
      <div class="scrollbar">
        <p>游戏规则介绍内容文字游戏规则游戏规则介绍内容文字游戏规则游戏规则介绍内容文字游戏规则游戏规则介绍内容文字游戏规则游戏规则介绍内容文字游戏规则游戏规则介绍内容文字游戏规则游戏规则介绍内容文字游戏规则游戏规则游戏规则介绍内容文字游戏规则游戏规则介绍内容文字游戏规则游戏规则介绍内容文字游戏规则游戏规则介绍内容文字游戏规则游戏规则介绍内容文字游戏规则游戏规则介绍内容文字游戏规则游戏规则介绍内容文字游戏规则游戏规则</p>
      </div>
    </div>
    <mt-button class="btn btn1" @click="timesPopup = true"></mt-button>
    <router-link class="btn btn2" to="/"></router-link>
    <!-- 次数不够弹层 -->
    <mt-popup class="timesPopup" v-model="timesPopup" popup-transition="popup-fade">
      <p class="tips">今日机会已用完啦，<br>明天再来哦！</p>
      <router-link class="btn backHome" to="/"></router-link>
    </mt-popup>
  </div>
</template>

<script>
  export default {
    name: 'know',
    data () {
      return {
        timesPopup: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .knowIndex{
    height: 100vh;
    background: url('../../assets/img/m-bg2.png') center bottom no-repeat;
    overflow: hidden;
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
    .btn1{
      margin-top: 40px;
    }
    .btn2{
      margin-top: 30px;
    }
    // 次数不够弹层
    .timesPopup{
      width: 620px;
      height: 410px;
      border-radius: 20px;
      background-color: #fff;
      margin-top: -42px;
      &:after{
        content: '';
        width: 303px;
        height: 303px;
        background: #fff url(../../assets/img/m-icon.png) no-repeat center 35px;
        border-radius: 50%;
        position: absolute;
        top: -78px;
        line-height: 303px;
        left: 159px;
        z-index: -1;
      }
      .tips{
        color: #333333;
        font-size: 36px;
        line-height: 48px;
        text-align: center;
        margin-top: 115px;
      }
      .backHome{
        margin: 35px auto 0;
      }
    }
  }
</style>

