import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: '4px',
        border: 0,
        flex: 1,
        textTransform: 'unset',
        color: 'var(--primary)',
        fontWeight: 500,
        letterSpacing: 'normal',
        whiteSpace: 'nowrap',
        padding: '6px 12px',
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:first-of-type)': {
            borderRadius: '10px',
        },
        '&:first-of-type': {
            borderRadius: '10px',
        },
        '&:hover': {
            backgroundColor: 'var(--button-background)'
        }
    }
}));

export default function ToggleBar({ rows, setRows, options }) {
    const [value, setValue] = useState(options[0].label);

    function handleValue(event, newValue) {
        setValue(newValue)
    }

    return (
        <div>
            <Paper
                elevation={0}
                sx={{
                    display: 'flex',
                    border: 'none',
                    flexWrap: 'wrap',
                }}
            >
                <StyledToggleButtonGroup
                    color="primary"
                    size="small"
                    value={value}
                    exclusive
                    onChange={handleValue}
                    aria-label="text alignment"
                >
                    {
                        options && options.map(({ label, filter }) => {
                            return (
                                <ToggleButton
                                    key={label}
                                    value={label}
                                    aria-label={label}
                                    onClick={() => {
                                        filter(rows, setRows);
                                    }}
                                >
                                    {label}
                                </ToggleButton>
                            )
                        })
                    }
                </StyledToggleButtonGroup>
            </Paper>
        </div>
    );
}
