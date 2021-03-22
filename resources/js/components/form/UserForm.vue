<template>
<form >
    <v-container>
      <v-row
      align="center"
      justify="space-around">
        <v-col cols="12">
          <alert-component
          :show="updateOrCreate"
          :color="color"
          :icon="icon"
          :message="message"
          :message_bag="error_bag"
          @dismiss_alert="dismissAlert"
        />
        </v-col>
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
            type="password"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
        />
        </v-col><v-col cols="6">
          <v-text-field
            v-model="password_confirmation"
            :error-messages="password_confirmationErrors"
            label="Confirm Password"
            required
            type="password"
            @input="$v.password_confirmation.$touch()"
            @blur="$v.password_confirmation.$touch()"
        />
        </v-col>
        <v-col cols="12">
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
const { required, maxLength, sameAs, minLength } = require('vuelidate/lib/validators')
import AlertComponent from '../helpers/AlertComponent'
export default {
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    username: { required,  },
    password: { required, minLength: minLength(6)},
    password_confirmation : { sameAsPassword: sameAs('password') }
  },
  components: {
    AlertComponent
  },
  data() {
      return {
        submitStatus: null,
        name : '',
        username : '',
        password: '',
        password_confirmation: '',
        error_bag: '',
        message: '',
        updateOrCreate : false,
        icon: 'red',
        color: 'mid-alert'
    }
  },
  computed: {
    password_confirmationErrors () {
      const errors = []
      if (!this.$v.password_confirmation.$dirty) return errors
      !this.$v.password_confirmation.sameAsPassword && errors.push('Password mismatch')
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
      !this.$v.password.minLength && errors.push('Password must be minimum of 6 characters long')
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    }
},
    methods: {
      dismissAlert() {
        this.updateOrCreate = false;
      },
      submit () {
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          // do your submit logic here
          this.submitStatus = 'PENDING'
          setTimeout(() => {
            this.$store.dispatch('createOrUpdate',
            {
              name : this.name,
              username: this.username,
              password: this.password,
              password_confirmation : this.password_confirmation 
            }).then (response => {
              this.updateOrCreate = true;
                if (response.errors) {
                  this.message = 'Profile Update Failed!'
                  this.error_bag = Object.values(response.errors).flat();
                  this.icon = 'mdi-alert';
                  this.color = 'red';
                } else {
                  this.color = 'green';
                  this.icon = 'mdi-check-circle';
                  this.message = 'Profile Update Success!';
                  this.error_bag = ['Change has been saved to your profile'];
                }
            })
            this.submitStatus = 'OK'
          }, 500);
          console.log(this.$store.state.user.auth_user)
        }
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