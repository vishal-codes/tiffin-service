import React, { useEffect, useRef, useState } from 'react';
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Paper,
} from '@mui/material';
import { AddLocationAlt, LocationOn, Restaurant } from '@mui/icons-material';
import StorefrontIcon from '@mui/icons-material/Storefront';

import ClusterMap from './map/ClusterMap';
import Tiffins from './tiffin/Tiffins';
import AddTiffins from './addTiffin/AddTiffins';
import Protected from './protected/Protected';
import UserTiffins from './user/UserTiffins';

const BottomNavbar = () => {
    const [value, setValue] = useState(0);
    const ref = useRef();
    useEffect(() => {
        ref.current.ownerDocument.body.scrollTop = 0;
    }, [value]);
    return (
        <Box ref={ref}>
            {
                {
                    0: <ClusterMap />,
                    1: <Tiffins />,
                    2: (
                        <Protected>
                            <AddTiffins setPage={setValue} />
                        </Protected>
                    ),
                    3: (
                        <Protected>
                            <UserTiffins />
                        </Protected>
                    ),
                }[value]
            }
            <Paper
                elevation={3}
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 2,
                }}
            >
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(e, newValue) => setValue(newValue)}
                >
                    <BottomNavigationAction label='Map' icon={<LocationOn />} />
                    <BottomNavigationAction
                        label='Tiffin'
                        icon={<Restaurant />}
                    />
                    <BottomNavigationAction
                        label='Add'
                        icon={<AddLocationAlt />}
                    />
                    <BottomNavigationAction
                        label='My Tiffins'
                        icon={<StorefrontIcon />}
                    />
                </BottomNavigation>
            </Paper>
        </Box>
    );
};

export default BottomNavbar;
