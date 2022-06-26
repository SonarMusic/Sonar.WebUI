import React, {useContext} from 'react';
import ListElement from "./ListElement";
import {PlayerContext} from "../context";
import {QueueApiClient} from "../utils/ApiClientsInstances";
import {useQueryClient} from "react-query";

const TracksListElement = ({item, number, removeAction}) => {
    const {currentTrack, setCurrentTrack} = useContext(PlayerContext);

    const selectTrack = (id, title) => {
        setCurrentTrack({id: id, title: title})
    }

    const queryClient = useQueryClient();

    const enqueueTrack = (id) => {
        QueueApiClient.addTrackToQueue(localStorage.getItem('token'), id);
        queryClient.invalidateQueries('queue');
    }

    return (
        <ListElement
            onClick={() => selectTrack(item.id, item.name)}
            number={number}
            key={number}
            itemId={item.id}
            itemTitle={item.name}>
            <div className="btn btn-primary me-2" onClick={(e) => {e.stopPropagation(); enqueueTrack(item.id)}}>Enqueue</div>
            <button type="button" id={item.id} className="btn btn-danger" onClick={removeAction}>Remove track</button>
        </ListElement>
    );
};

export default TracksListElement;