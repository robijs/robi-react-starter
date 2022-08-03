import React from 'react'
import Table from '../components/Table/Table'
import { lists } from '../config'

export default function List() {
    const { Contacts } = lists;
    const { columns } = Contacts;

    const items = [
        { id: 1, firstName: 'Doe', lastName: 'Jane', email: 'jane.doe@example.org', age: 30 },
        { id: 2, firstName: 'Smith', lastName: 'George', email: 'george.smith@example.org', age: 45 },
    ];
    
    return (
        <div className="Home">
            <Table
                columns={columns}
                items={items}
            />
        </div>
    );
}