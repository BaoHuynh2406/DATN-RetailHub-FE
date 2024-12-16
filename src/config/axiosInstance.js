import axios from 'axios';

const getBaseURL = () => {
    let ip = localStorage.getItem('ip') || import.meta.env.VITE_API_URL;

    // Kiểm tra và thêm "http://" nếu thiếu
    if (ip && !ip.startsWith('http://') && !ip.startsWith('https://')) {
        ip = `http://${ip}`;
    }

    // Đảm bảo kết thúc bằng dấu "/"
    if (ip && !ip.endsWith('/')) {
        ip = `${ip}/`;
    }

    return ip;
};

const baseURL = getBaseURL();

import 'notyf/notyf.min.css';
import { Notyf } from 'notyf';

const notyf = new Notyf({
    position: {
        x: 'right',
        y: 'top',
    },
    dismissible: true,
});

export const axiosSecure = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

export const axiosPublic = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

// Request interceptor
axiosSecure.interceptors.request.use(
    (config) => {
        // Thêm token vào header nếu có
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// Response interceptor cho axiosSecure
axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!error.response) {
            // Chuyển đến trang lỗi
            window.location.href = '/error-code-500';
            notyf.error('Lỗi kết nối đến server');

            return Promise.reject('Lỗi mạng');
        }
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const tokenOld = localStorage.getItem('token');

                const response = await axiosPublic.post('/api-public/auth/refresh', { token: tokenOld });

                const { token } = response.data.data;

                // Lưu token mới vào localStorage
                localStorage.setItem('token', token);

                // Cập nhật token trong header của yêu cầu gốc
                axiosSecure.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                // Lặp lại yêu cầu gốc với token mới
                return axiosSecure(originalRequest);
            } catch (err) {
                // Nếu không thể làm mới token, yêu cầu người dùng đăng nhập lại
                localStorage.removeItem('token');
                notyf.error('Hết hạn đăng nhập!');
                // Chuyển hướng người dùng đến trang đăng nhập
                window.location.href = '/login';
                return Promise.reject('Hết hạn đăng nhập');
            }
        }

        // Xử lý mã lỗi 403 (Forbidden)
        if (error.response && error.response.status === 403) {
            const errorMessage = error.response.data.message || 'Bạn không có quyền truy cập';
            console.log(errorMessage);
            // Chuyển hướng đến trang đăng nhập
            window.location.href = '/403';
            return Promise.reject('Không có quyền truy cập');
        }

        return Promise.reject(error);
    },
);

// Response interceptor cho axiosPublic
axiosPublic.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            // Hiển thị hộp thoại xác nhận
            const userConfirmed = confirm('Có lỗi khi kết nối đến server!\nBạn có muốn thử lại không?');

            if (userConfirmed) {
                // Thử lại request
                const originalRequest = error.config; // Lấy lại config của request gốc
                return axiosPublic(originalRequest); // Gọi lại request
            } else {
                // Chuyển đến trang lỗi
                window.location.href = '/error-code-500';
            }

            return Promise.reject('Lỗi mạng');
        }

        console.error('Error:', error.message);
        return Promise.reject(error);
    },
);
