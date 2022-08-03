import React, { useEffect, useState } from 'react'
import { sp } from '@pnp/sp'
import '@pnp/sp/webs'
import '@pnp/sp/lists'
import '@pnp/sp/fields'
import '@pnp/sp/site-users/web'
import '@pnp/sp/items'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import UpdateForm from '../../forms/Update/UpdateForm'
import './Table.css'

export default function Table({ list, items, columns }) {
    const [rows, setRows] = useState(items || []);
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    function onClose() {
        setOpen(false);
    }

    useEffect(() => {
        if (list && !items.length) {
            (async () => {
                const items = await sp.web.lists.getByTitle(list).items.getAll();
                const data = items.map((item) => {
                    item.id = item.Id;
    
                    return item;
                });
    
                setRows(data);
            })();
        }

        // Cleanup
        return () => { };
    });

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
                    setOpen(true);
                    setSelectedItem(params.row);
                }}
            />
            <div>
                <Dialog open={open} onClose={onClose} fullWidth>
                    <DialogTitle>Update {list} Item #{selectedItem.id}</DialogTitle>
                    <DialogContent>
                        <UpdateForm item={selectedItem} columns={columns}  />
                    </DialogContent>
                    <DialogActions sx={{ marginTop: '48px' }}>
                            <div style={{ flex: 2 }}>
                                <button className='btn btn-light' onClick={() => { console.log('delete') }}>Delete</button> 
                            </div>
                            <div>
                                <button className='btn' onClick={onClose}>Cancel</button>
                                <button className='btn btn-primary' onClick={() => { console.log('update') }}>Update</button>
                            </div>
                        </DialogActions>
                </Dialog>
            </div>
            <div></div>
        </div>
    );
}
