import { Auth } from 'aws-amplify';

function signUp(username, password, email = '', phone_number = '') {
  Auth.signUp({
    username,
    password,
    attributes: {
      email,          // optional
      phone_number,   // optional - E.164 number convention
      // other custom attributes
    },
    validationData: []  //optional
  })
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

export default signUp
