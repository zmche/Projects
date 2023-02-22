import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';

const Welcome = () => {
  return (
    <div className='welcome'>
      <h3>Welcome</h3>
      <Button className='btn' variant="contained" ><Link to="/auth/login">Login</Link><br /></Button>
      <Button className='btn' variant="outlined"><Link to='/auth/signup'><Link to="/auth/signup">Sign Up</Link></Link></Button>      
      
      
    </div>
  );
};

export default Welcome;
