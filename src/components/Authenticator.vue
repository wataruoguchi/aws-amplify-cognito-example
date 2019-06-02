<template>
    <amplify-authenticator :authConfig="authConfig"></amplify-authenticator>
</template>

<script>
export default {
  computed: {
    authConfig() {
      return {
        confirmSignInConfig: {
          header: 'Please confirm sign in',
          user: {}
        },
        confirmSignUpConfig: {
          header: 'Please confirm sign up',
          username: ''
        },
        forgotPasswordConfig: {
          header: 'Did you forget password?',
        },
        signInConfig: {
          header: 'Please confirm sign up',
          username: ''
        },
        signUpConfig: {
          header: 'Sign up with your email address',
          hideAllDefaults: true,
          signUpFields: [
            {
              label: 'Email Address',
              key: 'username',
              type: 'email',
              required: true,
              displayOrder: 0,
            },
            {
              label: 'Password',
              key: 'password',
              type: 'password',
              required: true,
              displayOrder: 1,
            },
          ]
        },
      }
    }
  }
}
</script>
