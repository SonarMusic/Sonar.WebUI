import React, {useState} from 'react';
import FileUploader from "../../components/UI/input/FileUploader";
import axios from "axios";
import {TracksModuleUrl} from "../../utils/ApiClientsInstances";
import {useNavigate} from "react-router-dom";

const Upload = () => {
    const navigate = useNavigate();
    const [isLoading , setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const [file, setFile] = useState(null);

    const submitForm = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");
        const formData = new FormData();
        formData.append("Name", title);
        formData.append("File", file);

        try {
            await axios.post(`${TracksModuleUrl}/files/track`, formData,{
                headers : {
                    Token : localStorage.getItem('token')
                }
            })
            navigate("/")
        } catch (e) {
            console.log(e);
            setError(e.message);
            setIsLoading(false);
        }
    }

    return (
        <div className="container">
            <p className="h1 text-center">Upload track</p>
            <form className="p-3 border rounded" onSubmit={submitForm}>
                {error &&
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                }
                <div className="mb-3">
                    <label htmlFor="trackTitle" className="form-label">Track title</label>
                    <input value={title}
                           onChange={e => setTitle(e.target.value)}
                           type="text"
                           className="form-control" id="trackTitle"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="trackUpload" className="form-label">File</label>
                    <FileUploader
                        maxSize={1024*20480}
                        accept=".mp3, .wav, .ogg"
                        onFileSelectedSuccess={f => {setError(""); setFile(f);}}
                        onFileSelectedError={e => setError(e.error)}
                    ></FileUploader>
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

export default Upload;