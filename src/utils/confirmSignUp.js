import { Auth } from 'aws-amplify';
import { AmplifyEventBus } from 'aws-amplify-vue'

function confirmSignUp(username, code) {
  return Auth.confirmSignUp(username, code, {
    // Optional. Force user confirmation irrespective of existing alias. By default set to True.
    forceAliasCreation: true
  }).then(data => {
    AmplifyEventBus.$emit('authState', 'signIn')
    return data // 'SUCCESS'
  })
    .catch(err => {
      console.log(err)
      throw err;
    });
}

export default confirmSignUp
