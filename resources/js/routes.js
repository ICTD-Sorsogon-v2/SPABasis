
import MainContainer from './components/MainContainer';
import NotFound from './components/NotFound'
import Login from './components/general/Login';
import Changelogs from './components/general/Changelogs';
import About from './components/general/About';
import GeneralContainer from './components/general/GeneralContainer';
import AuthContainer from './components/auth/AuthContainer';
import Dashboard from './components/auth/Dashboard';
import User from './components/auth/User'
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
                    beforeEnter: (to, from, next) => {
                        axios.get('/api/authenticated').then((response) => {
                            next({name: 'Dashboard' })
                        }).catch(() => {
                            return next()
                        });
                    },
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