import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

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
            // Kiểm tra lỗi mạng
            alert('Có lỗi khi kết nối đến server!. Vui lòng thử lại sau.');
            window.location.href = '/error-code-500';
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
                alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
                // Chuyển hướng người dùng đến trang đăng nhập
                window.location.href = '/login';
                return Promise.reject('Hết hạn đăng nhập');
            }
        }

        return Promise.reject(error);
    },
);

// Response interceptor cho axiosPublic
axiosPublic.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            // Kiểm tra lỗi mạng
            alert('Có lỗi khi kết nối đến server!. Vui lòng thử lại sau.');
            window.location.href = '/error-code-500';
            return Promise.reject('Lỗi mạng');
        }

        console.error('Error:', error.message);
        return Promise.reject(error);
    },
);
