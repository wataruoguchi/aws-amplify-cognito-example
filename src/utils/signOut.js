import { Auth } from 'aws-amplify';
import { AmplifyEventBus } from 'aws-amplify-vue'

function signOut() {
  return Auth.signOut()
    .then(data => {
      AmplifyEventBus.$emit('authState', 'signedOut');
      console.log(data)
      return data
    })
    .catch(err => {
      console.log(err)
      return err
    });
}

export default signOut
