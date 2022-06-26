import React, {useContext} from 'react';
import ItemsList from "../../components/ItemsList";
import {TracksModuleUrl, UserTracksApiClient} from "../../utils/ApiClientsInstances";
import axios from "axios";
import {PlayerContext} from "../../context";
import {QueryClient, useQuery} from "react-query";
import Loader from "../../components/UI/Loader";
import ListElement from "../../components/ListElement";

const Main = () => {
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

    const selectTrack = (id, title) => {
        setCurrentTrack({id: id, title: title})
    }

    return (
        <div className="container">
            <p className="h1 text-center">All tracks</p>
            {isLoading
                ? <Loader/>
                : <ItemsList
                    title={"Title"}
                    items={tracks}
                    elementsFactory={
                        (item, number) =>
                            <ListElement
                                onClick={() => selectTrack(item.id, item.name)}
                                number={number}
                                key={number}
                                itemId={item.id}
                                itemTitle={item.name}>
                                <button type="button" id={item.id} className="btn btn-danger" onClick={removeTrack}>Delete track</button>
                            </ListElement>}
                />
            }
        </div>
    );
};

export default Main;