import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './myVuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num:1
  },
  mutations: {
    // add(state){
    //   state.num ++
    // }
  },
  actions: {
    // addasync(commit,...payload){
    //   setTimeout(() => {
    //     commit('add',...payload)
    //   },1000)
    // }
  },
  modules: {

  }
})
