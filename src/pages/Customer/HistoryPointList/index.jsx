import React, { useMemo, useEffect } from 'react';
import { Box, Button, Container, Typography, IconButton } from '@mui/material';
import { AddCircle as AddCircleIcon, Edit as EditIcon } from '@mui/icons-material';
import TablePagination from '@/components/TableCustom/TablePagination';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllPointHistoriesAsync,
    fetchPointHistoryAsync,
    createPointHistoryAsync,
} from '@/redux/Customer/pointHistorySlice';

export default function PointHistoryTable() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Lấy dữ liệu từ Redux Store
    const pointHistories = useSelector((state) => state.pointHistory.data); // Giả sử dữ liệu lưu trong 'data'

    // Kiểm tra xem có dữ liệu không và fetch dữ liệu khi component mount
    useEffect(() => {
        dispatch(fetchAllPointHistoriesAsync()); // Gọi API khi component mount
    }, [dispatch]);

    // Cấu hình các cột cho bảng
    const columns = useMemo(
        () => [
            {
                field: 'user',
                headerName: 'Nhân viên',
                width: 200,
                renderCell: (params) => {
                    const userId = params.row.userId;
                    const userName = params.row.userName;
                    return (
                        <span>
                            {userName} ({userId})
                        </span>
                    );
                },
            },
            {
                field: 'customer',
                headerName: 'Khách hàng',
                width: 200,
                renderCell: (params) => {
                    const customerId = params.row.customerId;
                    const customerName = params.row.customerName;
                    return (
                        <span>
                            {customerName} ({customerId})
                        </span>
                    );
                },
            },
            {
                field: 'transactionType',
                headerName: 'Loại Giao Dịch',
                width: 200,
                renderCell: (params) => {
                    const points = params.row.points;
                    const isAccumulate = points >= 0;
                    return (
                        <span style={{ color: isAccumulate ? 'green' : 'red' }}>
                            {isAccumulate ? 'Tích điểm' : 'Đổi điểm'}
                        </span>
                    );
                },
            },
            {
                field: 'points',
                headerName: 'Điểm',
                width: 150,
                renderCell: (params) => {
                    const points = params.row.points;
                    const color = points >= 0 ? 'green' : 'red';
                    const prefix = points >= 0 ? '+' : ''; // Thêm dấu "+" nếu điểm >= 0
                    return (
                        <span style={{ color }}>
                            {prefix}
                            {points.toLocaleString() || 0}
                        </span>
                    );
                },
            },

            { field: 'description', headerName: 'Mô Tả', width: 300 },
            {
                field: 'transactionDate',
                headerName: 'Ngày Giao Dịch',
                width: 200,
                renderCell: (params) => {
                    const date = new Date(params.row.transactionDate);
                    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                },
            },
        ],
        [],
    );

    return (
        <Container maxWidth="xl">
            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={3}>
                {/* Button để thêm lịch sử điểm nếu cần */}
            </Box>
            <Box sx={{ height: 500, overflow: 'auto' }}>
                {/* Kiểm tra và truyền dữ liệu vào TablePagination */}
                <TablePagination
                    columns={columns} // Cấu hình cột
                    stt={true} // Hiển thị số thứ tự hàng
                    id="historyId" // Định danh hàng
                    dispatchHandle={fetchAllPointHistoriesAsync} // API để lấy danh sách lịch sử
                    sliceName="pointHistory" // Tên slice trong Redux
                    rows={pointHistories || []} // Truyền dữ liệu từ Redux vào rows, đảm bảo luôn có giá trị mặc định nếu dữ liệu là undefined
                />
            </Box>
        </Container>
    );
}
