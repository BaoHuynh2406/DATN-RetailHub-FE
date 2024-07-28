import React from 'react';

function Login() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h1>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Nhập email của bạn"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Nhập mật khẩu của bạn"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex items-center mb-6">
                        <input type="checkbox" id="remember" name="remember" className="mr-2 leading-tight" />
                        <label htmlFor="remember" className="text-gray-700 text-sm">
                            Lưu mật khẩu
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Đăng nhập
                    </button>
                    <div className="flex items-center justify-center my-4">
                        <span className="text-gray-500 text-sm">hoặc</span>
                    </div>
                    <button
                        type="button"
                        className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Đăng nhập bằng Google
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
