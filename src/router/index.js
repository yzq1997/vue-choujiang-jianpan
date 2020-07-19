import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Rules from "../views/Rules"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/rules',
    component: Rules
  },
]

const router = new VueRouter({
  routes
})

export default router
