import React, {useContext} from 'react';
import './Navbar.css'
import {Link} from "react-router-dom";
import {PlaylistApiClient} from "../../utils/ApiClientsInstances";
import {AuthorizationContext} from "../../context";
import NavbarCategory from "./NavbarCategory";
import {useQuery} from "react-query";

const Navbar = () => {
    const {setIsAuthorized} = useContext(AuthorizationContext);

    const {isLoading, data: playlists} = useQuery('playlistsList',  async () =>
        PlaylistApiClient.getUserPlaylists(localStorage.getItem('token')).then(t => t)
    );

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsAuthorized(false);
    }

    return (
        <div className="sidebar flex-shrink-0 p-1 bg-white" style={{width: "280px"}}>
            <a href="/src/pages" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                <span className="fs-5 fw-semibold">Sonar</span>
            </a>
            <ul className="list-unstyled ps-0">
                <NavbarCategory title="Tracks">
                    <li><Link to="/" className="link-dark rounded">All</Link></li>
                    <li><Link to="/upload" className="link-dark rounded">Upload</Link></li>
                    <li><Link to="/import" className="link-dark rounded">Import</Link></li>
                    <li><Link to="/access" className="link-dark rounded">Manage access</Link></li>
                </NavbarCategory>
                <NavbarCategory title="Playlists">
                            <li><Link to="/create/playlist" className="link-dark rounded">Create</Link></li>
                            {isLoading ? <span>Loading...</span> : playlists.map(p =>
                                <li key={p.id}><Link to={`/playlist/${p.id}`} className="link-dark rounded">{p.name}</Link></li>
                            )}
                </NavbarCategory>
                <li className="border-top my-3"></li>
                <NavbarCategory title="Account">
                    <li><Link to="/friends" className="link-dark rounded">Friends</Link></li>
                    <li><a onClick={logout} className="link-dark rounded">Sign out</a></li>
                </NavbarCategory>
            </ul>
        </div>
    );
};

export default Navbar;