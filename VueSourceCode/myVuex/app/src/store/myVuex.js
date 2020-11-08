export default (function(){
  class Store{
    constructor(opt){
      this.state = opt.state || {}
      this.actations = opt.actations || {}
      this.mutations = opt.mutations || {}
      this.modules = opt.modules || {}
      // console.log(opt)
    }
  }
  function install (Vue){
    Vue.mixin({
      beforeCreate(){
        if(this.$options && this.$options.store){
          this._store = this.$options.store
        }else {
          this._store = this.$parent && this.$parent._store
        }
        // console.log(this)


        Object.defineProperty(this,'$store',{
          get(){
            return this._store
          }
        })
      }
    })
  }
  return {
    Store,
    install
  }
})()

function mapState(ary){
  // console.log(ary)
  let obj = {}
  ary.forEach(item => {
    // obj[item] = 
  })
}
export {
  mapState
}