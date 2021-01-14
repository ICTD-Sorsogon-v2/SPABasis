<template>
    <v-card flat>
        <v-card-title primary-title>
            Login
        </v-card-title>
        <v-card-text>
            <v-form>
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
export default {
    data() {
        return {
            form: {
                username: null,
                password: null,
            }
        }
    },
    methods: {
        login() {

        }
    }
}
</script>