import React from 'react';

const Loader = () => {
    return (
        <div className="d-flex justify-content-center align-items-center text-center">
            <div className="spinner-border text-center align-items-center justify-content-center" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Loader;