import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import { AmplifyPlugin, AmplifyEventBus } from 'aws-amplify-vue'
import * as AmplifyModules from 'aws-amplify'
import store from './store/index.js'

Vue.use(Router)
Vue.use(AmplifyPlugin, AmplifyModules)

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
      component: () => import(/* webpackChunkName: "signup" */ './views/SignUp.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/LogIn.vue')
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

function getUser() {
  return Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then((user) => {
    if (user && user.signInUserSession) {
      // eslint-disable-next-line
      console.log('getUser in router', user)
      store.commit('setUser', user)
      return user
    }
  }).catch((e) => {
    /* eslint-disable-next-line */
    console.log(e)
    store.commit('setUser', null)
    return null
  })
}

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
