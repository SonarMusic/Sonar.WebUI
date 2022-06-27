import React, {useContext, useState} from 'react';
import {AuthorizationContext, PlayerContext} from "../context";
import Loader from "./UI/Loader";
import Navbar from "./Navbar/Navbar";
import Main from "../pages/private/Main";
import Player from "./Player";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Upload from "../pages/private/Upload";
import CreatePlaylist from "../pages/private/CreatePlaylist";
import Playlist from "../pages/private/Playlist";
import {QueryClient, QueryClientProvider} from "react-query";
import Friends from "../pages/private/Friends";
import Import from "../pages/private/Import";
import ManageAccess from "../pages/private/ManageAccess";

const AppRouter = () => {
    const {isAuthorized, isLoading} = useContext(AuthorizationContext);
    const queryClient = new QueryClient();

    const [currentTrack, setCurrentTrack] = useState({
        id: "",
        title: ""
    });

    if (isLoading)
        return <Loader/>

    return (
        isAuthorized ?
            <PlayerContext.Provider
                value={{
                    currentTrack,
                    setCurrentTrack
                }}
            >
                <QueryClientProvider client={queryClient}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-auto">
                                <Navbar/>
                            </div>
                            <div className="col">
                                <Routes>
                                    <Route path="/" element={<Main/>}/>
                                    <Route path="/upload" element={<Upload/>}/>
                                    <Route path="/create/playlist" element={<CreatePlaylist/>}/>
                                    <Route path="/playlist/:id" element={<Playlist/>}/>
                                    <Route path="/friends" element={<Friends/>}/>
                                    <Route path="/import" element={<Import/>}/>
                                    <Route path="/access" element={<ManageAccess/>}/>
                                    <Route path="*" element={<Navigate to="/"/>}/>
                                </Routes>
                            </div>
                        </div>
                        <Player/>
                    </div>
                </QueryClientProvider>
            </PlayerContext.Provider>
            :
        <Routes>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="*" element={<Login/>}></Route>
        </Routes>
    );
};

export default AppRouter;