import './style.module.scss';

function Header() {
    return (
        <header className="bg-slate-500 w-full p-4 flex justify-between items-center">
            <h1 className="text-white text-xl font-bold">Trang chủ</h1>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Đăng xuất</button>
        </header>
    );
}

export default Header;
