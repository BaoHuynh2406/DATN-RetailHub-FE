import React from 'react';
import './style.css'; // Import the styles

export default function PageNotFound() {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>
                        4<span></span>4
                    </h1>
                </div>
                <h2>Oops! Không tìm thấy trang</h2>
                <p>Xin lỗi, trang của bạn đang truy cập có vẽ đã bị xóa hoặc không tồn tại!</p>
                <a href="/">Quay lại trang chủ</a>
            </div>
        </div>
    );
}
