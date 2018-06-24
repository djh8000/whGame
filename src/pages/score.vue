<template>
  <div class="scoreWrap">
  	<div class="userInfo"><img src="http://placehold.it/106x106"></div>
    <p class="name">MC热狗</p>
    <ul class="scoreList">
      <li class="item clearfix">
        <span class="time">2018.5.12</span>
        <span class="score"><b class="high">196</b>&nbsp;分</span>
        <span class="dhBtn high">兑换</span>
      </li>
      <li class="item clearfix">
        <span class="time">2018.5.12</span>
        <span class="score"><b>196</b>&nbsp;分</span>
        <span class="dhBtn">已兑换</span>
      </li>
    </ul>
    <router-link class="btn backHome" to="/"></router-link>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        list: []
      }
    },
    mounted () {
  
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
	}
</style>