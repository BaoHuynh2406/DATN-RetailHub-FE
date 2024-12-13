import React, { useMemo, useEffect } from 'react';
import { Box, Button, Container, Typography, IconButton } from '@mui/material';
import { AddCircle as AddCircleIcon, Edit as EditIcon } from '@mui/icons-material';
import TablePagination from '@/components/TableCustom/TablePagination';
import { useNavigate } from 'react-router-dom';

import { fetchAllReciving } from '@/redux/Receiving/ReceivingSlice';

export default function ImportProductsList() {
    const navigate = useNavigate();

    // Cấu hình các cột cho bảng
    const columns = useMemo(
        () => [
            { field: 'receivingId', headerName: 'Mã Phiếu Nhập', width: 150 },
            {
                field: 'receivingDate',
                headerName: 'Ngày Nhập',
                width: 200,
                renderCell: (params) => {
                    const date = new Date(params.row.importDate);
                    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                },
            },
            { field: 'supplier', headerName: 'Nhà Cung Cấp', width: 200 },
            { field: 'user', headerName: 'Nhân Viên Nhập', width: 200 },
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
                    onClick={() => navigate('/product/ImportProducts/ImportDetail/create')}
                >
                    Tạo phiếu nhập mới
                </Button>
            </Box>
            <Box sx={{ height: 500, overflow: 'auto' }}>
                {/* Hiển thị bảng */}
                <TablePagination
                    columns={columns} // Cấu hình cột
                    stt={true} // Hiển thị số thứ tự hàng
                    id="receivingId" // Định danh hàng
                    dispatchHandle={fetchAllReciving} // API để lấy danh sách lịch sử
                    sliceName="receiving" // Tên slice trong Redux
                />
            </Box>
        </Container>
    );
}
