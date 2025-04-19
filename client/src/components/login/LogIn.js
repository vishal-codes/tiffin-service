import React, { useEffect, useRef, useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    IconButton,
    TextField,
} from '@mui/material';
import { Close, Send } from '@mui/icons-material';

import { useValue } from '../../context/ContextProvider';
import PasswordField from './PasswordField';
import GoogleOneTapLogin from './GoogleOneTapLogin';
import { logIn, register } from '../../actions/user';

const LogIn = () => {
    const {
        state: { openLogIn },
        dispatch,
    } = useValue();
    const [title, setTitle] = useState('Login');
    const [isRegister, setIsRegister] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const handleClose = () => {
        dispatch({
            type: 'CLOSE_LOGIN',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!isRegister) {
            return logIn({ email, password }, dispatch);
        }

        const name = nameRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (password !== confirmPassword) {
            return dispatch({
                type: 'UPDATE_ALERT',
                payload: {
                    open: true,
                    severity: 'error',
                    message: 'Passwords do not match',
                },
            });
        }

        register({ name, email, password }, dispatch);
    };

    useEffect(() => {
        isRegister ? setTitle('Register') : setTitle('LogIn');
    }, [isRegister]);

    return (
        <Dialog open={openLogIn} onClose={handleClose}>
            <DialogTitle>
                {title}
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    onClick={handleClose}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <DialogContentText>
                        Please fill your information in the fields below:
                    </DialogContentText>
                    {isRegister && (
                        <TextField
                            autoFocus
                            margin='normal'
                            variant='standard'
                            id='name'
                            label='Name'
                            type='text'
                            fullWidth
                            inputRef={nameRef}
                            inputProps={{ minLength: 2 }}
                            required
                        />
                    )}
                    <TextField
                        autoFocus={!isRegister}
                        margin='normal'
                        variant='standard'
                        id='email'
                        label='Email'
                        type='email'
                        fullWidth
                        inputRef={emailRef}
                        required
                    />
                    <PasswordField {...{ passwordRef }} />
                    {isRegister && (
                        <PasswordField
                            passwordRef={confirmPasswordRef}
                            id='confirmPassword'
                            label='Confirm Password'
                        />
                    )}
                </DialogContent>
                <DialogActions sx={{ p: '20px', pb: '5px' }}>
                    <Button
                        type='submit'
                        variant='contained'
                        endIcon={<Send />}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </form>
            <DialogActions sx={{ justifyContent: 'left', p: '5px 24px' }}>
                {isRegister
                    ? 'Already have an account? Sign in now'
                    : "Don't have an account? Create one now!"}
                <Button onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? 'LogIn' : 'Register'}
                </Button>
            </DialogActions>
            {/* <DialogActions sx={{ justifyContent: 'center', p: '24px' }}>
                <GoogleOneTapLogin />
            </DialogActions> */}
        </Dialog>
    );
};

export default LogIn;
