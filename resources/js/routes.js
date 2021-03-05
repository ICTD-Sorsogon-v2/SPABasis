const MainContainer = () => import('./components/MainContainer');
const NotFound = () => import('./components/NotFound');
const Login = () => import('./components/general/Login');
const Changelogs = () => import('./components/general/Changelogs');
const About = () => import('./components/general/About');
const GeneralContainer = () => import('./components/general/GeneralContainer');
const AuthContainer = () => import('./components/auth/AuthContainer');
const Dashboard = () => import('./components/auth/Dashboard');
const User = () => import('./components/auth/User');
export default {
    base: '/',
    mode: 'history',
    routes: [
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
                    redirect: { name: 'Login' },
                    component: GeneralContainer,
                    children: [
                        {
                            path: 'login',
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
                    redirect: { name: 'Dashboard' },
                    component: AuthContainer,
                    beforeEnter: (to, from, next) => {
                        axios.get('/api/authenticated').then((response) => {
                            next()
                        }).catch(() => {
                            return next({ name: 'Login'})
                        });
                    },
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
                        }
                    ]
                },
            ]
        },

    ]
}