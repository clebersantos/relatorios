import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard
    },
    {
      path: '/release',
      name: 'release',
      component: () => import(/* webpackChunkName: "about" */ './views/Release.vue')
    },
    {
      path: '/release-report',
      name: 'release_report',
      component: () => import(/* webpackChunkName: "about" */ './views/ReleaseReport.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/entrar',
      name: 'entrar',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "autenticar" */ './views/Entrar.vue')
    },
  ]
})
