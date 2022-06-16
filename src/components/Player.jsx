import React, {useContext, useRef} from 'react';
import ReactPlayer from "react-player";
import cs from './Player.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {PlayerContext} from "../context";
import {TracksModuleUrl} from "../utils/ApiClientsInstances";

const Player = () => {
    const {currentTrack} = useContext(PlayerContext);

    const getTrackUrl = () => {
        return  currentTrack.id ? `${TracksModuleUrl}/files/track-stream-info?id=${currentTrack.id}` : "sample.mp3";
    }

    const player = useRef();
    return (
        <div className={`${cs.player} fixed-bottom border-top container-fluid`}>
            <div className="row justify-content-center align-items-center">
                <div className="col-auto p-0">
                    <div className="row justify-content-center align-items-center">
                        <div className="col">
                            <p style={{marginTop:"15px", whiteSpace: "nowrap"}}>{currentTrack.title}</p>
                        </div>
                        <div className="col-auto">
                            <a className={`${cs.icon} bi bi-skip-start-fill`} style={{fontSize: "1.3rem"}}/>
                            <a className={`${cs.icon} bi bi-skip-end-fill`} style={{fontSize: "1.3rem"}}/>
                        </div>
                    </div>
                </div>
                <div className="col-8 p-0">
                    <div className={cs.rplayer}>
                        <ReactPlayer
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
            </div>
        </div>
    );
};

export default Player;