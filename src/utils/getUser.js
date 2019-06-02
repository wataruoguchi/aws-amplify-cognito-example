import Vue from 'vue'
import store from '@/store/index.js'
import { AmplifyPlugin } from 'aws-amplify-vue'
import * as AmplifyModules from 'aws-amplify'
Vue.use(AmplifyPlugin, AmplifyModules)

export default function () {
  return Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then((user) => {
    if (user && user.signInUserSession) {
      // eslint-disable-next-line
      console.log('getUser via $Amplify', user)
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
