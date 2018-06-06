<template>
  <div class="mainIndex">
  	<router-link class="game1" to="/puzzle"></router-link>
  	<router-link class="game2" to="/puzzle"></router-link>
  </div>
</template>
<style lang="scss" scoped>
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