import React from 'react';
import TracksListItem from "./TracksListItem";

const TracksList = ({tracks, actionButton}) => {
    return (
        <div className="list-group list-group-flush p-1 border rounded">
            <div className="list-group-item">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-1 text-start">№</div>
                        <div className="col-3 text-start">Title</div>
                    </div>
                </div>
            </div>
            {tracks.map((t, num) =>
                <TracksListItem actionButton={actionButton} number={num+1} key={t.id} itemId={t.id} itemTitle={t.name}/>
            )}
        </div>
    );
};

export default TracksList;