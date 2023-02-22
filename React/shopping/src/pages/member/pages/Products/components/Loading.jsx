import React from 'react'
import "../Products.css"

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export default function Loading() {
  return (
    <div >
    <Box className='loading'>
      <CircularProgress />
    </Box>
    </div>
  )
}
