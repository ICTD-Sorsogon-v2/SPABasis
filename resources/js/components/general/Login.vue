<template>
    <v-card flat>
        <v-card-title primary-title>
            Login
        </v-card-title>
        <v-card-text>
            <alert-component
                :show="login_failed"
                :color="'red'"
                :icon="'mdi-alert'"
                :message="message"
                :message_bag="error_bag"
                @dismiss_alert="dismissAlert"
            />
            <v-form @submit.prevent="login">
                <v-container>
                    <v-row
                        align="center"
                        justify="space-around"
                    >
                        <v-col
                            cols="6"
                        >
                        <v-text-field
                            v-model="username"
                            label="Username"
                            required
                            :error-messages="usernameErrors"
                            @input="$v.username.$touch()"
                            @blur="$v.username.$touch()"
                        ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row
                        align="center"
                        justify="space-around"
                    >
                        <v-col
                            cols="6"
                        >
                        <v-text-field
                            v-model="password"
                            label="Password"
                            required
                            :error-messages="passwordError"
                            :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show_password ? 'text' : 'password'"
                            @input="$v.password.$touch()"
                            @blur="$v.password.$touch()"
                            @click:append="show_password = !show_password"
                        ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row
                        align="center"
                        justify="space-around"
                    >
                        <v-btn
                            depressed
                            color="primary"
                            type="submit"
                        >
                            Submit
                        </v-btn>
                    </v-row>
                </v-container>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import AlertComponent from '../helpers/AlertComponent.vue'
const { validationMixin, default: Vuelidate } = require('vuelidate')
const { required, minLength } = require('vuelidate/lib/validators')
export default {
    components: { AlertComponent },
    mixins: [validationMixin],
    data() {
        return {
            username: null,
            password: null,
            login_failed: false,
            error_bag: null,
            message: null,
            show_password: false
        }
    },
    computed: {
        usernameErrors () {
            const errors = []
            if (!this.$v.username.$dirty) return errors
            !this.$v.username.required && errors.push('Username is required.')
            return errors
        },
        passwordError () {
            const errors = []
            if (!this.$v.username.$dirty) return errors
            !this.$v.password.minLength && errors.push('Password must be at least 6 characters long')
            !this.$v.password.required && errors.push('Password is required.')
            return errors
        },
    },
    validations: {
        username: {
            required,
        },
        password: {
            required,
            minLength: minLength(6)
        },
    },
    methods: {
        dismissAlert() {
            this.login_failed = false;
        },
        login() {
            this.login_failed = false, this.error_bag = this.message =null;
            this.$v.$touch()
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post('login', { username: this.username, password: this.password })
                .then(response => {
                    if(this.$route.name != 'Dashboard') {
                        this.$v.$reset();
                        this.username = this.password = this.error_bag  = this.message = null;
                        this.$router.push({name: 'Dashboard'});
                    }
                })
                .catch(error => {
                    this.login_failed = true;
                    this.message = 'Authentication Failed!'
                    this.error_bag = Object.values(error.response.data.errors).flat();
                });
            });
        }
    }
}
</script>