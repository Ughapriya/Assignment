import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from './components/pages/LoginPage'
import HomePage from './components/pages/HomePage'
import './App.css'

export default function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/"} component={LoginPage} />
                    <Route exact path={"/home"} component={HomePage} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}