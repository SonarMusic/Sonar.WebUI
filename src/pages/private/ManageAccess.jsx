import React, {useContext} from 'react';
import ItemsList from "../../components/ItemsList";
import {useQuery, useQueryClient} from "react-query";
import {UserApiClient, UserTracksApiClient} from "../../utils/ApiClientsInstances";
import ListElement from "../../components/ListElement";
import {AuthorizationContext} from "../../context";

const ManageAccess = () => {
    const {authorizeState} = useContext(AuthorizationContext);

    const {data: tracks, isLoading} = useQuery('accessTracks', () =>
        UserTracksApiClient.getAllTacks(localStorage.getItem('token')).then(t => t.filter(x => x.ownerId === authorizeState.id))
    );

    const queryClient = useQueryClient();

    const accessTypeChanged = async (e) => {
        const id = e.target.id;
        const accessType = e.target.value;
        if (accessType === "1") {
            console.log(1);
            await UserTracksApiClient.changeAccessToPublic(localStorage.getItem('token'), id);
        } else if (accessType === "2") {
            await UserTracksApiClient.changeAccessToOnlyFans(localStorage.getItem('token'), id);
        } else {
            await UserTracksApiClient.changeAccessToPrivate(localStorage.getItem('token'), id);
        }
        queryClient.invalidateQueries("accessTracks");
    }

    return (
        <div className="container">
            <p className="h1 text-center">Manage access</p>
            {!isLoading &&
                <ItemsList
                    title={"Title"}
                    items={tracks}
                    elementsFactory={
                        (item, number) =>
                            <ListElement itemTitle={item.name} number={number} key={number}>
                                <select id={item.id} value={item.type} onSelect={accessTypeChanged} onChange={accessTypeChanged} className="form-select" aria-label="Default select example">
                                    <option value="1">Public</option>
                                    <option value="2">OnlyFans</option>
                                    <option value="3">Private</option>
                                </select>
                            </ListElement>
                    }
                />
            }
        </div>
    );
};

export default ManageAccess;