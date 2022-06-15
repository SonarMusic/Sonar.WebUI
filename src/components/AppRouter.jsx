import React, {useContext, useState} from 'react';
import {AuthorizationContext, PlayerContext, PlaylistContext} from "../context";
import Loader from "./UI/Loader";
import Navbar from "./Navbar/Navbar";
import MainPage from "../pages/private/MainPage";
import Player from "./Player";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import UploadPage from "../pages/private/UploadPage";
import CreatePlaylistPage from "../pages/private/CreatePlaylistPage";
import PlaylistPage from "../pages/private/PlaylistPage";

const AppRouter = () => {
    const {isAuthorized, isLoading} = useContext(AuthorizationContext);
    const [trigger, setTrigger] = useState(false);

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
                <PlaylistContext.Provider
                    value={{
                        trigger,
                        setTrigger
                    }}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-auto">
                                <Navbar/>
                            </div>
                            <div className="col">
                                <Routes>
                                    <Route path="/" element={<MainPage/>}/>
                                    <Route path="/upload" element={<UploadPage/>}/>
                                    <Route path="/create/playlist" element={<CreatePlaylistPage/>}/>
                                    <Route path="/playlist/:id" element={<PlaylistPage/>}/>
                                    <Route path="*" element={<Navigate to="/"/>}/>
                                </Routes>
                            </div>
                        </div>
                        <Player/>
                    </div>
                </PlaylistContext.Provider>
            </PlayerContext.Provider>
            :
        <Routes>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="*" element={<Login/>}></Route>
        </Routes>
    );
};

export default AppRouter;