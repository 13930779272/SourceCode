import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta:{verification:true},
    component: Home,
   
  },
  {
    path: '/about',
    name: 'About',
    props:(route)=> ({
      name: route.query.name
    }),
    component: () => import('../views/About.vue')
  },
  {
    path:'/public',
    name:'Public',
    props:true,
    component:() => import('../views/public.vue')
  },
  {
    path:'/p1/:id',
    name:'P1/:id',
    component:() => import('../views/p1.vue')
  },
  {
    path:'/login',
    name:'Login',
    component:() => import('../views/login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // console.log(to)
  if(to.matched.some(record => record.meta.verification)){ // 需要验证
    let se = sessionStorage.getItem('user')
    if(se){ // 验证通过
      next()
    }else{ // 验证没通过
      next('/login')
    }
  }else{ // 不需要验证
    next()
  }
  
})
router.afterEach( (to,from) => {
  console.log(to,'to')
  console.log(from,'from')
})
export default router
