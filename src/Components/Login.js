import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material';
import { useAlert } from '../Context/AlertContext';
import { useTheme } from '../Context/ThemeContext';
import { Auth } from 'firebase/auth';
import errorMap from '../Error404/errorMessages'
import { auth } from '../firebaseConfig';

const Login = (handleClose) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setAlert } = useAlert();
    const { theme } = useTheme();
    
    const handleSubmit = () => {
        if(!email || !password){
            setAlert({
                open: true,
                type: 'warning',
                message: 'Please enter all details.'
            })
            return;
        }

        auth.signInWithEmailAndPassword(email, password).then (ok => {
            setAlert({
                open: true,
                type: 'success',
                message: 'Logged in!'
            })
            handleClose();
        }).catch(err => {
            setAlert({
                open: true,
                type: 'error',
                message: errorMap[err.code] || 'Some error occurred'
            })
        })
    }
    
    
    return (
        <Box
            p={3}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                backgroundColor: 'transparent',
                padding: 10,
                marginTop: '5px'
            }}>
            <TextField
                variant='outlined'
                type='email'
                label='Enter Email'
                InputLabelProps={{
                    style: { color: theme.title }
                }}
                InputProps={{
                    style: { color: theme.title }
                }}
                onChange={(e) => setEmail(e.target.value)}>

            </TextField>
            <TextField
                variant='outlined'
                type='password'
                label='Enter password'
                InputLabelProps={
                    {
                        style: {
                            color: theme.title
                        }
                    }
                }
                InputProps={{
                    style: {
                        color: theme.title
                    }
                }}
                onChange={(e) => setPassword(e.target.value)}>

            </TextField>
            <Button
                variant='contained'
                size='large'
                style={{ backgroundColor: theme.title, color: theme.background }}
                onClick={handleSubmit}>Login</Button>
        </Box>
    )
}

export default Login