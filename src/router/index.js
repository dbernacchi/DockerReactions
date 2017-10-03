import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Events from '@/components/Events'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
    path: '/',
    name: 'Home',
    component: Home
    },
    {
    path: '/events/:id/:name',
    name: 'Events',
    component: Events
    }
  ],
linkActiveClass: 'uk-active'
})
