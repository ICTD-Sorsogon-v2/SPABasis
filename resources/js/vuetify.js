import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify);

const config = {
    theme: {
        themes: {
            light: {
            primary: '#4abdac',
            secondary: '#99ced4',
            accent: '#ee86b7',
            error: '#6e7376',
            },
        },
    },
}

export default new Vuetify(config)