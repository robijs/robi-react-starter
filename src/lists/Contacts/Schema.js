const schema = {
    name: 'Contacts',
    columns: [
        {
            field: 'id',
            headerName: 'Id',
            flex: 0
        },
        {
            field: 'firstName',
            headerName: 'First Name',
            flex: 1,
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
        },
        {
            field: 'age',
            headerName: 'Age',
            flex: 1,
        }
    ]
};

export default schema;