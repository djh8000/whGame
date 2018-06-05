<template>
  <div id="app" :class="{
    'spring': theme == 1,
    'summer': theme == 2,
    'autumn': theme == 3,
    'winter': theme == 4
  }">
    <transition :name="transitionName">
      <!-- <navigation> -->
        <router-view class="Router">
        </router-view>
      <!-- </navigation> -->
    </transition>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      theme: 2,
      transitionName: ''
    }
  },
  created () {
    // this.$navigation.on('forward', (to, from) => {
    //   this.transitionName = 'slide-left'
    // })
    // this.$navigation.on('back', (to, from) => {
    //   this.transitionName = 'slide-right'
    // })
    // this.$navigation.on('replace', (to, from) => {
    //   this.transitionName = ''
    // })
    // this.$http.post('api/dynamic/getList', {}).then(res => {
    //   console.log(res)
    // })
  }
}
</script>

<style lang="scss">
#app {
  width: 750px;
  margin: 0 auto;
  height: 100%;
  position: relative;
}
.Router {
  position: absolute;
  width: 100%;
  transition: all 0.4s ease;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slide-right-enter,
.slide-left-leave-active {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}
</style>
