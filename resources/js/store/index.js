import user from './modules/user';
export default {
    strict: true,
    modules: {
        user
    },
    // plugins: [createPersistedState({
    //     key: 'keyname',
    //     storage: window.sessionStorage,
    // })],
}