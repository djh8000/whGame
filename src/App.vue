<template>
  <div id="app" :class="{
    'spring': theme == 1,
    'summer': theme == 2,
    'autumn': theme == 3,
    'winter': theme == 4,
    'bg': $route.meta.isbg}">
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>
<script>
import {getActivity} from './plugins/api'
export default {
  name: 'app',
  data () {
    return {
      theme: 0
    }
  },
  created () {
    getActivity().then(res => {
      this.theme = res.data.activity.themeTypeInt
      this.$store.commit('setActivity', res.data)
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
