import NavBar from './components/NavBar';

import React from 'react';
import Loading from './components/Loading';
import LogIn from './components/login/LogIn';
import Notification from './components/notification/Notification';
import BottomNavbar from './components/BottomNavbar';
import Tiffin from './components/tiffin/Tiffin';

const App = () => {
    return (
        <React.Fragment>
            <Loading />
            <Notification />
            <LogIn />
            <NavBar />
            <BottomNavbar />
            <Tiffin />
        </React.Fragment>
    );
};

export default App;
