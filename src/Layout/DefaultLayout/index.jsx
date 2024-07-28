import Header from '@/Layout/components/Header';
import Sidebar from '@/Layout/components/Sidebar';

function DefaultLayout({ children }) {
    return (
        <div>
            <div className="container">
                <Header />
                <Sidebar />
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
