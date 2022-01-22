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
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "PrivacyPolicy" */ '../views/PrivacyPolicy.vue')
  },
  {
    path: '/nft-carousel',
    name: 'Carousel',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Carousel" */ '../views/NFTCarousel.vue')
  },
  {
    path: '/nft-list',
    name: 'NFTList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "NFTList" */ '../views/NFTList.vue')
  },
  {
    path: '/transfer-token',
    name: 'TransferToken',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "TransferToken" */ '../views/TransferTokenPage.vue')
  },
  {
    path: '/challenger-lookup',
    name: 'ChallengerLookup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ChallengerLookup" */ '../views/ChallengerLookup.vue')
  },
  {
    path: '/nft-resources',
    name: 'NFTResources',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "NFTResources" */ '../views/NFTResources.vue')
  }
]
    
const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
