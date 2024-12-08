import React, { useMemo } from 'react';
import { Box, Button, Container, Typography, IconButton } from '@mui/material';
import { AddCircle as AddCircleIcon, Edit as EditIcon } from '@mui/icons-material';
import TablePagination from '@/components/TableCustom/TablePagination';
import { useNavigate } from 'react-router-dom';

export default function ImportProducts() {
    const navigate = useNavigate();

    const handleAdd = () => {
        navigate('/Product/ProductImports'); 
    };


    // Cấu hình các cột cho bảng
    const columns = useMemo(
        () => [
            { field: 'productId', headerName: 'Mã Sản Phẩm', width: 150 },
            { field: 'productName', headerName: 'Tên Sản Phẩm', width: 200 },
            { field: 'importDate', headerName: 'Ngày Nhập', width: 200, 
                renderCell: (params) => {
                    const date = new Date(params.row.importDate);
                    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                }
            },
            { field: 'quantity', headerName: 'Số Lượng', width: 150 },
            { field: 'price', headerName: 'Giá', width: 150 },
            { 
                field: 'actions', 
                headerName: 'Công Cụ', 
                width: 150,
                renderCell: (params) => (
                    <div className="flex space-x-2">
                        <IconButton
                            color="primary"
                            onClick={() => navigate(`/import/edit/${params.row.productId}`)}
                        >
                            <EditIcon />
                        </IconButton>
                        {/* Thêm logic xóa nếu cần */}
                    </div>
                ),
            },
        ],
        [],
    );

    return (
        <Container maxWidth="xl">
            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={3}>
                <Typography variant="h4">Lịch Sử Nhập Hàng</Typography>
                {/* Button để thêm lịch sử nhập hàng */}
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleIcon />}
                    onClick={handleAdd}
                >
                    Thêm Mới
                </Button>
            </Box>
          
        </Container>
    );
}
