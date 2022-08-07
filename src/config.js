// Pages
import Home from './pages/Home'
import Example from './pages/Example'
import List from './pages/List'

// Lists
import Contacts from './lists/Contacts/Schema'

const app = {
    name: 'Robi',
    title: 'App',
    site: 'robi/create-app',
    localhost: 'http://localhost',
    localport: '3000',
    proxyport: '8081'
}

const lists = {
    Contacts
}

const routes = [
    {
        path: '/',
        label: 'Home',
        title: 'Home',
        icon: 'bi-house',
        main: (title) => <Home title={title} />
    },
    {
        path: '/Example',
        label: 'Example',
        title: 'Example',
        icon: 'bi-square',
        main: (title) => <Example title={title} />
    },
    {
        path: '/List',
        label: 'List',
        title: 'List',
        icon: 'bi-list-ul',
        main: (title) => <List title={title} />
    },
    {
        path: '/Settings',
        label: 'Settings',
        title: 'Settings',
        icon: 'bi-gear',
        nav: false
    },
];

const dev = {
    user: {
        Title: 'First Last',
        Email: 'first.mi.last.ctr@mail.mil',
        LoginName: '0987654321@mil',
        Roles: {
            results: [
                'Developer'
            ]
        },
        SiteId: 1
    }
};

export {
    app,
    routes,
    lists,
    dev
}