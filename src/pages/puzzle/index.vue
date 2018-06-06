<template>
  <div class="bg">
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
      <router-link class="btn btn1" to="/puzzle/play"></router-link>
      <router-link class="btn btn2" to="/"></router-link>
    </div>
  </div>
</template>

<script>
  
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
    .btn1{
      margin-top: 50px;
    }
    .btn2{
      margin-top: 30px;
    }
  }
</style>

