import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/login',
    name: 'Login',
    component : () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path:'/profile',
    name: 'Profile',
    component : () => import(/* webpackChunkName: "about"*/'../views/Profile.vue')
  },
  {
    path:'/profesional/:id',
    name: 'Profesional',
    component : () => import(/* webpackChunkName: "about"*/'../views/Profesional.vue')
  },
  {
    path:'/search/:data',
    name:'Busqueda',
    component : () => import(/* webpackChunkName: "about"*/'../views/Search.vue')
  },
  {
    path:'/search/',
    name:'Busqueda',
    component : () => import(/* webpackChunkName: "about"*/'../views/Search.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
