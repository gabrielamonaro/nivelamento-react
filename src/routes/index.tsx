import React from "react";
// import {Route} from 'react-router-dom' 
import Route from './Route'
import { Switch } from "react-router-dom";//switch permite que apenas uma rota seja usada por vez --> https://www.datainfinities.com/40/switch-is-not-exported-from-react-router-dom


import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={SignIn}/>
        <Route path="/signup" exact component={SignUp}/>

        <Route path="/dashboard" component={Dashboard} isPrivate/>
        <Route path="/forgotPassword" component={ForgotPassword}/>
        <Route path="/resetPassword" component={ResetPassword}/>
    </Switch>
)

export default Routes
 