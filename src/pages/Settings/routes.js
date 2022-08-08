const routes = [
    {
        path: '',
        label: 'Test 1',
        title: 'One',
        icon: 'bi-house',
        main: (title) => <div>{title}</div>
    },
    {
        path: 'Test2',
        label: 'Test 2',
        title: 'Two',
        main: (title) => <div>{title}</div>
    },
    {
        path: 'Test3',
        label: 'Test 3',
        title: 'Three',
        main: (title) => <div>{title}</div>
    },
    {
        path: 'Test4',
        label: 'Test 4',
        title: 'Four',
        main: (title) => <div>{title}</div>
    },
];

export default routes;