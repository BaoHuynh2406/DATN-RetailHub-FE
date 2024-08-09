import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

function DefaultLayout({ children }) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="w-full">
                <Header />
                <div className="overflow-auto">
                    <div className="content">{children}</div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
