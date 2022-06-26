import React, {useContext, useRef} from 'react';
import ReactPlayer from "react-player";
import cs from './Player.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {PlayerContext} from "../context";
import {QueueApiClient, TracksModuleUrl} from "../utils/ApiClientsInstances";
import {useQuery, useQueryClient} from "react-query";

const Player = () => {
    const {currentTrack, setCurrentTrack} = useContext(PlayerContext);

    const getTrackUrl = () => {
        return  currentTrack.id ? `${TracksModuleUrl}/files/track-stream-info?id=${currentTrack.id}` : "sample.mp3";
    }

    const nextTrack = () => {
        QueueApiClient.getNextTrack(localStorage.getItem('token')).then(t => {
            setCurrentTrack({id: t.id, title: t.name})
        });
    }

    const previousTrack = () => {
        QueueApiClient.getPreviousTrack(localStorage.getItem('token')).then(t => {
            setCurrentTrack({id: t.id, title: t.name});
        });
    };

    const shuffleTracks = () => {
        QueueApiClient.shuffleTracks(localStorage.getItem('token')).then(t => {
            QueueApiClient.currentTrack(localStorage.getItem('token')).then(t => {
                setCurrentTrack({id: t.id, title: t.name});
            });
        });
    }

    const purgeQueue = () => {
        QueueApiClient.purgeQueue(localStorage.getItem('token')).then(t => {
            setCurrentTrack({id: "", title: ""});
        });
    }

    const player = useRef();
    return (
        <div className={`${cs.player} fixed-bottom border-top container-fluid`}>
            <div className="row justify-content-center align-items-center">
                <div className="col-auto p-0">
                    <div className="row justify-content-center align-items-center">
                        <div className="col">
                            <p style={{marginTop:"15px", whiteSpace: "nowrap", cursor:"pointer"}}>{currentTrack.title}</p>
                        </div>
                        <div className="col-auto">
                            <a onClick={previousTrack} className={`${cs.icon} bi bi-skip-start-fill`} style={{fontSize: "1.3rem"}}/>
                            <a onClick={nextTrack} className={`${cs.icon} bi bi-skip-end-fill`} style={{fontSize: "1.3rem"}}/>
                            <a onClick={shuffleTracks} className={`${cs.icon} bi bi-shuffle ms-1`} style={{fontSize: "1.1rem"}}/>
                        </div>
                    </div>
                </div>
                <div className="col-8 p-0">
                    <div className={cs.rplayer}>
                        <ReactPlayer
                            playing={true}
                            onEnded={nextTrack}
                            config={{
                                file: {
                                    forceAudio: true,
                                    forceHLS: true,
                                    hlsOptions: {
                                        xhrSetup : function (xhr, url) {
                                            xhr.setRequestHeader('Token', localStorage.getItem('token'));
                                        }
                                    }
                                }
                            }}
                            controls={true}
                            ref={player}
                            url={getTrackUrl()}></ReactPlayer>
                    </div>
                </div>
                <div className="col-auto p-0">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-auto">
                            <a onClick={purgeQueue} className={`${cs.icon} bi bi-trash ms-1`} style={{fontSize: "1.1rem"}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;