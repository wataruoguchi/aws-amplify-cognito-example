<template>
  <div class="confirm-sign-up">
    <h1>Confirm Sign Up</h1>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field v-model="username" :rules="emailRules" label="Email Address" required/>
      <v-text-field v-model="code" :rules="codeRules" label="Code" required/>
      <v-btn :disabled="!valid" @click="submit">Submit</v-btn>
    </v-form>
    <v-btn @click="resend">Resend Code</v-btn>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import resendSignUp from '@/utils/resendSignUp.js'
import confirmSignUp from '@/utils/confirmSignUp.js'
export default {
  name: "ConfirmSignUp",
  data() {
    return {
      valid: true,
      username: '',
      code: '',
      message: null,
    }
  },
  computed: {
    emailRules() {
      return [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
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
      this.message = null;
      if (this.$refs.form.validate()) {
        console.log('confirming', this.username, this.code)
        confirmSignUp(this.username, this.code).then((data) => console.log('DONE', data))
          .catch((err) => {
            this.message = err.message
          });
      }
    },
    resend() {
      resendSignUp(this.username);
    }
  },
}
</script>
