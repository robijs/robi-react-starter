import React from 'react'
import Table from '../components/Table/Table'
import { lists } from '../config'

export default function List() {
    const { Contacts } = lists;
    const { columns } = Contacts;

    return (
        <div className="Home">
            <Table
                columns={columns}
                list="Contacts"
            />
        </div>
    );
}