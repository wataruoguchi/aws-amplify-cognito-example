import store from '@/store/index.js'
import { Auth } from 'aws-amplify'

export default function () {
  return Auth.currentAuthenticatedUser().then((user) => {
    if (user && user.signInUserSession) {
      console.log('getUser via getUser.js', user)
      store.commit('setUser', user)
      return user
    } else {
      console.log('not sign in', user)
      return null
    }
  }).catch((e) => {
    console.log('Error in getUser', e)
    store.commit('setUser', null)
    return null
  })
}
