<template>
  <div class="knowWrap">
    <div class="knowMain">
      <div class="userInfo clearfix">
        <div class="userImg"><img src="http://placehold.it/100x100"></div>
        <div class="info">
          <p>MC 热狗</p>
          <p>已连续答对 <em class="col">6</em>/12 题</p>
        </div>
        <div class="time">10</div>
      </div>
      <div class="question">
        <div class="subject">
          7.中国明朝时 ( 七下西洋）的中国航海家是？
        </div>
        <ul class="select">
            <li class="wrong"><i>A</i><b>魏良辅魏良辅魏魏良辅魏良辅魏良辅魏魏良辅魏良辅</b></li>
            <li><i>B</i><b>魏良辅</b></li>
            <li class="right"><i>C</i><b>魏良辅</b></li>
        </ul>
      </div>
      <p class="nextQuestion">下一题: <em>3</em> 秒</p>
    </div>
  </div>
</template>

<script>
  
</script>

<style lang="scss" scoped>
  .knowWrap{
    min-height: 100vh;
    background: url(../../assets/img/m-bg3.png) center bottom no-repeat;
    overflow: auto;
    position: relative;
    .knowMain{
      width: 660px;
      height: 1040px;
      overflow: auto;
      border-radius: 20px;
      background-color: #fff;
      background-repeat: no-repeat; 
      background-position: left 31px top 22px,right 31px top 22px;
      margin: 80px auto 0;
      position: relative;
    }
    .userInfo{
      margin: 115px auto 0;
      width: 600px;
      .userImg{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 20px;
        float: left;
        img{
          border-radius: 50%;
          width: 100px;height: 100px;
        }
      }
      .info{
        float: left;
        width: 360px;
        height: 100px;
        overflow: hidden;
        p{
          line-height: 35px;
          font-size: 26px;
          color: #666666;

        }
        p:first-child{
          font-size: 30px;
          line-height: 60px;
        }
      }
      .time{
        float: left;
        width: 100px;height: 100px;
        border-width: 8px;
        border-style: solid;
        border-radius: 50%;
        font-size: 36px;
        text-align: center;
        line-height: 84px;
      }
    }
    .question{
      width: 520px;
      margin: 60px auto 0;
      .subject{
        font-size: 34px;
        line-height: 60px;
        text-align: justify;
        margin-bottom: 40px;
      }
      .select{
        height: 450px;
        overflow: auto;
      }
      .select li{
        width: 429px;
        height: 97px;
        border-radius: 28px;
        border-width: 4px;
        border-style: solid;
        font-size: 36px;
        line-height: 100px;
        overflow: hidden;
        text-align: center;
        margin: 0 auto 45px;
        padding: 0 60px;
        &.wrong{
          border: none;
          background: url(../../assets/img/wrong.png) center center no-repeat;
          color: #fff;
        }
        &.right{
          border: none;
          background: url(../../assets/img/right.png) center center no-repeat;
          color: #fff;
        }
      }
    }
    .nextQuestion{
      color: #333333;
      font-size: 30px;
      text-align: center;
      line-height: 50px;
      margin-top: -10px;
      em{
        font-size: 48px;
        color: #ff5a52;
      }
    }
  }
</style>

