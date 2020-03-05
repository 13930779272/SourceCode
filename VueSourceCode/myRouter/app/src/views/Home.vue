<template>
  <div class="home">
    <h1>Home</h1>
    <button @click="ceshi">点击测试push</button>
  </div>
</template>

<script>

export default {
  name: 'Home',
  beforeCreate() {
    console.log(this.$route)
  },
  methods: {
    ceshi(){
      this.$router.push('/about')
    }
  },
}
</script>
