<template>
<form >
    <v-container>
      <v-row
      align="center"
      justify="space-around">
        <v-col cols="6">
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            label="Name"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
        />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="username"
            :error-messages="usernameErrors"
            label="Username"
            required
            @input="$v.username.$touch()"
            @blur="$v.username.$touch()"
        />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="password"
            :error-messages="passwordErrors"
            label="Password"
            required
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
        />
        </v-col><v-col cols="6">
          <v-text-field
            v-model="repeatPassword"
            :error-messages="repeatPasswordErrors"
            label="Confirm Password"
            required
            @input="$v.repeatPassword.$touch()"
            @blur="$v.repeatPassword.$touch()"
        />
        </v-col>
        <v-col cols="12" v-show="!this.$v.repeatPassword.$invalid && !this.$v.password.$invalid">
          <v-btn
            class="mr-4"
            @click="submit"
          >
            submit
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
</form>
</template>
<script>
const { validationMixin, default: Vuelidate } = require('vuelidate')
const { required, maxLength, sameAs } = require('vuelidate/lib/validators')
export default {
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    username: { required,  },
    password: { required, maxLength: maxLength(10)},
    repeatPassword : { sameAsPassword: sameAs('password') }
  },
  data() {
      return {
        name : '',
        username : '',
        password: '',
        repeatPassword: ''
    }
  },
  computed: {
    repeatPasswordErrors () {
      const errors = []
      if (!this.$v.repeatPassword.$dirty) return errors
      !this.$v.repeatPassword.sameAsPassword && errors.push('Password mismatch')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    usernameErrors(){
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('Username is required.')
      return errors
    },
    passwordErrors(){
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    }
},
    methods: {
      submit () {
       
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        // this.select = null
        // this.checkbox = false
      },
    },
}
</script>