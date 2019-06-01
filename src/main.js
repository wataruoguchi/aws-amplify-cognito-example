import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsconfig from './aws-exports'
Amplify.configure(awsconfig)

Vue.use(AmplifyPlugin, AmplifyModules)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
