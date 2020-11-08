<template>
  <div class="home">
    <h1>Home</h1>
    {{$store.state.num}}
  </div>
</template>

<script>
import {mapState} from '../store/myVuex'
export default {
  beforeCreate() {
    console.log(this.$store)
  },
  computed: {
    ...mapState(['num'])
  },
}
</script>
