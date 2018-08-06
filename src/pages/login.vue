<template>
  <div class="loginMain">
    <input type="text" class="input" placeholder="请输入您的手机号">
    <input type="password" class="pwd" placeholder="请输入6-20位字母和数字密码">
    <div id="slider"> 
      <div id="slider_bg"></div> 
      <span id="label"><!-- >> --></span> <span id="labelTip">拖动滑块验证</span> 
    </div>
    <router-link class="loginBtn" to="/">登&emsp;录</router-link>
  </div>
  
</template>
<script>
  
</script>
<style lang="scss" scoped>
.loginMain {
  width: 750px;
  min-height: 100vh;
  background-color: #fff;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  padding: 65px 85px 0;
  input{
    width: 580px;
    display: block;
    padding: 20px 0 20px 85px;
    border: 2px solid #bfbfbf;
    border-radius: 5px;
    font-size: 30px;
    line-height: 42px;
    margin-bottom: 20px;
    &.input{
      background:url('../assets/img/userImg.png') 17px center no-repeat;
    }
    &.pwd{
      background:url('../assets/img/pwdImg.png') 22px center no-repeat;
    }
  }
  .loginBtn{
    width: 580px;
    height: 86px;
    border-radius: 5px;
    background: #fe7000;
    border: 1px solid rgba(#d12700,.69);
    font-size: 34px;
    color: #ffffff;
    text-align: center;
    line-height: 84px;
    display: block;
  }
  #slider {
    width: 580px;
    height: 88px;
    position: relative;
    border-radius: 5px;
    border: 1px solid rgba(#000000,.15);
    background-color: #e9e9e9;
    box-shadow: inset 1px 1px 6px rgba(#000000,.15);
    margin-bottom: 34px;
    overflow: hidden;
    text-align: center;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
  }

  #slider_bg {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: #61a4dc;
    z-index: 1;
  }

  #label {
    width: 105px;
    position: absolute;
    left: 0;
    top: 0;
    height: 82px;
    line-height: 80px;
    border-radius: 8px;
    border: 2px solid #bfbfbf;
    z-index: 3;
    cursor: move;
    background:#fff url('../assets/img/arrow.png') center no-repeat;
    &.cur{
      background:#fff url('../assets/img/success.png') center no-repeat;
    }
  }

  #labelTip {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 30px;
    color: #666666;
    line-height: 86px;
    text-align: center;
    z-index: 2;
    &.cur{
      background-color: #61a4dc;
    }
  }
}
</style>