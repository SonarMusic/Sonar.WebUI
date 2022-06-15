import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import './styles/App.css'
import {AuthorizationContext} from "./context";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

const App = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthorized(true)
        }
        setIsLoading(false);
    }, [])

    return (
        <AuthorizationContext.Provider value={{
            isAuthorized,
            setIsAuthorized,
            isLoading
        }}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </AuthorizationContext.Provider>
    );
};

export default App;