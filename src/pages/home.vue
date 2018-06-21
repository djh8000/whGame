<template>
  <div class="mainIndex">
    <div class="enterBtnWrap" v-if="activity">
      <span class="game" @click="gameGo(item.questionTypeInt, item.gameMainId)" v-for="(item, index) in activity.gameList" :key="index">{{item.gameName}}</span>
    </div>
    <p class="brand">文化嘉定云</p>
  </div>
</template>
<script>
  export default {
    computed: {
      activity () {
        return this.$store.state.activity
      }
    },
    methods: {
      gameGo (type, id) {
        switch (type) {
          case 1:
            this.$router.push(`/know/${id}`)
            break
          case 2:
            this.$router.push(`/puzzle/${id}`)
            break
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
.mainIndex {
  width: 750px;
  min-height: 100vh;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  .enterBtnWrap {
    margin-top: 700px;
  }
  .game {
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
  .brand {
    font-size: 22px;
    color: #fff;
    text-align: center;
    margin: 110px 0;
  }
}
</style>