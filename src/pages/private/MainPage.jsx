import React, {useContext, useEffect, useState} from 'react';
import TracksList from "../../components/TracksList";
import {useFetching} from "../../hooks/useFetching";
import {TracksModuleUrl, UserTracksApiClient} from "../../utils/ApiClientsInstances";
import axios from "axios";
import {PlayerContext} from "../../context";

const MainPage = () => {
    const [tracks, setTracks] = useState([]);
    const {currentTrack, setCurrentTrack} = useContext(PlayerContext);
    const [trigger, setTrigger] = useState(false);
    const [fetchTracks, isLoading, error] = useFetching(async () => {
        UserTracksApiClient.all2(localStorage.getItem('token')).then(t => setTracks(t))
            .catch(e =>console.log(e))
    })

    useEffect(() => {
        fetchTracks();
    }, [trigger])

    const removeTrack = async (e) => {
        e.stopPropagation();
        const trackId = e.target.id;
        await axios.delete(`${TracksModuleUrl}/files/track?trackId=${trackId}`, {
            headers: {
                Token : localStorage.getItem('token')
            }
        });
        if (currentTrack.id === trackId) {
            setCurrentTrack({id: "", title: ""})
        }
        setTrigger(!trigger);
    }

    return (
        <div className="container">
            <p className="h1 text-center">All tracks</p>
            <TracksList actionButton={{text:"Delete track", type:"danger", callback: removeTrack}} tracks={tracks}/>
        </div>
    );
};

export default MainPage;