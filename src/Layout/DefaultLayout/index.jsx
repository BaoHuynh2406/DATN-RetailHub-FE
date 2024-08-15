import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

function DefaultLayout({ children }) {
    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-grow min-w-0">
                <Header />
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
