import store from '@/store/index.js'
import { Auth } from 'aws-amplify'

export default function () {
  return Auth.currentAuthenticatedUser().then((user) => {
    if (user && user.signInUserSession) {
      // eslint-disable-next-line
      console.log('getUser via getUser.js', user)
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
