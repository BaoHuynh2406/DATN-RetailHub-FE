// src/hooks/useAuth.js

export const useAuth = () => {
    const isAuthenticated = () => {
        return true; // Giả lập luôn trả về true
    };

    return { isAuthenticated };
};