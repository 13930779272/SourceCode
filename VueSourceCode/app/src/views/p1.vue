<template>
  <div>
    <h1>p1页</h1>
    <router-link :to="{path:'/p1/1'}" tag="button">去p1的1</router-link>
    <router-link :to="{path:'/p1/2'}" tag="button">去p1的2</router-link>
    <router-link :to="{path:'/'}" tag="button">Home</router-link>
  </div>
</template>

<script>
  export default {
    beforeRouteUpdate(to,from,next){
      console.log(to.params.id)
      console.log(from)
      next()
    },
    // watch: {
    //   '$route'(to,from){
    //     console.log(to)
    //     console.log(from)
    //   }
    // },
  }
</script>

<style lang="scss" scoped>

</style>