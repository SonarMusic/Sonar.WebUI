import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import TracksList from "../../components/TracksList";
import {useFetching} from "../../hooks/useFetching";
import {PlaylistApiClient, UserTracksApiClient} from "../../utils/ApiClientsInstances";
import Loader from "../../components/UI/Loader";
import modal from "bootstrap/js/src/modal";

const PlaylistPage = () => {
    const [trigger, setTrigger] = useState(false);
    const [playlist, setPlaylist] = useState(null);
    const [fetchPlaylistTracks, isLoading, error] = useFetching(async (id) => {
        let playlist = await PlaylistApiClient.getPlaylist(localStorage.getItem('token'), id);
        let tracks = [...playlist.tracks.sort((t1, t2) => {return t1.number - t2.number})]
            .map(t => {return  {
                id : t.track.id,
                name : t.track.name
            }})
        setPlaylist({
            name: playlist.name,
            tracks :tracks
        })
    })
    const [allTracks, setAllTracks] = useState([]);
    const [fetchTracks, isTracksLoading, tracksError] = useFetching(async () => {
        setAllTracks(await UserTracksApiClient.all2(localStorage.getItem('token')));
        document.getElementById("#")
    });

    useEffect(() => {
        fetchPlaylistTracks(params.id);
    }, [trigger]);

    useEffect(() => {
        fetchTracks();
    }, []);
    const params = useParams();

    const addTrackToPlaylist = async (id) => {
        await PlaylistApiClient.trackPOST(localStorage.getItem('token'), params.id, id);
        setTrigger(!trigger);
        document.getElementById("closeModal").click();
    }

    const removeTrackFromPlaylist = async (e) => {
        const trackId = e.target.id;
        await PlaylistApiClient.trackDELETE(localStorage.getItem('token'), params.id, trackId);
        setTrigger(!trigger);
    }
    return (
        <div className="container">
            <p className="h1 text-center">Playlist {isLoading ? "..." : playlist.name}</p>
            {isLoading ? <Loader/> : <TracksList actionButton={{text:"Remove from playlist", type: "danger", callback: removeTrackFromPlaylist}} tracks={playlist.tracks}></TracksList>}
            <button type="button" id="closeModal" className="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#addTrackToPlModal">
                Add track
            </button>

            <div className="modal fade" id="addTrackToPlModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add track</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul className="list-group list-group-flush">
                                {isTracksLoading ?
                                    <Loader/>
                                    :
                                    allTracks.map(t =>
                                        <a onClick={() => addTrackToPlaylist(t.id)} key={t.id} className="list-group-item list-group-item-action">{t.name}</a>
                                    )
                                }
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PlaylistPage;