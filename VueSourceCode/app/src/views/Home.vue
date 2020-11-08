<template>
  <div class="home">
    <router-link :to="{path:'/about',query:{name:'haha'}}" tag="button">去about</router-link>
    <router-link :to="{name:'Public',params:{age:19}}" tag="button">去公共页</router-link>
    <router-link :to="{path:'p1/1'}">去P1页</router-link>
    <hr>
    <input type="text" v-model="val">
    {{val}}
    <hr/>
    <button @click="add">{{num}}</button>
    {{re}}
    <hr/>
    <button @click="change">改变val2</button>
    {{val2.val}}
    <hr/>
    <button @click="change1">{{val1}}</button>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    
  },
  created() {
    console.log(this.$route)
  },
  name: 'Home',
  components: {
    
  },
  data(){
    return {
      val:'hahaha',
      // name:"haha"
      num:100,
      val1:'成家立业',
      val2:{
        val:'这是侦听属性',

      }
    }
  },
  computed: {
    // re:(vm)=>{
    //   return vm.num += 10
    // },
    re:{
      get:function(){
        // return this.val1.split('').reverse().join('')
        return this.val1
      },
      set:function(newVal){
        console.log('渲染了')
      }
    }
  },
  methods: {
    add(){
      this.num++
    },
    change(){
      this.val2.val = '改变了'
    },
    change1(){
      this.val1 = '业立家成'
    }
  },
  watch: {
    val2:{
      handler:function(val,oldVal){
        console.log(val.val,oldVal.val)
      },
      deep:true
    }
  },
}
</script>
