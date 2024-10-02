import React, { useState } from 'react';
import axios from 'axios';

const apiKey = '8801172b6ab089326bcf3ed5b39601d7';

async function uploadImgBB(file, fileName) {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await axios.post(`https://api.imgbb.com/1/upload?name=${fileName}&key=${apiKey}`, formData);

        return response.data.data.url;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function fetchImage(fileName) {
    try {
        // Giả sử bạn muốn lấy hình ảnh dựa trên URL, hoặc bạn có thể thêm phần xử lý tùy ý ở đây
        const response = await axios.get(`https://api.imgbb.com/1/upload?name=${fileName}&key=${apiKey}`);
        return response.data.data.url;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default function Test() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState(''); // Lưu trữ tên file do người dùng nhập
    const [fetchedImageUrl, setFetchedImageUrl] = useState(null); // Lưu trữ URL của hình ảnh được gọi

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (selectedFile && fileName) {
            setLoading(true);
            const url = await uploadImgBB(selectedFile, fileName);
            console.log(url);

            setLoading(false);

            if (url) {
                setImageUrl(url);
            } else {
                alert('Upload failed. Please try again.');
            }
        } else {
            alert('Please select a file and enter a file name.');
        }
    };

    const handleFetchImage = async () => {
        if (fileName) {
            setLoading(true);
            const url = await fetchImage(fileName);
            setLoading(false);

            if (url) {
                setFetchedImageUrl(url);
            } else {
                alert('No image found with this file name.');
            }
        } else {
            alert('Please enter a file name.');
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Upload or Fetch Image from ImgBB</h1>

            {/* Upload section */}
            <input
                type="text"
                placeholder="Enter file name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
            />
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload'}
            </button>

            {imageUrl && (
                <div>
                    <h2>Uploaded Image:</h2>
                    <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
                </div>
            )}

            {/* Fetch section */}
            <h2>Fetch Image by File Name</h2>
            <input
                type="text"
                placeholder="Enter file name to fetch"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
            />
            <button onClick={handleFetchImage} disabled={loading}>
                {loading ? 'Fetching...' : 'Fetch Image'}
            </button>

            {fetchedImageUrl && (
                <div>
                    <h2>Fetched Image:</h2>
                    <img src={fetchedImageUrl} alt="Fetched" style={{ maxWidth: '100%' }} />
                </div>
            )}
        </div>
    );
}
