import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../auth.css"

import useInput from '../../hooks/use-input';


//MUI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

const Signup = () => {


  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const {
    value: name,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inptBlurChangeHandler: nameBlurChangeHandler,
    reset: resetNameInput,
  } = useInput(value => value.trim() !== "");

  const {
    value: email,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inptBlurChangeHandler: emailBlurChangeHandler,
    reset: resetEmailInput,
  } = useInput(value => (
    value.includes("@") && value.includes(".") && value.trim() !== ""
  ));

  const {
    value: password,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inptBlurChangeHandler: passwordBlurChangeHandler,
    reset: resetPasswordInput,
  } = useInput(value => (
    value.trim() !== "" && value.length >= 7
  ));


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (enteredNameIsValid && enteredEmailIsValid && enteredPasswordIsValid) {
      try {
        const response = await fetch('http://localhost:8000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password           
          }),
        });       

        const errorMes = await response.json()
        const status = await response.ok;
        if (status) {
          resetNameInput();
          resetPasswordInput();
          resetEmailInput();
          navigate('/auth/login')
        } else {
          setErrorMessage(
            <div className='error__message'>
              <Alert severity="error">{errorMes} — check it out!</Alert>
            </div>
          )
        }
      } catch {
        console.log("sxva errori");
      }
    }

  };



  return (
    <div className='signup'>
      <h3>Signup</h3>
      {errorMessage}
      <form onSubmit={handleSubmit}>
        <div className='input'>
          <TextField
            error={nameInputHasError}
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameBlurChangeHandler}
            {...nameInputHasError
              ? {
                id: "filled-error-helper-text",
                label: "Error",
                helperText: "Name Must Not Be Empty.",
                variant: "filled"
              }
              : {
                id: "outlined-basic",
                label: "Name",
                variant: "outlined",
              }
            }
          />
        </div>

        <div className='input'>
          <TextField
            error={emailInputHasError}
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurChangeHandler}
            {...emailInputHasError
              ? {
                id: "filled-error-helper-text",
                label: "Error",
                helperText: "Please Enter Correct Email.",
                variant: "filled"
              }
              : {
                id: "outlined-basic",
                label: "Email",
                variant: "outlined",
              }
            }
          />
        </div>

        <div className='input'>
          <TextField
            error={passwordInputHasError}
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurChangeHandler}
            {...passwordInputHasError
              ? {
                id: "filled-error-helper-text",
                type: "password",
                label: "Error",
                helperText: "Password must be at least 7 characters.",
                variant: "filled"
              }
              : {
                id: "outlined-basic",
                label: "Password",
                type: "password",
                variant: "outlined",
              }
            }
          />
        </div>



        <div className='btn'>
          <Button variant="outlined" type="submit" >Register</Button>
        </div>
        <p><i>Already have an account? </i><Link to="/auth/login" >Sign in</Link></p>

      </form>
    </div>
  );
};

export default Signup;
