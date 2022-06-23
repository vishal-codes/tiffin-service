import { Lock } from '@mui/icons-material';
import { Alert, AlertTitle, Button, Container } from '@mui/material';
import React from 'react';

import { useValue } from '../../context/ContextProvider';

const AccessMessage = () => {
    const { dispatch } = useValue();

    return (
        <Container sx={{ py: 5 }}>
            <Alert severity='error' variant='outlined'>
                <AlertTitle>Forbidden Access</AlertTitle>
                Please Login or register to view this page.
                <Button
                    color='primary'
                    variant='outlined'
                    sx={{ ml: 2 }}
                    startIcon={<Lock />}
                    onClick={() => dispatch({ type: 'OPEN_LOGIN' })}
                >
                    Login
                </Button>
            </Alert>
        </Container>
    );
};

export default AccessMessage;
