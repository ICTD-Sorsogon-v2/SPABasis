<template>
<form >
  <h1>userform</h1>
  </form>
</template>
<script>
const { validationMixin, default: Vuelidate } = require('vuelidate')
const { required, minLength, maxLength, email } = require('vuelidate/lib/validators')
export default {
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
  },
  data() {
    return {
      submitStatus: null
    }
  },
  props:['name',],
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
},
    methods: {
      submit () {
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
          console.log('invalid');
        } else {
          // do your submit logic here
          this.submitStatus = 'PENDING'
          setTimeout(() => {
            this.submitStatus = 'OK'
            console.log('valid')
          }, 500)
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
    mounted() {
    }
}
</script>