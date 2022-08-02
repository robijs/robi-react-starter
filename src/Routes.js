import Home from './pages/Home'
import Example from './pages/Example'

const routes = [
    {
        path: '/',
        label: 'Home',
        title: 'Home page',
        icon: 'bi-house',
        main: (title) => <Home title={title} />
    },
    {
        path: '/Example',
        label: 'Example',
        title: 'Example page',
        icon: 'bi-square',
        main: (title) => <Example title={title} />
    }
];

export default routes;
