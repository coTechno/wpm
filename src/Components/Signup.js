import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material';
import { auth, db } from '../firebaseConfig';
import { useAlert } from '../Context/AlertContext';
import { useTheme } from '../Context/ThemeContext'
import errorMap from '../Error404/errorMessages'


const Signup = ({ handleClose }) => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { setAlert } = useAlert();
    const { theme } = useTheme();

    const checkUserExists = async () => {
        const ref = db.collection('usernames').doc(`${username}`)
        const response = await ref.get();
        return !response.exists;
    }

    const handleSubmit = async () => {
        if (!email || !password || !confirmPassword) {
            setAlert({
                open: true,
                type: 'warning',
                message: 'Please Enter All Details!'
            });
            return;
        }
        if (password !== confirmPassword) {
            setAlert({
                open: true,
                type: 'warning',
                message: 'Password Mismatch'
            });
            return;
        }

        if (await checkUserExists()) {
            auth.createUserWithEmailAndPassword(email, password).then(async (res) => {

                const ref = await db.collection('usernames').doc(`${username}`).set({
                    uid: res.user.uid
                }).then(response => {
                    setAlert({
                        open: true,
                        type: 'success',
                        message: 'Account Created!'
                    });
                    handleClose();
                })
            }).catch(err => {
                setAlert({
                    open: true,
                    type: 'error',
                    message: errorMap[err.code] || 'Some Error Occorred!'
                })
            })
        }
        else {
            setAlert({
                open: true,
                type: 'warning',
                message: 'Username already taken'
            })
        }
    }

    return (
        <Box p={3}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                backgroundColor: 'transparent',
                padding: 10
            }}>
            <TextField
                variant='outlined'
                type='text'
                label='Enter Username'
                onChange={(e) => setUsername(e.target.value)}
                InputLabelProps={
                    {
                        style: { color: theme.title }
                    }
                }
                InputProps={{
                    style: { color: theme.title }
                }}>

            </TextField>
            <TextField variant='outlined'
                type='email'
                label='Enter Email'
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={
                    {
                        style: { color: theme.title }
                    }
                }
                InputProps={{
                    style: { color: theme.title }
                }}>

            </TextField>
            <TextField
                variant='outlined'
                type='password'
                label='Enter password'
                onChange={(e) => setPassword(e.target.value)}
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
                }}>

            </TextField>
            <TextField
                variant='outlined'
                type='password'
                label='Confirm password'
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                }}>

            </TextField>
            <Button variant='contained'
                size='large'
                style={{ backgroundColor: theme.title, color: theme.background }}
                onClick={handleSubmit}>SignUp</Button>
        </Box>
    )
}

export default Signup