import { Outlet } from 'react-router-dom';

function BlankLayout({ children }) {
    return <>{children ? children : <Outlet />}</>;
}

export default BlankLayout;
