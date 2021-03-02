<template>
    <v-card flat>
        <v-card-title primary-title>
            Login
        </v-card-title>
        <v-card-text>
            <div >
                <!-- <v-alert
                    v-model="alert"
                    border="left"
                    close-text="Close Alert"
                    color="deep-purple accent-4"
                    dark
                    dismissible
                    >
                    <v-list  :v-for="value in validationErrors">{{ value  }}</v-list>
                </v-alert> -->
                <validation-errors v-if="validationError" :alert='alert'  :errors='validationError' ></validation-errors>
            </div>
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
                            v-model="form.username"
                            label="Username"
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
            alert : false,
            validationError: '',
            form: {
                username: null,
                password: null,
            }
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