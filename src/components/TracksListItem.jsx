import React, {useContext} from 'react';
import {PlayerContext} from "../context";

const TracksListItem = ({itemId, itemTitle, number, actionButton}) => {
    const {setCurrentTrack} = useContext(PlayerContext);

    const selectTrack = (e) => {
        e.preventDefault();
        setCurrentTrack({id: itemId, title: itemTitle})
    }

    return (

        <div onClick={selectTrack} className="list-group-item list-group-item-action">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-1 text-start">{number}</div>
                    <div className="col-3 text-start">
                        <a>{itemTitle}</a>
                    </div>
                    {actionButton && <div className="col text-end">
                        <button id={itemId} onClick={actionButton.callback} className={`btn btn-${actionButton.type}`}>
                            {actionButton.text}
                        </button>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default TracksListItem;