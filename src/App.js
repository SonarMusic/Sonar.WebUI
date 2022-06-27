import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './styles/App.css'
import {AuthorizationContext} from "./context";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {UserApiClient} from "./utils/ApiClientsInstances";

const App = () => {
    const [authorizeState, setAuthorizeState] = useState({state: false, email:"", id:""});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            UserApiClient.getUser(localStorage.getItem('token')).then(user => {
                console.log(user);
                setAuthorizeState({id:user.id, email: user.email, state:true})
            });
        }
        setIsLoading(false);
    }, [])

    return (
        <AuthorizationContext.Provider value={{
            authorizeState,
            setAuthorizeState,
            isLoading
        }}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </AuthorizationContext.Provider>
    );
};

export default App;