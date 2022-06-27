import React, {useState} from 'react';
import {ImportApiClient, TracksModuleUrl} from "../../utils/ApiClientsInstances";
import {useNavigate} from "react-router-dom";

const Import = () => {
    const navigate = useNavigate();
    const [model, setModel] = useState({url: "", name:""});
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const submitForm = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");
        ImportApiClient.importFromYoutube(localStorage.getItem('token'), model.url, model.name).then(t => navigate("/")).catch(e => {
                console.log(e);
                setError(e.message);
                setIsLoading(false);
            });
    }

    return (
        <div className="container">
            <p className="h1 text-center">Import track</p>
            <form className="p-3 border rounded" onSubmit={submitForm}>
                {error &&
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                }
                <div className="mb-3">
                    <label htmlFor="trackTitle" className="form-label">Track title</label>
                    <input value={model.name}
                           onChange={e => setModel({...model, name: e.target.value})}
                           type="text"
                           className="form-control" id="trackTitle"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="trackTitle" className="form-label">Url</label>
                    <input value={model.url}
                           onChange={e => setModel({...model, url: e.target.value})}
                           type="text"
                           className="form-control" id="trackTitle"/>
                </div>
                {isLoading ?
                    <button className="btn btn-primary" disabled={true}>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                    </button>
                    :
                    <button type="submit" className="btn btn-primary">Submit</button>
                }
            </form>
        </div>
    );
};

export default Import;