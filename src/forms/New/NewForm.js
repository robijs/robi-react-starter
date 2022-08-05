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
import './NewForm.css'

function NewForm({ open, setOpen, setRows, rows, columns, list }) {
    const { handleSubmit, register, unregister, reset } = useForm();

    // Reset form when item changes
    useEffect(() => {
        columns
            .filter(({ field }) => field.toLowerCase() !== 'id')
            .forEach(({ field }) => {
                unregister(field);
            });

        reset();
    }, [reset, unregister, columns])

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

        const { data: newItem } = await sp.web.lists
            .getByTitle(list)
            .items
            .add(data);


        newItem.id = newItem.Id;

        setRows(rows.concat([newItem]));
        setOpen(false);
    }

    return (
        <div className="form-group">
            <Dialog open={open} onClose={onClose} fullWidth>
                <DialogTitle>New {list} Item</DialogTitle>
                <DialogContent>
                    <form>
                    {
                        columns
                            .filter(({ field }) => field.toLowerCase() !== 'id')
                            .map(({ field, headerName, description }) => {
                                return (
                                    <FormControl key={field} variant="standard" fullWidth>
                                        <InputLabel variant="filled" htmlFor={`field-${field}`}>{headerName}</InputLabel>
                                        <FilledInput
                                            id={`field-${field}`}
                                            // value={""}
                                            disableUnderline={true}
                                            aria-describedby={`${field}-helper-text`}
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
                    <div className='flex'>
                        <button className='btn' onClick={onClose}>Cancel</button>
                        <button className='btn btn-primary' onClick={handleSubmit(onUpdate)}>Create</button>
                    </div>
                </DialogActions>
            </Dialog>
            
        </div>
    );
};

export default NewForm;
