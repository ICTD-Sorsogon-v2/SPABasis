<template>
        <v-app id="inspire">
            <v-navigation-drawer
                v-model="drawer"
                app
            >
                <v-list>
                    <v-list-item>
                    <v-list-item-avatar>
                        <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                    </v-list-item-avatar>
                    </v-list-item>

                    <v-list-item link>
                        <v-list-item-content>
                            <v-list-item-title class="title">
                                John Leider
                            </v-list-item-title>
                            <v-list-item-subtitle>john@vuetifyjs.com</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-icon>mdi-menu-down</v-icon>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list
                    nav
                    dense
                >
                    <v-list-item-group
                        v-model="selectedItem"
                        color="primary"
                    >
                        <v-list-item
                            v-for="(item, i) in items"
                            :key="i"
                            :to="item.link"
                            link
                            style="text-decoration:none;"
                        >
                            <v-list-item-icon>
                                <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title v-text="item.text"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
                <template v-slot:append>
                    <div class="pa-2">
                    <v-btn block @click.prevent="logout">
                        Logout
                    </v-btn>
                    </div>
                </template>
            </v-navigation-drawer>
            <v-app-bar app>
                <v-app-bar-nav-icon @click="drawer = !drawer">

                </v-app-bar-nav-icon>

                <v-toolbar-title>SPA Sample</v-toolbar-title>
            </v-app-bar>
            <v-main>
                <router-view/>
            </v-main>
        </v-app>
</template>

<script>
export default {
    data: () => ({
        drawer: null,
        selectedItem: 0,
        items: [
            { text: 'Dashboard', icon: 'mdi-desktop-mac-dashboard', link: 'dashboard'},
            { text: 'Roles', icon: 'mdi-account-multiple', link: 'user' },
            { text: 'Permissions', icon: 'mdi-star', link: 'starred' },
            { text: 'Recent', icon: 'mdi-history', link: 'recent' },
            { text: 'Offline', icon: 'mdi-check-circle', link: 'offline' },
            { text: 'Uploads', icon: 'mdi-upload', link: 'uploads' },
            { text: 'Backups', icon: 'mdi-cloud-upload', link: 'backups' },
        ],
    }),
    methods: {
        dashboardPage() {

        },
        logout() {
            // this.$store.dispatch('startLoading');
            axios.post('logout').then(response => {
                this.$store.dispatch('logout');
                window.localStorage.removeItem('vuex');
                this.$router.push({ name: "Login" });
            });
        }
    }

}
</script>
