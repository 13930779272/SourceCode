// 存一个路由的状态，当路由改变的时候，刷新页面
class History {
  constructor(){
    this.current = null
  }
}

function MyRouter(opt){
  // this代表MyRouter的实例化对象,一上来会运行两次第一次没有
  // console.log(this)
  if(this){
    this.mode = opt.mode || 'hash'
    this.routes = opt.routes || []
    this.routeMap = this.createMap(this.routes)
    this.history = new History
    this.init()
    // console.log(this.routeMap)
  }
}
MyRouter.prototype = {
  constructor:MyRouter,
  createMap(routers){ // 把传进来的路由配置项的数组拉平，方便操作
    return routers.reduce((prev,next) => {
      prev[next.path] = next.component
      return prev
    },{})
  },
  init(){ // 初始化路由
    if(this.mode === 'hash'){ // hash路由的跳转方式
      // 初始化路由的状态
      if(!location.hash) location.hash = '/';
      // 初始化history的状态
      this.history.current = location.hash.slice(1)
      /* 
        用load会比下面的beforeCreate慢一点，拿不到current的值所以我们不用
        load直接给就可以
      */
      // window.addEventListener('load',() => {
      //   this.history.current = location.hash.slice(1)
      // });
      // 当hash改变的时候改变history
      window.addEventListener('hashchange',() => {
        this.history.current = location.hash.slice(1)
      });
    }else if(this.mode === 'history'){ // history的路由跳转方式
      // 初始化路由的状态
      if(!location.pathname) location.pathname = '/';
      // 初始化history状态
      this.history.current = location.pathname
      // window.addEventListener('load',() => {
      //   this.history.current = location.pathname
      // });
      // 当pathname改变的时候改变history
      window.addEventListener('popstate',() => {
        this.history.current = location.pathname
      });
    }
  },
  push(path){
    if(this.mode === 'hash'){
      location.hash = '#' + path
    }else  if(this.mode === 'history'){
      location.pathname = path
    }
  }
};
// 调用install方法，这个方法会在use的时候调用，Vue的实例会当做参数传进去
MyRouter.install = function(Vue){
  Vue.mixin({ // mixin混入方法每个Vue实例都能拿到这里面的东西
    beforeCreate(){
      /* 
        这里的this代表每一个组件
        this上会有一个options的属性，可以看到自定义属性
        可以看出根组件options的身上会有，router属性
      */
      // console.log(this)
      if(this.$options && this.$options.router){ // 说明是根组件
        // console.log(this)
        this._root = this;
        this._router = this.$options.router
        // 深度监听
        // console.log(this._router.history)
        Vue.util.defineReactive(this,'xxx',this._router.history)
        // console.log(this._router.history.current)
      }else { // 不是根组件
        // console.log(this)
        if(this.$parent){
          this._root = this.$parent._root
          this._router = this.$parent._router
        }
      }
      Object.defineProperty(this,'$route',{
        get:() => {
          // console.log(this._router.history.current)
          return {
            current:this._router.history.current
          }
        }
      });
      Object.defineProperty(this,'$router', {
        get:() => {
          return this._router
        }
      });
    }
  })
  // vue自带组件
  Vue.component('router-view',{ // router-view
    render(h){
      const {routeMap,history:{current}} = this._self.$router
      return h(
        routeMap[current]
      )
    }
  });
  // router-link
  Vue.component('router-link',{
    props:['to','tag'],
    methods: {
      click(ev,mode){
        if(mode === 'hash'){
          location.hash = ev.target.getAttribute('herf').split('#')[1]
        }else if(mode === 'history'){
          location.pathname = ev.target.getAttribute('herf')
        }
      }
    },
    // jsx语法
    render(){
      const {mode} = this._self.$router
      const {to,tag} = this
      console.log(this)
      if(tag){
        return <tag on-click={(ev) =>{this.click(ev,mode)}} herf={mode === 'hash'?`#${to}`:`${to}`}>{this.$slots.default}</tag>
      }
      return <a href={mode === 'hash'?`#${to}`:`${to}`}>{this.$slots.default}</a>
    }
  })
};
export default MyRouter