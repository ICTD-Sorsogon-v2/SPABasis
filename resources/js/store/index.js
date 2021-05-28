import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from "vuex-persistedstate";
import user from './modules/user';
import auth from './modules/auth';


Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        user,
        auth
    },
    plugins: [createPersistedState()]
    // plugins: [createPersistedState({
    //     key: 'keyname',
    //     storage: window.sessionStorage,
    // })],
})