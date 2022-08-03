import React from 'react'
import { Input, InputLabel, FormControl, FormHelperText } from '@mui/material'
import './UpdateForm.css'

function UpdateForm({ columns, item }) {
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
