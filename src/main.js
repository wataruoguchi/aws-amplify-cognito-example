import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsconfig from './aws-exports'
import store from './store'
Amplify.configure(awsconfig)

Vue.use(AmplifyPlugin, AmplifyModules)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
