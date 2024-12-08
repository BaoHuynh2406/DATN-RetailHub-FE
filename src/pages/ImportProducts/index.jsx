import React, { useMemo, useEffect } from 'react';
import { Box, Button, Container, Typography, IconButton } from '@mui/material';
import { AddCircle as AddCircleIcon, Edit as EditIcon } from '@mui/icons-material';
import TablePagination from '@/components/TableCustom/TablePagination';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllPointHistoriesAsync,
} from '@/redux/Customer/pointHistorySlice';

export default function PointHistoryTable() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Lấy dữ liệu từ Redux Store
    const pointHistoryState = useSelector((state) => state.pointHistory);  // Kiểm tra lại dữ liệu state
    const { data = [], loading = false } = pointHistoryState || {};  // Cấp giá trị mặc định cho data và loading

    // Kiểm tra xem có dữ liệu không và fetch dữ liệu khi component mount
    useEffect(() => {
        dispatch(fetchAllPointHistoriesAsync()); // Gọi API khi component mount
    }, [dispatch]);

    // Cấu hình các cột cho bảng
    const columns = useMemo(
        () => [
            { field: 'importId', headerName: 'Mã Phiếu Nhập', width: 150 },
            { 
                field: 'importDate', 
                headerName: 'Ngày Nhập', 
                width: 200, 
                renderCell: (params) => {
                    const date = new Date(params.row.importDate);
                    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                }
            },
            { field: 'supplier', headerName: 'Nhà Cung Cấp', width: 200 },
            { field: 'employee', headerName: 'Nhân Viên Nhập', width: 200 },
        ],
        [],
    );

    return (
        <Container maxWidth="xl">
            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={3} marginTop={3}>
                <Typography variant="h4">Lịch Sử Nhập Hàng</Typography>
                {/* Button để thêm lịch sử nhập hàng */}
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleIcon />}
                    onClick={() => navigate('/Product/ProductImports')}
                >
                    Tạo phiếu nhập mới
                </Button>
            </Box>
            <Box sx={{ height: 500, overflow: 'auto' }}>
                {/* Hiển thị bảng */}
                <TablePagination
                    columns={columns} // Cấu hình cột
                    stt={true} // Hiển thị số thứ tự hàng
                    id="historyId" // Định danh hàng
                    dispatchHandle={fetchAllPointHistoriesAsync} // API để lấy danh sách lịch sử
                    sliceName="pointHistory" // Tên slice trong Redux
                    rows={data || []} // Truyền dữ liệu từ Redux vào rows, đảm bảo luôn có giá trị mặc định nếu dữ liệu là undefined
                    loading={loading}  // Thêm trạng thái loading nếu có
                />
            </Box>
        </Container>
    );
}
