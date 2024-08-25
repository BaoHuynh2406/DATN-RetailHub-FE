import { useState, useMemo, useEffect } from 'react';
import { Box, Button, Container, Typography, IconButton, Switch } from '@mui/material';
import { AddCircle as AddCircleIcon, Edit as EditIcon } from '@mui/icons-material';
import TableCustom from '@/components/TableCustom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ExplicitIcon from '@mui/icons-material/Explicit';

export default function DataTable() {
    const navigate = useNavigate();
    const allProducts = useSelector((state) => state.products);

    // Sử dụng useState để lưu trữ danh sách sản phẩm và trạng thái của Switch
    const [products, setProducts] = useState(allProducts);
    const [showDeleted, setShowDeleted] = useState(false);

    // Sử dụng useMemo để chỉ tạo lại cột khi danh sách cột thay đổi
    const columns = useMemo(
        () => [
            { field: 'productId', headerName: 'Mã Sản phẩm', width: 150 },
            {
                field: 'image',
                headerName: 'Hình',
                width: 150,
                renderCell: (params) => (
                    <img src={params.value} alt={params.row.productName} style={{ width: '100%', height: 'auto' }} />
                ),
            },
            { field: 'productName', headerName: 'Tên sản phẩm', width: 150 },
            { field: 'category', headerName: 'Loại', width: 120 },
            { field: 'unit', headerName: 'Đơn vị tính', width: 100 },
            { field: 'inventoryCount', headerName: 'Tồn kho', width: 120 },
            { field: 'cost', headerName: 'Giá gốc', width: 120 },
            { field: 'price', headerName: 'Giá bán', width: 120 },
            { field: 'expiryDate', headerName: 'Ngày hết hạn', width: 150 },
            {
                field: 'actions',
                headerName: 'Công cụ',
                width: 150,
                align: 'center',
                renderCell: (params) => (
                    <Box display="flex" justifyContent="left" alignItems="center">
                        <IconButton color="primary" onClick={() => handleEdit(params.row)}>
                            <EditIcon />
                        </IconButton>
                    </Box>
                ),
            },
        ],
        [],
    );

    // Sử dụng useEffect để cập nhật danh sách sản phẩm khi showDeleted thay đổi
    useEffect(() => {
        if (allProducts) {
            if (showDeleted) {
                setProducts(allProducts.filter((row) => row.status === false));
            } else {
                setProducts(allProducts.filter((row) => row.status !== false));
            }
        }else{
            alert("Có lỗi trong quá trình tải sản phẩm!");
        }
    }, [showDeleted, allProducts]);

    // Hàm xử lý khi nhấn vào nút chỉnh sửa
    const handleEdit = (row) => {
        navigate(`/product/detail/${row.productId}`);
    };

    // Hàm xử lý khi nhấn vào nút thêm mới
    const handleAdd = () => {
        navigate('/product/detail/create');
    };

    // Hàm xử lý khi bật/tắt Switch để hiển thị sản phẩm đã bị xóa
    const handleShowDeletedToggle = (event) => {
        setShowDeleted(event.target.checked);
    };

    return (
        <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={3}>
                {/* Thay đổi tiêu đề dựa trên trạng thái của Switch */}
                <Typography variant="h4" component="h2" fontWeight="bold" color={showDeleted ? '#ab003c' : 'inherit'}>
                    {showDeleted ? 'DANH SÁCH SẢN PHẨM ĐÃ XÓA' : 'DANH SÁCH SẢN PHẨM'}
                </Typography>
                <Button variant="contained" color="success" startIcon={<AddCircleIcon />} onClick={handleAdd}>
                    Thêm mới
                </Button>
            </Box>
            <Box sx={{ height: 500, overflow: 'auto' }}>
                <TableCustom columns={columns} rows={products} stt={true} id="productId" />
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
                <Box display="flex" alignItems="center">
                    <Typography variant="body1" marginRight={1} color="red">
                        Hiển thị sản phẩm đã bị xóa
                    </Typography>
                    <Switch checked={showDeleted} onChange={handleShowDeletedToggle} color="secondary" />
                </Box>
                <Button variant="contained" startIcon={<ExplicitIcon />} onClick={handleAdd} sx={{ fontSize: 10 }}>
                    Xuất Excel
                </Button>
            </Box>
        </Container>
    );
}
