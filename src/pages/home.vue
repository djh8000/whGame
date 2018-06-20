<template>
  <div class="mainIndex">
  	<div class="enterBtnWrap">
  		<router-link class="game" to="/know">知识问答知识问答</router-link>
  		<router-link class="game" to="/puzzle">趣味拼图</router-link>
  	</div>
  	<p class="brand">文化嘉定云</p>
  </div>
</template>
<style lang="scss" scoped>
	.mainIndex{
		width: 750px;
		min-height: 100vh;
		margin: 0 auto;
		position: relative;
		overflow: hidden;
		.enterBtnWrap{
			margin-top: 700px;
		}
		.game{
			display: block;
			width: 439px;
			height: 107px;
			margin: 0 auto 40px;
			font-size: 48px;
			font-weight: bold;
			text-align: center;
			line-height: 96px;
			color: #fff;
			font-family: "微软雅黑";
			letter-spacing: 5px;
			overflow: hidden;
		}
		.brand{
			font-size: 22px;
			color: #fff;
			text-align: center;
			margin: 110px 0;
		}
	}
</style>