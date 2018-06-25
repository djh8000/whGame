<template>
  <div class="gameover">
  	<img src="../assets/img/m-icon2.png" class="overImg">
  	<img src="../assets/img/m-icon1.png" class="loveEye">
  	<p class="tips">您本次成绩为<em> {{info.scoreGain}} </em><br>您还有<em> {{info.timesLeft}} </em>次机会！</p>
  	<router-link class="btn againBtn" to="/"><!-- 再来一次 --></router-link>
  	<router-link class="btn scoreBtn" to="/score"><!-- 我的成绩 --></router-link>
  	<router-link class="btn shareBtn" to="/"><!-- 我要分享 --></router-link>
  </div>
</template>
<script>
import {gameOver} from '../plugins/api'
export default {
  data () {
    return {
      info: ''
    }
  },
  mounted () {
    gameOver().then(res => {
      this.info = res.data
    })
  }
}
</script>
<style lang="scss" scoped>
	.gameover{
		min-height: 100vh;
    background: url('../assets/img/m-bg3.png') center bottom no-repeat;
    overflow: auto;
    position: relative;
    .overImg{
    	margin: 122px auto 0;
    	display: block;
    }
    .loveEye{
    	display: block;
    	margin: -8px auto 0;
    }
    .tips{
    	font-size: 36px;
    	line-height: 54px;
    	color: #ffffff;
    	text-align: center;
    	margin-top: 48px;
    	em{
    		font-weight: normal;
    		font-size: 48px;
    	}
    }
    .btn{
    	margin: 18px auto 0;
    }
    .againBtn{
    	margin-top: 145px;
    }
	}
</style>