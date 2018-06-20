<template>
  <div id="app" :class="{
    'spring': theme == 1,
    'summer': theme == 2,
    'autumn': theme == 3,
    'winter': theme == 4,
    'bg': $route.meta.isbg}">
    <router-view></router-view>
  </div>
</template>
<script>
import {getActivity, authLogin} from './plugins/api'
export default {
  name: 'app',
  data () {
    return {
      theme: 1
    }
  },
  created () {
    getActivity().then(res => {
      console.log(res)
    })
    authLogin({userId: '734', userName: 'abcd'}).then(res => {
      console.log(res)
    })
  }
}
</script>

<style lang="scss">
body,html{
  height: 100%;
}
#app {
  width: 750px;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
}
.bg{
  background-image: url('./assets/img/m-bg.png');
  background-repeat: repeat;
}
</style>
