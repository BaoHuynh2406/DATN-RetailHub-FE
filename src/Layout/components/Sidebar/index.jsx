import { useState } from 'react';
// import './style.module.scss';

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div
            className={`relative h-full bg-gray-800 text-white 
                ${isCollapsed ? 'w-20' : 'w-52'} 
                transition-width duration-300`}
        >
            <button
                className="absolute top-4 right-4 bg-gray-600 p-2 rounded"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                {isCollapsed ? '→' : '←'}
            </button>
            <nav className="mt-16">
                <ul className="space-y-4">
                    <li className="px-4 py-2 hover:bg-gray-600">
                        <a href="#home" className={`block ${isCollapsed ? 'text-center' : ''}`}>
                            Trang chủ
                        </a>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-600">
                        <a href="/login" className={`block ${isCollapsed ? 'text-center' : ''}`}>
                            Thống kê
                        </a>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-600">
                        <a href="#management" className={`block ${isCollapsed ? 'text-center' : ''}`}>
                            Quản lý
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
