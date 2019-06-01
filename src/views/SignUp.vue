<template>
  <div class="sign-up">
    <h1>Sign Up</h1>
    <amplify-sign-up v-bind:signUpConfig="signUpConfig"></amplify-sign-up>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signUpConfig: {},
    }
  }
}
</script>
