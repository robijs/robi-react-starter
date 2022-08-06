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
                toggle={[ 
                    {
                        label: 'All',
                        filter(rows, setRows) {
                            console.log(rows);
                            setRows(rows)
                        }
                    },
                    {
                        label: 'Under 30',
                        filter(rows, setRows) {
                            setRows(
                                rows
                                    .filter(row => row.age < 30)
                            )
                        }
                    },
                    {
                        label: '30+',
                        filter(rows, setRows) {
                            setRows(
                                rows
                                    .filter(row => row.age >= 30)
                            )
                        }
                    }
                ]}
            />
        </div>
    );
}