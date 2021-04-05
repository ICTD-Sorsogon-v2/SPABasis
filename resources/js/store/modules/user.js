import axios from 'axios';

const state = {
    auth_user: {},
    all_users: [],
};

const getters = {
    auth_user: state => state.auth_user,
    all_users: state => state.all_users,
};

const actions = {
    async getAuthUser({ commit }) {
        const response = await axios.get('/api/auth_user');
        commit('SET_AUTH_USER', response.data);
    },
    async getAllUsers({ commit }) {
        await axios.get('/api/all_users')
        .then(response => {
            response.data.forEach(element => {
                element.full_name = '';
                element.full_name = buildName(
                    element.first_name,
                    element.middle_name,
                    element.last_name,
                    element.suffix
                );
            });
            commit('FETCH_ALL_USERS', response.data);
        });
    },
    async createOrUpdate({ dispatch } , user) {
        const response = await axios.post(`/api/create_update/`, user)
        .then( response => {
            let res = {
                status : 'success',
            }
            // commit('SET_AUTH_USER', response.data);
            dispatch('getAuthUser');
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
        return response;
    },
};

const mutations = {
    SET_AUTH_USER: (state, user) => {
        state.auth_user = user
    },
    FETCH_ALL_USERS: (state, users) => {
        state.all_users = users;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}