// src/hooks/useAuth.js
import { useSelector } from 'react-redux';

export const useAuth = () => {
    const { data } = useSelector((state) => state.userCurrent);

    const isAuthenticated = () => {
        if (!localStorage.getItem('token')) {
            alert('Vui lòng đăng nhập trước');
            return false;
        }

        if (data) {
            if (data.role.roleId !== 'ADMIN' && data.role.roleId !== 'SC') {
                alert('Bạn không có quyền truy cập!');
                return false;
            }
        }
        return true;
    };

    return { isAuthenticated };
};
