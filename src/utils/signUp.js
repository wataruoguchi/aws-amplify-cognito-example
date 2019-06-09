import { Auth } from 'aws-amplify';
import { AmplifyEventBus } from 'aws-amplify-vue'

function signUp(username, password, email = '', phone_number = '') {
  return Auth.signUp({
    username,
    password,
    attributes: {
      email,          // optional
      phone_number,   // optional - E.164 number convention
      // other custom attributes
    },
    validationData: []  //optional
  })
    .then(data => {
      AmplifyEventBus.$emit('localUser', data.user);
      if (data.userConfirmed === false) {
        AmplifyEventBus.$emit('authState', 'confirmSignUp');
      } else {
        AmplifyEventBus.$emit('authState', 'signIn');
      }
      return data;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

export default signUp
