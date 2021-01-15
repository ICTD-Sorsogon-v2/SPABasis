<template>
    <v-card flat>
        <v-card-title primary-title>
            Dashboard : {{auth_user.name}}
        </v-card-title>
    </v-card>
</template>

<script>

export default {
    methods: {

    },
    computed: {
        auth_user() {
            return this.$store.state.user.auth_user;
        }
    },
    mounted(){
        this.$store.dispatch('getAuthUser');
    }
}
</script>