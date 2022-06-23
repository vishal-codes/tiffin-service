import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import { useValue } from '../../context/ContextProvider';
import jwtDecode from 'jwt-decode';

const GoogleOneTapLogin = () => {
    const { dispatch } = useValue();

    const googleButton = useRef(null);

    const [disabled, setDisabled] = useState(false);

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
        setDisabled(true);
        try {
            window.google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                ux_mode: 'redirect',
                callback: handleResponse,
            });
            window.google.accounts.id.renderButton(googleButton.current, {
                theme: 'outline',
                size: 'large',
            });
            window.google.accounts.id.prompt((notification) => {
                if (notification.isNotDisplayed()) {
                    dispatch({
                        type: 'UPDATE_ALERT',
                        payload: {
                            open: true,
                            severity: 'error',
                            message:
                                'Please allow third-party cookies for working of authentication.',
                        },
                    });
                }
                if (
                    notification.isSkippedMoment() ||
                    notification.isDismissedMoment()
                ) {
                    setDisabled(false);
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
                disabled={disabled}
                onClick={handleGoogleLogIn}
            >
                LogIn with Google
            </Button>
            <div ref={googleButton}></div>
        </React.Fragment>
    );
};

export default GoogleOneTapLogin;
