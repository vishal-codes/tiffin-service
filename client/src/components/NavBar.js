import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material';
import { Lock, Menu } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';

import { useValue } from '../context/ContextProvider';
import UserIcons from './user/UserIcons';
import Sidebar from './sidebar/Sidebar';

const NavBar = () => {
    const {
        state: { currentUser },
        dispatch,
    } = useValue();

    const [isOpen, setIsOpen] = useState(false);
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setSupportsPWA(true);
            setPromptInstall(e);
        };
        window.addEventListener('beforeinstallprompt', handler);
    }, []);

    const onInstallClick = () => {
        if (!supportsPWA) {
            alert(
                'Either you have already installed the app or your browser does not support PWA :('
            );
            return;
        }
        promptInstall.prompt();
    };

    const renderInstallBtn = () => {
        if (window.matchMedia('(display-mode: standalone)').matches) {
            return;
        } else {
            return (
                <Button
                    startIcon={<DownloadIcon />}
                    variant='outlined'
                    color='inherit'
                    sx={{ marginLeft: '16px' }}
                    onClick={onInstallClick}
                >
                    Install
                </Button>
            );
        }
    };

    return (
        <React.Fragment>
            <AppBar>
                <Container maxWidth='lg'>
                    <Toolbar disableGutters>
                        <Box sx={{ mr: 1 }}>
                            <IconButton
                                sx={{ p: 0 }}
                                size='large'
                                color='inherit'
                                onClick={() => setIsOpen(true)}
                            >
                                <Menu />
                            </IconButton>
                        </Box>
                        <Typography
                            variant='h6'
                            component='h1'
                            noWrap
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' },
                            }}
                        >
                            Yummy Tummy !
                        </Typography>
                        <Typography
                            variant='h6'
                            component='h1'
                            noWrap
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'flex', md: 'none' },
                            }}
                        >
                            Yummy! &nbsp;&nbsp;&nbsp;
                        </Typography>
                        {!currentUser ? (
                            <React.Fragment>
                                <Button
                                    color='inherit'
                                    startIcon={<Lock />}
                                    onClick={() =>
                                        dispatch({
                                            type: 'OPEN_LOGIN',
                                        })
                                    }
                                >
                                    Login
                                </Button>
                                {renderInstallBtn()}
                            </React.Fragment>
                        ) : (
                            <UserIcons />
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
            <Sidebar {...{ isOpen, setIsOpen }} />
        </React.Fragment>
    );
};

export default NavBar;
