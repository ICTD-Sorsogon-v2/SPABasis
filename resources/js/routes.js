import Login from './components/Login';
import Changelogs from './components/Changelogs';
import About from './components/About';
import NotFound from './components/NotFound'
import Container from './components/Container';
import Dashboard from './components/Dashboard'
export default {
    base: '/',
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Login,
            name: 'Login'
        },
        {
            path: '*',
            component: NotFound,
            name: 'NotFound'
        },
        // {
        //     path: '/',
        //     component: Container,
        //     children: [
        //         {
        //             path: 'dashboard',
        //             component: Dashboard,
        //         },
        //     ]
        // },
        {
            path: '/changelogs',
            component: Changelogs,
            name: 'Changelogs'
        },
        {
            path: '/about',
            component: About,
            name: 'About'
        }
    ]
}