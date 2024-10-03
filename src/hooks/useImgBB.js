import { useState } from 'react';
import axios from 'axios';

const apiKey = '8801172b6ab089326bcf3ed5b39601d7';

async function uploadImgBB(file, fileName) {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await axios.post(`https://api.imgbb.com/1/upload?name=${fileName}&key=${apiKey}`, formData);
        return response.data.data.url;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function fetchImage(fileName) {
    try {
        const response = await axios.get(`https://api.imgbb.com/1/upload?name=${fileName}&key=${apiKey}`);
        return response.data.data.url;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function useImgBB() {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [fetchedImageUrl, setFetchedImageUrl] = useState(null);

    const handleUpload = async (file, fileName = '') => {
        if (file) { 
            setLoading(true);
            const url = await uploadImgBB(file, fileName);
            setLoading(false);
            setImageUrl(url);
            return url;
        } else {
            alert('Please select a file.');
        }
    };
    

    const handleFetchImage = async (fileName) => {
        if (fileName) {
            setLoading(true);
            const url = await fetchImage(fileName);
            setLoading(false);
            setFetchedImageUrl(url);
            return url;
        } else {
            alert('Please enter a file name.');
        }
    };

    return {
        loading,
        imageUrl,
        fetchedImageUrl,
        handleUpload,
        handleFetchImage,
    };
}
