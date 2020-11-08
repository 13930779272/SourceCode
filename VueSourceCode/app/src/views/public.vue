<template>
  <div>
    <h1>这是公共页</h1>
    {{age}}
  </div>
</template>

<script>
  export default {
    props:['age'],
    created() {
      console.log(this.$route)
    },
  }
</script>

<style lang="scss" scoped>

</style>