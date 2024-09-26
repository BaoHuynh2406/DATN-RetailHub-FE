// src/hooks/useAuth.js

export const useAuth = () => {
    const isAuthenticated = () => {
        if (localStorage.getItem('token')) return true;
        alert('Vui lòng đăng nhập trước');
        return false;
    };

    return { isAuthenticated };
};
