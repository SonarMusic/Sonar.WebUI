import React, {useState} from 'react';
import {PlaylistApiClient} from "../../utils/ApiClientsInstances";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "react-query";

const CreatePlaylist = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [playlistName, setPlaylistName] = useState("");
    const [error, setError] = useState("");

    const createPlaylist = async (e) => {
        e.preventDefault();
        setError("");
        try {
            let id = await PlaylistApiClient.createPlaylist(localStorage.getItem('token'), playlistName);
            await queryClient.invalidateQueries('playlistsList');
            navigate(`/playlist/${id}`)
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div className="container">
            <p className="h1 text-center">Create playlist</p>
            <form onSubmit={createPlaylist}>
                {error &&
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                }
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Playlist name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="emailInput"
                        value={playlistName}
                        onChange={e => setPlaylistName(e.target.value)}
                        aria-describedby="emailHelp"/>
                </div>
                <button type="submit" className="btn btn-primary me-2">Create</button>
            </form>
        </div>
    );
};

export default CreatePlaylist;