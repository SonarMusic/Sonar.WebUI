import React, {useContext} from 'react';
import ItemsList from "../../components/ItemsList";
import {TracksModuleUrl, UserTracksApiClient} from "../../utils/ApiClientsInstances";
import axios from "axios";
import {AuthorizationContext, PlayerContext} from "../../context";
import {QueryClient, useQuery} from "react-query";
import Loader from "../../components/UI/Loader";
import TracksListElement from "../../components/TracksListElement";

const Main = () => {
    const {currentTrack, setCurrentTrack} = useContext(PlayerContext);
    const {authorizeState} = useContext(AuthorizationContext);

    const queryClient = new QueryClient();
    const {data, isLoading} = useQuery('mainListTracks', () =>
        UserTracksApiClient.getAllTacks(localStorage.getItem('token'))
            .then(t => {{console.log(authorizeState.id); console.log(t); return {
                privateTracks: t.filter(t => t.ownerId === authorizeState.id),
                onlyFansTracks: t.filter(t => t.ownerId !== authorizeState.id && t.type === 2),
                publicTracks: t.filter(t => t.ownerId !== authorizeState.id && t.type === 1)
            }}})
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
            <p className="h1 text-center">My tracks</p>
            {isLoading
                ? <Loader/>
                : <ItemsList
                    title={"Title"}
                    items={data.privateTracks}
                    elementsFactory={
                        (item, number) => <TracksListElement key={number} number={number} item={item} removeAction={removeTrack}/>}
                />
            }
            <p className="h1 text-center">Friends tracks</p>
            {isLoading
                ? <Loader/>
                : <ItemsList
                    title={"Title"}
                    items={data.onlyFansTracks}
                    elementsFactory={
                        (item, number) => <TracksListElement key={number} number={number} item={item}/>}
                />
            }
            <p className="h1 text-center">Public tracks</p>
            {isLoading
                ? <Loader/>
                : <ItemsList
                    title={"Title"}
                    items={data.publicTracks}
                    elementsFactory={
                        (item, number) => <TracksListElement key={number} number={number} item={item}/>}
                />
            }
        </div>
    );
};

export default Main;