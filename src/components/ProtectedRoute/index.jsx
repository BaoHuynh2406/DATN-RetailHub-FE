import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useAuth(); // Lấy trạng thái xác thực từ hook

    if (!isAuthenticated()) {
        // Nếu không xác thực, chuyển hướng đến trang login
        return <Navigate to="/login" replace />;
    }

    // Nếu đã xác thực, render component tương ứng
    return element;
};

export default ProtectedRoute;