import React, { useEffect } from 'react'
// import { sp } from '@pnp/sp'
import '@pnp/sp/webs'
import '@pnp/sp/files'
import '@pnp/sp/items'
import '@pnp/sp/lists'
import '@pnp/sp/fields'
import { Input, InputLabel, FormControl, FormHelperText } from '@mui/material'
import './UpdateForm.css'

function UpdateForm({ list, columns, item }) {
    useEffect(() => {
        (async () => {
            // Get item
        })();

        return () => { };
    });

    return (
        <div className="form-group">
            <form>
                {
                    columns
                        .filter(({ field }) => field.toLowerCase() !== 'id')
                        .map(({ field, headerName, description }) => {
                            return (
                                <FormControl key={field} variant="standard" fullWidth>
                                    <InputLabel htmlFor={`field-${field}`}>{headerName}</InputLabel>
                                    <Input id={`field-${field}`} defaultValue={item[field] || ""} aria-describedby={`${field}-helper-text`} />
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
        </div>
    );
};

export default UpdateForm;
