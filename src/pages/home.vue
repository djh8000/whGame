<template>
  <div class="mainIndex">
  	<div class="game1"></div>
  	<div class="game2"></div>
  </div>
</template>
<style lang="scss">
	body,html{
		width: 100%;
		height: 100%;
	}
	.mainIndex{
		width: 750px;
		height: 100%;
		margin: 0 auto;
		position: relative;
		.game1,.game2{
			width: 439px;
			height: 107px;
			position: absolute;
			left: 50%;
			margin-left: -218px;
			bottom: 495px;
		}
		.game2{
			bottom: 345px;
		}
	}
</style>