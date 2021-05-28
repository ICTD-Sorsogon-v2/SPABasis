<template>
    <v-main>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md7 lg7 xl9>
                    <v-row class="mb-6">
                        <v-col>
                            <v-img
                                src="storage/images/TPLINK_Logo_2.svg.png"
                                height="100px"
                                contain
                            />
                        </v-col>
                    </v-row>
                    <v-card
                        class="rounded-lg"
                        outlined
                    >
                        <v-card-title primary-title>
                            <v-layout align-center justify-center>
                                <h2>Sign In</h2>
                            </v-layout>
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
                                <v-row
                                    align="center"
                                    justify="space-around"
                                >
                                    <v-col>
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
                                    <v-col>
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
                                <v-row>
                                    <v-col
                                        align="center"
                                        justify="space-around"
                                        class="mb-6"
                                    >
                                        <v-btn
                                            depressed
                                            color="primary"
                                            type="submit"
                                        >
                                            Submit
                                        </v-btn>
                                    </v-col>

                                </v-row>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-main>
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
    created(){
        
    },
    methods: {
        dismissAlert() {
            this.login_failed = false;
        },
        async login() {
            this.login_failed = false, this.error_bag = this.message =null;
            this.$v.$touch()
            await axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post('login', { username: this.username, password: this.password })
                .then(response => {
                        this.$v.$reset();
                        this.username = this.password = this.error_bag  = this.message = null;
                        this.$store.dispatch('login').then(() => {
                            // Call this after the dispatch to ensure that the states have been hydrated
                            this.$router.push({ name: "Dashboard" });
                        });
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