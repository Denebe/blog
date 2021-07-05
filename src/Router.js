import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import Edit from './Components/Edit';
import Login from './Components/Login';
import Register from './Components/Register';
import View from './Components/View';
import Write from './Components/Write';


const Router = () => {
    return (
        <BrowserRouter>
            <Route path="/" component={Login} exact={true}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/main" component={App}></Route>
            <Route path="/write" component={Write}></Route>
            <Route path="/view" component={View}></Route>
            <Route path="/edit" component={Edit}></Route>
        </BrowserRouter>
    )
}

export default Router;