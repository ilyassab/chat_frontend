import React from 'react';
import {connect} from "react-redux";
import {Route, Redirect} from 'react-router-dom';

import {Auth, Home} from './pages';
import {VerifyForm} from "./components";

const App = props => {
    const {isAuth} = props;
    return (
        <div className="wrapper">
            {isAuth ? <Redirect to='/im'/> :
                window.location.pathname === '/verify' ?
                    <Route path="/verify" component={VerifyForm}/> :
                    <Redirect to='/login'/>
            }
            <Route exact path={["/", "/login", "/register"]} component={Auth}/>
            <Route exact path={["/im", "/dialog/:id"]} component={Home}/>
        </div>
    );
};

export default connect(({user}) => ({isAuth: user.isAuth}))(App);
