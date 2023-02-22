import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import "../auth.css"

//MUI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';


const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const { accessToken, user } = await response.json();
      localStorage.setItem('authToken', accessToken);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userName', user.name);

      navigate('/member');
    } catch (e) {           
      setErrorMessage(
        <div className='error__message'>
          <Alert severity="error">{e.message} — check it out!</Alert>
        </div>
      )
    }
  };


  return (
    <>
      <div className='login'>
        <h3>Login</h3>
        <form >
          <div className='input'>
            <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className='input'>
            <TextField id="outlined-basic" type="password" label="Password" variant="outlined" value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          {errorMessage}
          <div className='btn'>
            <Button className='btn' variant="contained" onClick={handleSubmit}>Log In</Button>
          </div>
          <p><i>Don't have an account? </i><Link to="/auth/signup" >Sign Up</Link></p>



        </form>

      </div>



    </>
  );
};

export default Login;
