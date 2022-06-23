import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import { useValue } from '../../context/ContextProvider';
import jwtDecode from 'jwt-decode';

const GoogleOneTapLogin = () => {
    const { dispatch } = useValue();

    const googleButton = useRef(null);

    const [disabled, setDisabled] = useState('flex');

    const handleResponse = (response) => {
        const token = response.credential;
        const decodedToken = jwtDecode(token);
        const { sub: id, email, name, picture: photoURL } = decodedToken;
        dispatch({
            type: 'UPDATE_USER',
            payload: {
                id,
                email,
                name,
                photoURL,
                token,
                google: true,
            },
        });
        dispatch({ type: 'CLOSE_LOGIN' });
    };

    const handleGoogleLogIn = () => {
        setDisabled('none');
        try {
            window.google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                ux_mode: 'popup',
                callback: handleResponse,
            });
            window.google.accounts.id.renderButton(googleButton.current, {
                theme: 'outline',
                size: 'large',
                text: 'continue_with',
            });
            window.google.accounts.id.prompt((notification) => {
                if (notification.isNotDisplayed()) {
                    dispatch({
                        type: 'UPDATE_ALERT',
                        payload: {
                            open: true,
                            severity: 'error',
                            message:
                                "Please allow third-party cookies for ONE TAP SIGN IN or else use the new rendered button of 'Continue with Google'",
                        },
                    });
                }
            });
        } catch (error) {
            dispatch({
                type: 'UPDATE_ALERT',
                payload: {
                    open: true,
                    severity: 'error',
                    message: error.message,
                },
            });
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <Button
                variant='outlined'
                startIcon={<Google />}
                sx={{ display: disabled }}
                onClick={handleGoogleLogIn}
            >
                LogIn with Google
            </Button>
            <div ref={googleButton}></div>
        </React.Fragment>
    );
};

export default GoogleOneTapLogin;
