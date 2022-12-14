import React, { useCallback, useEffect, useState } from 'react'
import { sp } from '@pnp/sp'
import '@pnp/sp/webs'
import '@pnp/sp/lists'
import '@pnp/sp/fields'
import '@pnp/sp/site-users/web'
import '@pnp/sp/items'
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector
} from '@mui/x-data-grid'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import ToggleBar from '../ToggleBar'
import NewForm from '../../forms/NewForm'
import UpdateForm from '../../forms/UpdateForm'
import Spinner from '../Spinner'
import './Table.css'
// DEV: Polling OFF
// import useInterval from '../../hooks/useInterval'
// import classNames from 'classnames'

export default function Table({ list, items, columns, toggle }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [allRows, setAllRows] = useState([]);
    const [rows, setRows] = useState(items || []);
    const [editFormOpen, setEditFormOpen] = useState(false);
    const [newFormOpen, setNewFormOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteDisabled, setDeleteDisabled] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectionModel, setSelectionModel] = useState([]);
    // const [isRunning, setIsRunning] = useState(null);

    // DEV: Poll list
    /*
        FIXME: 
        Not smart. Just refetches all items. Could be slow. 
        Works fine for small lists. How would polling work with paginated REST calls?
        TODO: Move to worker.
    */ 
    // useInterval(() => {
    //     console.log('polling...');
    //     memoizedGetItems();
    // }, isRunning ? 5000 : null);

    const memoizedGetItems = useCallback(
        async () => {
            if (list && !items?.length) {
                const items = await sp.web.lists.getByTitle(list).items.getAll();
                const data = items.map((item) => {
                    item.id = item.Id;
        
                    return item;
                });
        
                console.log(data);

                setAllRows(data);
                setRows(data);
                setIsLoaded(true);
            }
        },
        [list, items]
    )

    // TODO: Paginate calls (only retieve first 25 items)
    useEffect(() => {
        if (list) {
            memoizedGetItems();
        }

        // Cleanup
        return () => { };
    }, [memoizedGetItems, list]);

    useEffect(() => {
        if (selectionModel.length) {
            setDeleteDisabled(false);
        } else {
            setDeleteDisabled(true);
        }
    }, [selectionModel]);

    function newItem() {
        setNewFormOpen(true);
    }

    async function deleteItems() {
        setIsDeleting(true);

        await Promise.all(
            selectionModel.map(id => {
                return sp.web.lists
                    .getByTitle(list)
                    .items
                    .getById(id)
                    .recycle();
            })
        );

        const remainingRows = rows.filter(({ id }) => !selectionModel.includes(id));

        setRows(remainingRows);
        setSelectionModel([]);
        setIsDeleting(false);
    }

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <div className='add-btn-ctr mr-1'>
                    <button
                        className='btn btn-primary'
                        onClick={newItem}
                    >
                        <i className='bi bi-plus-circle-fill mr-1'></i>
                        Add item
                    </button>
                </div>
                <div className='delete-btn-ctr mr-1'>
                    <button
                        className='btn btn-primary'
                        onClick={deleteItems}
                        disabled={deleteDisabled}
                    >
                        {
                            isDeleting ?
                                <Spinner /> :
                                <i className='bi bi-trash'></i>
                        }
                    </button>
                </div>
                <div className='refresh-btn-ctr mr-1'>
                    <button
                        className='btn btn-primary'
                        onClick={async () => {
                            await memoizedGetItems();
                            console.log('done')
                        }}
                    >
                        <i className='bi bi-arrow-clockwise'></i>
                    </button>
                </div>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    // TODO: Make new call on page change
    return (
        isLoaded ?
            <div className='rhcc-table' style={{ width: '100%' }}>
                {/* DEV: Remove btn after testing poll */}

                {/* <button
                    className={classNames('btn', { 'btn-primary-reverse': isRunning, 'btn-primary': !isRunning })}
                    style={{ marginTop: '8px', width: '100%' }}
                    onClick={() => {
                        setIsRunning(prevValue => !prevValue)
                    }}
                >
                    {isRunning ? 'Poll On' : 'Poll Off'}
                </button> */}

                {/*  */}
                <div className='flex align-center justify-between mb-2'>
                    <h3 className='table-title m-0'>{list}</h3>
                    <ToggleBar rows={allRows} setRows={setRows} options={toggle} />
                </div>
                <DataGrid
                    sx={{ fontSize: '13px' }}
                    density='compact'
                    autoHeight={true}
                    rows={rows}
                    columns={columns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[10, 25, 100]}
                    pagination
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                    checkboxSelection={true}
                    disableSelectionOnClick={true}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSelectionModelChange={(newSelectionModel => {
                        setSelectionModel(newSelectionModel);
                    })}
                    onRowClick={(params, event) => {
                        setSelectedItem(params.row);
                        setEditFormOpen(true);
                    }}
                />
                {
                    selectedItem &&
                    <UpdateForm
                        list={list}
                        item={selectedItem}
                        columns={columns}
                        open={editFormOpen}
                        setOpen={setEditFormOpen}
                        rows={rows}
                        setRows={setRows}
                    />
                }
                {
                    newFormOpen &&
                    <NewForm
                        list={list}
                        columns={columns}
                        open={newFormOpen}
                        setOpen={setNewFormOpen}
                        rows={rows}
                        setRows={setRows}
                    />
                }
                {/* DEV: Remove button after testing */}

                {/* <button
                    className='btn btn-primary'
                    style={{ marginTop: '8px', width: '100%' }}
                    onClick={() => {
                        setRows([]);
                    }}
                >
                    Toggle skeleton
                </button> */}

                {/*  */}
            </div> :
            <Stack spacing={1}>
                <Skeleton variant="rectangular" height={"42.75px"} width={"100%"} sx={{ marginBottom: '16px', borderRadius: '10px', backgroundColor: 'var(--background-HSL-3)' }} />
                <div className='flex' style={{ marginTop: '0px', marginBottom: '12px' }}>
                    <Skeleton
                        variant="rectangular"
                        width={"110.09px"}
                        height={33}
                        sx={{ 
                            marginTop: '0px !important',
                            borderRadius: '10px',
                            backgroundColor: 'var(--background-HSL-3)',
                            marginRight: '8px'
                        }}
                    />
                    <Skeleton
                        variant="rectangular"
                        width={43}
                        height={33}
                        sx={{ 
                            marginTop: '0px !important',
                            borderRadius: '10px',
                            backgroundColor: 'var(--background-HSL-3)',
                            marginRight: '8px'
                        }}
                    />
                    <Skeleton
                        variant="rectangular"
                        width={43}
                        height={33}
                        sx={{ 
                            marginTop: '0px !important',
                            borderRadius: '10px',
                            backgroundColor: 'var(--background-HSL-3)',
                            marginRight: '20px'
                        }}
                    />
                    <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={33}
                        sx={{ flex: 2, marginTop: '0px !important', borderRadius: '10px', backgroundColor: 'var(--background-HSL-3)' }}
                    />
                </div>
                <Skeleton variant="rectangular" width={"100%"} height={127} sx={{ marginTop: '0px !important', borderRadius: '10px', backgroundColor: 'var(--background-HSL-3)' }} />
                {/* DEV: Remove btn after testing */}

                {/* <button
                    className='btn btn-primary'
                    onClick={() => {
                        setRows([{ id: 1 }]);
                    }}
                >
                    Toggle skeleton
                </button> */}

                {/*  */}
            </Stack>
    );
}