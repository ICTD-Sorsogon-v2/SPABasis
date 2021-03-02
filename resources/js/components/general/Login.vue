<template>
    <v-card flat>
        <v-card-title primary-title>
            Login
        </v-card-title>
        <v-card-text>
            <div >
                <validation-errors v-if="validationError"  :errors='validationError' ></validation-errors>
            </div>
            <v-form ref="form" @submit.prevent="login">
                <v-container>
                    <v-row
                        align="center"
                        justify="space-around"
                        ref="form"
                    >
                        <v-col
                            cols="6"
                        >
                        <v-text-field
                            v-model="form.username"
                            label="Username"
                            :rules="form.usernameRules"
                            required
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
                            v-model="form.password"
                            :rules="form.passwordlRules"
                            label="Password"
                            required
                            type="password"
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
import ValidationErrors from '../validation/ValidationErrors';
export default {
    components: {
        ValidationErrors
    },
    data() {
        return {
            validationError: '',
            form: {
                username: '',
                usernameRules: [
                v => !!v || 'Username is required',
                
                ],
                password: null,
                passwordlRules: [
                    v => !!v || 'Password is required',
                ],
            },
        }
    },
    methods: {
        closeModal(){
            this.alert = false;
        },
        login() {
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post('login', this.form)
                .then(response => {
                    if(this.$route.name != 'Dashboard') {
                        this.$router.push({name: 'Dashboard'});
                    }
                })
                .catch(error => {
                    this.alert = true ;
                    this.validationError = Object.values(error.response.data.errors).flat();
                });
            });
        }
    }
}
</script>