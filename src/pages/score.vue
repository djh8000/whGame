<template>
  <div class="scoreWrap">
  	<div class="userInfo"><img src="http://placehold.it/106x106"></div>
    <p class="name">MC热狗</p>
    <ul class="scoreList">
      <li class="item clearfix" v-for="(item, index) in list" :key="'score' + index">
        <span class="time">{{item.createTimeLong | date}}</span>
        <span class="score"><b :class="{high: item.isConversion == 0}">{{item.scoreGain}}</b>&nbsp;分</span>
        <span class="dhBtn" v-if="item.isConversion == 1">已兑换</span>
        <span class="dhBtn high" @click="sureChange(item.createTimeLong, item.scoreDetailId, index)" v-if="item.isConversion == 0 && item.scoreGain != 0">兑换</span>
      </li>
    </ul>
    <router-link class="btn backHome" to="/"></router-link>
    <!-- 确认兑换弹层 -->
    <mt-popup class="timesPopup surePopup" v-model="surePopup" popup-transition="popup-fade">
      <i class="closeBtn" @click="surePopup = false"></i>
      <p class="tips">您确定要兑换<br>{{nowChange.date | date}}的积分吗？</p>
      <mt-button class="btn sureBtn" @click="exchange"></mt-button>
    </mt-popup>
    <!-- 继续兑换弹层 -->
    <mt-popup class="timesPopup goonPopup" v-model="goonPopup" popup-transition="popup-fade">
      <p class="tips">您已成功兑换<br>{{nowChange.date | date}}的积分!</p>
      <mt-button class="btn goonBtn" @click="goonPopup = false "></mt-button>
    </mt-popup>
  </div>
</template>
<script>
  import {scorelist, exchangeScore} from '../plugins/api'
  export default {
    data () {
      return {
        list: [],
        page: 1,
        limit: 10,
        surePopup: false,
        goonPopup: false,
        nowChange: {
          date: '',
          id: '',
          index: 0
        }
      }
    },
    mounted () {
      let userDt = {
        userId: this.$store.state.userId
      }
      scorelist(userDt).then(res => {
        this.list = res.data.scoreDetailList
      })
    },
    methods: {
      sureChange (date, id, index) {
        this.nowChange.date = date
        this.nowChange.id = id
        this.nowChange.index = index
        this.surePopup = true
      },
      exchange () {
        let exDt = {
          userId: this.$store.state.userId,
          scoreDetailId: this.nowChange.id
        }
        exchangeScore(exDt).then(res => {
          this.surePopup = false
          this.goonPopup = true
          this.$set(this.list[this.nowChange.index], 'isConversion', 1)
        })
      }
    },
    filters: {
      date (val) {
        var d = new Date(val)
        var year = d.getFullYear()
        var month = d.getMonth() + 1
        var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
        return year + '.' + month + '.' + day
      }
    }
  }
</script>
<style lang="scss" scoped>
	.scoreWrap{
		min-height: 100vh;
    background: url('../assets/img/m-bg3.png') center bottom no-repeat;
    overflow: auto;
    position: relative;
    .userInfo{
      width: 110px;
      height: 110px;
      border-radius: 50%;
      border: 4px solid #fff;
      margin: 30px auto 0; 
      overflow: hidden;
      img{
        display: block;
        width: 106px;
        height: 106px;
      }
    }
    .name{
      font-size: 28px;
      line-height: 64px;
      color: #ffffff;
      text-align: center;
      margin-bottom: 20px;
    }
    .scoreList{
      width: 640px;
      color: #ffffff;
      font-size: 30px;
      margin: 0 auto;
      height: 755px;
      overflow: auto;
      .item{
        border-radius: 10px;
        height: 80px;
        line-height: 80px;
        padding-left: 25px;
        overflow: hidden;
        margin-bottom: 14px;
        .time{
          width: 195px;
          float: left;
        }
        .score{
          width: 237px;
          float: left;
          background:url(../assets/img/m-icon4.png) no-repeat left center;
          padding-left: 38px;
          .high{
            color: #ffcc00;
          }
        }
        .dhBtn{
          float: left;
          width: 120px;
          height: 48px;
          margin-top: 13px;
          border-radius: 24px;
          text-align: center;
          line-height: 48px;
          font-size: 30px;
          color: #ffffff;
          &.high{
            font-weight: bold;
            font-size: 24px;
            background-color: #fff;
          }
        }
      }
    }
    .backHome{
      margin-top: 35px;
      margin-bottom: 30px;
    }
    .surePopup{
      .tips{
        margin-top: 105px;
      }
      &:after{
        display: none;
      }
    }
    .goonPopup{
      .tips{
        margin-top: 124px;
      }
      &:after{
        background: #fff url(../assets/img/m-icon3.png) no-repeat center 25px;
      }
    }
    .sureBtn{
      margin-top: 35px;
      margin-bottom: 30px;
      background: url(../assets/img/btn2-11.png) no-repeat;
    }
    .goonBtn{
      margin-top: 35px;
      margin-bottom: 30px;
      background: url(../assets/img/btn2-10.png) no-repeat;
    }
	}
</style>