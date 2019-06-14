import React from 'react';
import { Scene, Router } from 'react-native-router-flux';

import Login from '../pages/login/Login';
import Home from '../pages/home/home';

const RouterComponent = () => {
    return (
            <Router>
                <Scene key="root" hideNavBar={true}>

                <Scene key="auth">
                    <Scene key="login" initial={true} component={Login} title="Login"  hideNavBar={true} />
                    <Scene key="home"  component={Home} title="Home"  hideNavBar={true} />
                
                </Scene>
                    
                </Scene >
            </Router>
    );
};



export default RouterComponent;