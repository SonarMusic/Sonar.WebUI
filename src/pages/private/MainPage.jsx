import React, {useContext} from 'react';
import TracksList from "../../components/TracksList";
import {TracksModuleUrl, UserTracksApiClient} from "../../utils/ApiClientsInstances";
import axios from "axios";
import {PlayerContext} from "../../context";
import {QueryClient, useQuery} from "react-query";
import Loader from "../../components/UI/Loader";

const MainPage = () => {
    const {currentTrack, setCurrentTrack} = useContext(PlayerContext);

    const queryClient = new QueryClient();
    const {data: tracks, isLoading} = useQuery('mainListTracks', () =>
        UserTracksApiClient.getAllTacks(localStorage.getItem('token')).then(t => t)
    );

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
        await queryClient.invalidateQueries('mainListTracks');
    }

    return (
        <div className="container">
            <p className="h1 text-center">All tracks</p>
            {isLoading
                ? <TracksList actionButton={{text:"Delete track", type:"danger", callback: removeTrack}} tracks={tracks}/>
                : <Loader/>
            }
        </div>
    );
};

export default MainPage;