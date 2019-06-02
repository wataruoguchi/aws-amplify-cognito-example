<template>
  <div class="home">
    <amplify-sign-out v-bind:signOutConfig="signOutConfig"></amplify-sign-out>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  computed: {
    signOutConfig() {
      return {
        msg: "Click here to sign out",
        signOutButton: "Sign out"
      }
    }
  }
}
</script>
