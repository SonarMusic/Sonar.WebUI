import React, {useState} from 'react';
import {useQuery, useQueryClient} from "react-query";
import {RelationshipsApiClient} from "../../utils/ApiClientsInstances";
import Loader from "../../components/UI/Loader";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import ItemsList from "../../components/ItemsList";
import ListElement from "../../components/ListElement";

const Friends = () => {
    const queryClient = useQueryClient();
    const {data: friends, isLoading: isFriendsLoading} = useQuery('friendsList',
        async () => RelationshipsApiClient.getFriends(localStorage.getItem('token')).catch(e => console.log(e)).then(t => t))

    const {data: requestsToMe, isLoading: isRequestsToMeLoading} = useQuery('requestsToMeList',
        async () => RelationshipsApiClient.getRequestsToMe(localStorage.getItem('token')).catch(e => console.log(e)).then(t => t))

    const {data: requestsFromMe, isLoading: isRequestsFromMeLoading} = useQuery('requestsFromMeList',
        async () => RelationshipsApiClient.getRequestsFromMe(localStorage.getItem('token')).catch(e => console.log(e)).then(t => t))


    const rejectRequest = (userEmail) => {
        RelationshipsApiClient.rejectFriendRequest(localStorage.getItem('token'), userEmail).then(() => queryClient.invalidateQueries('requestsToMeList'));
    }

    const acceptRequest = (userEmail) => {
        RelationshipsApiClient.acceptFriendRequest(localStorage.getItem('token'), userEmail).then(() => { queryClient.invalidateQueries('requestsToMeList'); queryClient.invalidateQueries('friendsList') });
    }

    const [email, setEmail] = useState("");

    const sendRequest = () => {
        RelationshipsApiClient.sendFriendRequest(localStorage.getItem('token'), email).then(() => { queryClient.invalidateQueries('requestsFromMeList'); setEmail("")});
    }

    return (
        <div>
            <p className="h1 text-center">Friends</p>
            <Tabs selectedTabClassName="active" focusTabOnClick={false}>
                <TabList className={"nav nav-tabs"}>
                    <Tab className={"nav-item nav-link"}>Friends</Tab>
                    <Tab className={"nav-item nav-link"}>Requests to me</Tab>
                    <Tab className={"nav-item nav-link"}>Requests from me</Tab>
                    <Tab className={"nav-item nav-link"}>Send request</Tab>
                </TabList>
                    <TabPanel>
                        {
                            isFriendsLoading ? <Loader/> : <ItemsList items={friends} elementsFactory={
                                    (item) => <ListElement itemId={item.id} itemTitle={item.email}/>
                                }
                            />
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            isRequestsToMeLoading ? <Loader/> : <ItemsList items={requestsToMe} elementsFactory={
                                (item) => <ListElement itemId={item.id} itemTitle={item.email}>
                                    <button type="button" className="btn btn-danger me-2" onClick={() => rejectRequest(item.email)}>Reject</button>
                                    <button type="button" className="btn btn-success" onClick={() => acceptRequest(item.email)}>Accept</button>
                                </ListElement>
                            }
                            />
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            isRequestsFromMeLoading ? <Loader/> : <ItemsList items={requestsFromMe} elementsFactory={
                                (item) => <ListElement itemId={item.id} itemTitle={item.email}/>
                            }
                            />
                        }
                    </TabPanel>
                    <TabPanel>
                        <div className="container-fluid border">
                            <div className="input-group mt-3 mb-3">
                                    <input type="text" className="form-control" placeholder="User email"
                                           aria-label="Recipient's username" value={email}
                                           onChange={(e) => setEmail(e.target.value)}/>
                                    <button className="btn btn-outline-primary" type="button"
                                        onClick={sendRequest}>Send</button>
                            </div>
                        </div>
                    </TabPanel>
            </Tabs>
        </div>
    );
};

export default Friends;