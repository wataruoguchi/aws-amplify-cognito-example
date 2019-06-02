<template>
  <div class="log-in">
    <h1>Log In</h1>
    <Authenticator/>
  </div>
</template>

<script>
import Authenticator from '@/components/Authenticator.vue'
export default {
  name: "LogIn",
  components: {
    Authenticator
  },
}
</script>
