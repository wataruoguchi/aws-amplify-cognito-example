<template>
  <div class="sign-up">
    <h1>Sign Up</h1>
    <v-form v-model="valid" ref="form">
      <v-text-field v-model="username" :rule="nameRules" :counter="nameMaxLength" label="User Name" required/>
      <v-text-field v-model="email" :rule="emailRules" label="E-mail" required/>
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
import signUp from '@/utils/signUp.js'
export default {
  name: "SignUp",
  data() {
    return {
      valid: false,
      username: '',
      email: '',
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
    emailRules() {
      return [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
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
      if (this.$refs.form.validate()) {
        signUp(this.username, this.password, this.email).then((data) => console.log('DONE', data))
      }
    },
  },
}
</script>
