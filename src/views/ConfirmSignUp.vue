<template>
  <div class="sign-up">
    <h1>Confirm Sign Up</h1>
    <v-form v-model="valid" ref="form">
      <v-text-field v-model="username" :rule="nameRules" :counter="nameMaxLength" label="User Name" required/>
      <v-text-field v-model="code" :rule="codeRules" label="Code" required/>
      <v-btn :disabled="!valid" @click="submit">Submit</v-btn>
    </v-form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import confirmSignUp from '@/utils/confirmSignUp.js'
export default {
  name: "ConfirmSignUp",
  data() {
    return {
      valid: false,
      username: '',
      code: '',
      nameMaxLength: 20,
      message: null,
    }
  },
  computed: {
    nameRules() {
      return [
        v => !!v || 'Name is required',
        v => (v && v.length >= 3 && v.length <= this.nameMaxLength) || `Name must be 3 to ${this.nameMaxLength} characters`
      ]
    },
    codeRules() {
      return [
        v => !!v || 'Code is required',
        v => (v && v.length === 6) || 'Code must be 6 digits'
      ]
    },
  },
  methods: {
    submit() {
      this.message = null
    if (this.$refs.form.validate()) {
        console.log('confirming', this.username, this.code)
        confirmSignUp(this.username, this.code).then((data) => console.log('DONE', data))
          .catch((err) => {
            this.message = err.message
          });
      }
    },
  },
}
</script>
