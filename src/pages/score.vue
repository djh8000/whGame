<template>
  <div class="scoreWrap">
  	<div class="userInfo"><img src="http://placehold.it/106x106"></div>
    <p class="name">MC热狗</p>
    <div id="mescroll" class="mescroll mescroll-hardware">
      <ul class="scoreList">
        <li class="item clearfix" v-for="(item, index) in list" :key="'score' + index">
          <span class="time">{{item.createTimeLong | date}}</span>
          <span class="gameName">{{item.gameName}}</span>
          <span class="score"><b :class="{high: item.isConversion == 0}">{{item.scoreGain}}</b>&nbsp;分</span>
          <span class="dhBtn" v-if="item.isConversion == 1 && item.scoreGain != 0">已兑换</span>
          <span class="dhBtn high" @click="sureChange(item.createTimeLong, item.scoreDetailId, index)" v-if="item.isConversion == 0 && item.scoreGain != 0">兑换</span>
        </li>
      </ul>
    </div>
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
  import MeScroll from 'mescroll.js'
  import 'mescroll.js/mescroll.min.css'
  export default {
    data () {
      return {
        list: [],
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
      this.mescroll = new MeScroll('mescroll', {
        up: {
          callback: this.getList,
          isBounce: false,
          noMoreSize: 5
        }
      })
    },
    methods: {
      getList (page) {
        let times = 1
        if (page.num !== 1) {
          times = 1000
        }
        setTimeout(() => {
          let userDt = {
            page: page.num,
            limit: page.size
          }
          scorelist(userDt).then(res => {
            if (page.num === 1) {
              this.list = res.data.scoreDetailList
            } else {
              this.list = [...this.list, ...res.data.scoreDetailList]
            }
            const hasNext = this.list.length === page.size
            this.mescroll.endSuccess(this.list.length, hasNext)
          })
        }, times)
      },
      sureChange (date, id, index) {
        this.nowChange.date = date
        this.nowChange.id = id
        this.nowChange.index = index
        this.surePopup = true
      },
      exchange () {
        let exDt = {
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
    .mescroll{
      height: 800px;
    }
    .scoreList{
      width: 640px;
      color: #ffffff;
      font-size: 30px;
      margin: 0 auto;
      .item{
        border-radius: 10px;
        height: 80px;
        line-height: 80px;
        padding-left: 20px;
        overflow: hidden;
        margin-bottom: 14px;
        display: flex;
        align-items: center;
        .time{
          width: 175px;
        }
        .gameName{
          width: 150px;
          font-size: 28px;
          margin-right: 20px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .score{
          width: 100px;
          background:url(../assets/img/m-icon4.png) no-repeat left center;
          padding-left: 30px;
          .high{
            color: #ffcc00;
          }
        }
        .dhBtn{
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
      margin-bottom: 50px;
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