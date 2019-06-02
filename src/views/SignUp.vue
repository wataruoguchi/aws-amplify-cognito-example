<template>
  <div class="sign-up">
    <h1>Sign Up</h1>
    <Authenticator/>
  </div>
</template>

<script>
import Authenticator from '@/components/Authenticator.vue'
export default {
  name: "SignUp",
  components: {
    Authenticator
  },
}
</script>
