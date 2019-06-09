<template>
  <div class="log-in">
    <h1>Log In</h1>
    <v-form v-model="valid" ref="form">
      <v-text-field v-model="username" :rules="nameRules" :counter="nameMaxLength" label="User Name" required/>
      <v-text-field
        v-model="password"
        :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
        :rules="[passwordRules.required, passwordRules.min]"
        :type="passwordVisible ? 'text' : 'password'"
        name="password"
        label="Password"
        hint="At least 8 characters"
        counter
        @click:append="passwordVisible = !passwordVisible"
        required/>
      <v-btn :disabled="!valid" @click="submit">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
import signIn from '@/utils/signIn.js'
export default {
  name: "LogIn",
  data() {
    return {
      valid: true,
      username: '',
      password: '',
      nameMaxLength: 20,
      passwordVisible: false,
    }
  },
  computed: {
    nameRules() {
      return [
        v => !!v || 'Name is required',
        v => (v && v.length >= 3 && v.length <= this.nameMaxLength) || `Name must be 3 to ${this.nameMaxLength} characters`
      ]
    },
    passwordRules() {
      return {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match'),
      }
    },
  },
  methods: {
    submit() {
      this.message = null
      if (this.$refs.form.validate()) {
        console.log('SIGN IN INFO',this.username, this.password)
        signIn(this.username, this.password)
      }
    },
  },
}
</script>
