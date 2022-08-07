import React, { useEffect } from 'react'
import { sp } from '@pnp/sp'
import '@pnp/sp/webs'
import '@pnp/sp/lists'
import '@pnp/sp/fields'
import '@pnp/sp/site-users/web'
import '@pnp/sp/items'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { useForm } from 'react-hook-form'
import { FilledInput, InputLabel, FormControl, FormHelperText } from '@mui/material'
import './UpdateForm.css'

function UpdateForm({ open, setOpen, setRows, rows, columns, list, item }) {
    const { handleSubmit, register, unregister, reset } = useForm();
    const { confirm } = window;

    // Reset form when item changes
    useEffect(() => {
        columns
            .filter(({ field }) => field.toLowerCase() !== 'id')
            .forEach(({ field }) => {
                unregister(field);
            });

        reset();
    }, [reset, unregister, item, columns])

    function onClose() {
        setOpen(false);
    }

    async function onUpdate(values) {
        let data = {}

        for (let key in values) {
            if (values[key]) {
                data[key] = values[key];
            }
        }

        console.log(data);

        await sp.web.lists
            .getByTitle(list)
            .items
            .getById(item.id)
            .update(data);

        const updatedRows = rows.map(row => {
            if (row.id === item.id) {
                values.id = item.id;
                values.Id = item.id;
                return values;
            } else {
                return row;
            }
        });

        setRows(updatedRows);
        setOpen(false);
    }

    async function onDelete() {
        if (
            // TODO: Replace with dialog
            confirm(
                `Are you sure you want to delete item #${item.id} from '${list}'?`
            )
        ) {
            await sp.web.lists
                .getByTitle(list)
                .items
                .getById(item.id)
                .recycle();

            setRows(rows.filter(row => row.id !== item.id));
            setOpen(false);
        }
    };

    return (
        <div className="form-group">
            <Dialog open={open} onClose={onClose} fullWidth>
                <DialogTitle>Update {list} Item #{item.id}</DialogTitle>
                <DialogContent>
                    <form>
                    {
                        columns
                            .filter(({ field }) => field.toLowerCase() !== 'id')
                            .map(({ field, headerName, description }, index) => {
                                console.log(item[field]);

                                return (
                                    <FormControl key={field} variant="standard" fullWidth>
                                        <InputLabel variant="filled" htmlFor={`field-${field}`}>{headerName}</InputLabel>
                                        <FilledInput
                                            id={`field-${field}`}
                                            defaultValue={item[field] || ""}
                                            aria-describedby={`${field}-helper-text`}
                                            disableUnderline={true}
                                            autoFocus={index === 0 ? true : false}
                                            {...register(field)}
                                        />
                                        {
                                            description &&
                                            <FormHelperText id={`${field}-helper-text`}>
                                                {description}
                                            </FormHelperText>
                                        }
                                    </FormControl>
                                )
                            })
                    }
                    </form>
                </DialogContent>
                <DialogActions sx={{ marginTop: '48px' }}>
                    <div style={{ flex: 2 }}>
                        <button className='btn btn-light' onClick={onDelete}>Delete</button>
                    </div>
                    <div className='flex'>
                        <button className='btn' onClick={onClose}>Cancel</button>
                        <button className='btn btn-primary' onClick={handleSubmit(onUpdate)}>Update</button>
                    </div>
                </DialogActions>
            </Dialog>
            
        </div>
    );
};

export default UpdateForm;
