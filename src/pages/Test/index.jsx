import React, { useEffect, useState } from 'react';
import { useImgBB } from '@/hooks/useImgBB'; 
export default function Test() {
    const { loading, imageUrl, fetchedImageUrl, handleUpload, handleFetchImage } = useImgBB();
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    useEffect(() =>{
        console.log(imageUrl);
        
    }, [imageUrl]);

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Upload or Fetch Image from ImgBB</h1>

            {/* Upload section */}
           
            <input type="file" onChange={handleFileChange} />
            <button onClick={() => handleUpload(selectedFile)} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload'}
            </button>

            {imageUrl && (
                <div>
                    <h2>Uploaded Image:</h2>
                    <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
                </div>
            )}

           
           
        </div>
    );
}
