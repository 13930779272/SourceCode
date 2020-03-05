<template>
  <div>
    <h1>这是about页</h1>
    <router-link :to="{path:'/'}" tag="button">去主页</router-link>
    {{name}}
  </div>
</template>

<script>
  export default {
    created() {
      console.log(this.$route)
    },
    props:['name'],
    beforeRouteLeave (to, from, next) {
      console.log(this)
      let f = confirm('确定要离开')
      if(f){
        next()
      }else{
        next(false)
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log(to)
      console.log(from)
      console.log(this)
      next(a=> {
        console.log(a)
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>