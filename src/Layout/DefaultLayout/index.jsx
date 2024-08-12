import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { FaHome, FaChartLine, FaUser } from 'react-icons/fa'; 

function DefaultLayout({ children }) {
    return (
        <div className="flex h-screen">
            <Sidebar/>
            <div style={{width: '100%'}}>
                <Header />
                <div className="flex-1 overflow-auto p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
