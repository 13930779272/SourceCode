<template>
  <div>
    <input type="text" ref="txt">
    <button @click="loin">登录</button>
  </div>
</template>

<script>
  export default {
    methods: {
      loin(){
        let id = this.$refs.txt.value
        if(id*1 === 111){
          sessionStorage.setItem('user',id)
          this.$router.push({
            // path:'/',
            name:'Home',
            params:{
              user:id
            }
          })
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>