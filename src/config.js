// Pages
import Home from './pages/Home'
import Example from './pages/Example'
import List from './pages/List'

// Lists
import Contacts from './lists/Contacts/Schema'

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

export {
    routes,
    lists
}