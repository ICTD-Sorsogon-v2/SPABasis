import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const MainContainer = () => import('./components/MainContainer');
const NotFound = () => import('./components/NotFound');
const Login = () => import('./components/general/Login');
const Changelogs = () => import('./components/general/Changelogs');
const About = () => import('./components/general/About');
const GeneralContainer = () => import('./components/general/GeneralContainer');
const AuthContainer = () => import('./components/auth/AuthContainer');
const Dashboard = () => import('./components/auth/Dashboard');
const User = () => import('./components/auth/User');
const Starred = () => import('./components/auth/Starred');
const Recent = () => import('./components/auth/Recent');
const Offline = () => import('./components/auth/Offline');
const Uploads = () => import('./components/auth/Uploads');
const Backups = () => import('./components/auth/Backups');

const routes = [
        {
            path: '*',
            component: NotFound,
            name: 'NotFound'
        },
        {
            path: '/',
            component: MainContainer,
            children: [
                {
                    path: '',
                    meta: { isGuest: true },
                    component: GeneralContainer,
                    children: [
                        {
                            path: '',
                            component: Login,
                            name: 'Login',

                        },
                        {
                            path: 'changelogs',
                            component: Changelogs,
                            name: 'Changelogs'
                        },
                        {
                            path: 'about',
                            component: About,
                            name: 'About'
                        }
                    ],
                },
                {
                    path: '',
                    component: AuthContainer,
                    meta: { isAuth: true },
                    children: [
                        {
                            path: 'dashboard',
                            component: Dashboard,
                            name: 'Dashboard',
                        },
                        {
                            path: 'user',
                            component: User,
                            name: 'User'
                        },
                        {
                            path: 'starred',
                            component: Starred,
                            name: 'Starred'
                        },
                        {
                            path: 'recent',
                            component: Recent,
                            name: 'Recent'
                        },
                        {
                            path: 'offline',
                            component: Offline,
                            name: 'Offline'
                        },
                        {
                            path: 'uploads',
                            component: Uploads,
                            name: 'Uploads'
                        },
                        {
                            path: 'backups',
                            component: Backups,
                            name: 'Backups'
                        }
                    ]
                },
            ]
        },

    ]

    const router = new VueRouter({
        mode: 'history',
        base: '/',
        routes
    });
    
    function sessionAlive() {
        if(localStorage.vuex) {
            return JSON.parse(window.localStorage.vuex).auth.authenticated;
        }
        return false;
    };
    
    router.beforeEach((to, from, next) => {
        if (to.matched.some(record => record.meta.isAuth)) {
            if (!sessionAlive()) {
                return next({ name: 'Login' });
            } else {
                return next()
            }
        } else if (to.matched.some(record => record.meta.isGuest)) {
            if (sessionAlive()) {
                return next({ name: 'Dashboard' });
            } else {
                return next()
            }
        } else {
            return next()
        }
    });
    
    export default router;