import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import { AmplifyEventBus } from 'aws-amplify-vue'
import store from './store/index.js'
import getUser from '@/utils/getUser.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: { requiresNoAuth: true },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "signup" */ './views/SignUp.vue'),
      meta: { requiresNoAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/LogIn.vue'),
      meta: { requiresNoAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

getUser().then((user) => {
  if (user) {
    router.push({path: '/home'})
  }
})

AmplifyEventBus.$on('authState', async (state) => {
  // eslint-disable-next-line
  console.log('authState in router', state)
  const pushPathes = {
    signedOut: () => {
      store.commit('setUser', null)
      router.push({path: '/'})
    },
    signUp: () => {
      router.push({path: '/signUp'})
    },
    signIn: () => {
      router.push({path: '/logIn'})
    },
    signedIn: () => {
      router.push({path: '/home'})
    }
  }
  if (typeof pushPathes[state] === 'function') {
    pushPathes[state]()
  }
})

router.beforeResolve(async (to, from, next) => {
  const user = await getUser()
  if (to.matched.some((record) => record.meta.requiresNoAuth)) {
    if (user) {
      return next({
        path: '/home',
      })
    }
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!user) {
      return next({
        path: '/',
      })
    }
  }
  return next()
})

export default router
