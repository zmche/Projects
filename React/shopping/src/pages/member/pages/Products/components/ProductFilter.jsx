import React, { useState } from 'react'
import "../Products.css";

import { Grid, TextField, Button } from '@mui/material';

export default function ProductFilter({ maxPrice, minPrice, handleChange }) {


    const [max, setMax] = useState(maxPrice);
    const [min, setMin] = useState(minPrice);

    return (
        <div className='filter'>
            <Grid container spacing={2}>
                <Grid item >
                    Filter:
                </Grid>

                <Grid item>
                    <TextField value={max} label="Max" onChange={e => setMax(e.target.value)} />
                </Grid>

                <Grid item>
                    <TextField value={min} label="Min" onChange={e => setMin(e.target.value)} />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" onClick={() => handleChange(max, min)}>Filter</Button>
                </Grid>

                <Grid item xs={12}>
                    <Button variant="outlined" onClick={() => {                       
                        handleChange(0, 0);
                        setMax(0);
                        setMin(0);
                    }}>Clear</Button>
                </Grid>

            </Grid>
        </div>
    );
}
