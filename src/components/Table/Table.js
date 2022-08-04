import React, { useEffect, useState } from 'react'
import { sp } from '@pnp/sp'
import '@pnp/sp/webs'
import '@pnp/sp/lists'
import '@pnp/sp/fields'
import '@pnp/sp/site-users/web'
import '@pnp/sp/items'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import UpdateForm from '../../forms/Update/UpdateForm'
import './Table.css'

export default function Table({ list, items, columns }) {
    const [rows, setRows] = useState(items || []);
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        if (list) {
            (async () => {
                const items = await sp.web.lists.getByTitle(list).items.getAll();
                const data = items.map((item) => {
                    item.id = item.Id;

                    return item;
                });

                console.log(data);

                setRows(data);
            })();
        }

        // Cleanup
        return () => { };
    }, [list]);

    return (
        <div className='rhcc-table' style={{ width: '100%' }}>
            <DataGrid
                sx={{ fontSize: '13px' }}
                density='compact'
                autoHeight={true}
                rows={rows}
                columns={columns}
                pageSize={10}
                components={{ Toolbar: GridToolbar }}
                exportButton={true}
                rowsPerPageOptions={[50]}
                checkboxSelection={true}
                disableSelectionOnClick={true}
                onRowClick={(params, event) => {
                    setSelectedItem(params.row);
                    setOpen(true);
                }}
            />
            {
                selectedItem && 
                <UpdateForm
                    list={list}
                    item={selectedItem}
                    columns={columns}
                    open={open}
                    setOpen={setOpen}
                    rows={rows}
                    setRows={setRows}
                />
            }
        </div>
    );
}
