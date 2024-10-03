import React, { useEffect, useState } from 'react';
import { useImgBB } from '@/hooks/useImgBB';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
export default function Test() {
    const { loading, imageUrl, fetchedImageUrl, handleUpload, handleFetchImage } = useImgBB();
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    useEffect(() => {
        console.log(imageUrl);
    }, [imageUrl]);

    const notyf = new Notyf({
        position: {
            x: 'right',
            y: 'top',
        },
        dismissible: true,
    });

    const handleToast = () => {
        notyf.success('Please fill out the form');
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Upload or Fetch Image from ImgBB</h1>

            {/* Upload section */}

            <input type="file" onChange={handleFileChange} />
            <button onClick={() => handleUpload(selectedFile)} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload'}
            </button>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                Here is a gentle confirmation that your action was successful.
            </Alert>

            {imageUrl && (
                <div>
                    <h2>Uploaded Image:</h2>
                    <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
                </div>
            )}

            <button onClick={handleToast}>Bấm</button>
        </div>
    );
}
