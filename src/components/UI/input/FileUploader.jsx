import React, {useRef} from 'react';

const FileUploader = ({onFileSelectedSuccess, onFileSelectedError, maxSize, accept}) => {
    const fileInput = useRef(null);

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (e.target.files.length === 0)
            return;
        if (file.size > maxSize) {
            e.target.value = null;
            onFileSelectedError({error: `File size cannot exceed more than ${maxSize}KB`});
            return;
        }
        onFileSelectedSuccess(file);
    }

    return (
        <div>
            <input
                ref={fileInput}
                onChange={handleFileInput}
                type="file"
                className="form-control"
                accept={accept}
                id="trackUpload"/>
        </div>
    );
};

export default FileUploader;