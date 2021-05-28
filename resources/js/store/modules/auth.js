import axios from 'axios';

const state = {
    user: null,
    authenticated: false,
    permissions: []
};

const getters = {
    isAuthenticated: state => state.authenticated,
    authUser: state => state.user,
};

const actions = {
    async login({ commit }) {
        await axios.get('/api/fetch_auth').then(response => {
            commit('LOGIN', response.data);
        });
    },
    async logout({ commit }){
        await commit('LOGOUT');
    }
};

const mutations = {
    LOGIN(state, user) {
        state.user = user;
        state.authenticated = true;
    },
    LOGOUT(state) {
        state.user = null;
        state.authenticated = false;
    }
};

export default {
  state,
  getters,
  actions,
  mutations
};
