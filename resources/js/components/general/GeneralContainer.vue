<template>
    <v-app>
        <v-app-bar
            app
            color="primary"
            dark
            flat
        >
        <v-container class="py-0 fill-height">
            <v-toolbar-title>Sample SPA</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-container>
        </v-app-bar>

        <v-main>
            <v-container>
                <v-row>
                    <v-col cols="2">
                        <v-sheet rounded="lg" color="primary" dark>
                            <v-list color="transparent">
                                <v-list-item
                                    link
                                    color="secondary"
                                    v-ripple="{ class: `secondary--text` }"
                                    @click.prevent="loginPage"
                                >
                                <v-list-item-content>
                                    <v-list-item-title>
                                        Login
                                    </v-list-item-title>
                                </v-list-item-content>
                                </v-list-item>

                                <v-list-item
                                    link
                                    color="secondary"
                                    v-ripple="{ class: `secondary--text` }"
                                    @click.prevent="changelogsPage"
                                >
                                <v-list-item-content>
                                    <v-list-item-title>
                                        Changelogs
                                    </v-list-item-title>
                                </v-list-item-content>
                                </v-list-item>

                                <v-list-item
                                    link
                                    color="secondary"
                                    v-ripple="{ class: `secondary--text` }"
                                    @click.prevent="aboutPage"
                                >
                                <v-list-item-content>
                                    <v-list-item-title>
                                        About
                                    </v-list-item-title>
                                </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-sheet>
                    </v-col>

                    <v-col>

                        <v-sheet
                            min-height="70vh"
                            rounded="lg"
                        >
                            <router-view></router-view>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    data: () => ({

    }),
    methods: {
        loginPage() {
            if(this.$route.name != 'Login') {
                this.$router.push({name: 'Login'});
            }
        },
        changelogsPage() {
            if(this.$route.name != 'Changelogs') {
                this.$router.push({name: 'Changelogs'});
            }
        },
        aboutPage() {
            if(this.$route.name != 'About') {
                this.$router.push({name: 'About'});
            }
        }
    }
}
</script>