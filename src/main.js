import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

import Amplify, { Auth } from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsconfig from './aws-exports'
import store from './store'
Amplify.configure(awsconfig)

Vue.use(AmplifyPlugin, Auth, Vuetify)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
