import React, { useState, useEffect, useMemo } from 'react';
import { Box, Button, Container, Typography, IconButton, Switch, CircularProgress, Alert } from '@mui/material';
import { AddCircle as AddCircleIcon, Edit as EditIcon, Explicit as ExplicitIcon } from '@mui/icons-material';
import TableCustom from '@/components/TableCustom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAsync, fetchDeletedProductsAsync, updateProductAsync, removeProductAsync } from '@/redux/Product/ProductSlice';

export default function ProductTable() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, data, error, deletedProducts } = useSelector((state) => state.ProductSlice);
    const [showDeleted, setShowDeleted] = useState(false);
    // console.log(data)
    useEffect(() => {
        dispatch(fetchProductsAsync());
    }, [dispatch]);

    useEffect(() => {
        if (showDeleted) {
            dispatch(fetchDeletedProductsAsync());
        }
    }, [dispatch, showDeleted]);

    const products = useMemo(() => {
        if (Array.isArray(data)) {
            return data.filter((row) => showDeleted ? row.isDelete === true : row.isDelete === false);
        }
        console.error('Dữ liệu sản phẩm không hợp lệ');
        return [];
    }, [showDeleted, data]);

    const columns = useMemo(() => [
        { field: 'productId', headerName: 'Mã Sản phẩm', width: 150 },
        {
            field: 'image',
            headerName: 'Hình',
            width: 150,
            renderCell: (params) => (
                <img src={params.value} alt={params.row.img} style={{ width: '100%', height: 'auto' }} />
            ),
        },
        {
            field: 'category',
            headerName: 'Loại',
            width: 120,
            renderCell: (params) => {
                console.log(params.row);  // Log the entire row to verify the structure
                return params.row.category?.category_name || 'Không có loại';
            }
        },
        {
            field: 'tax',
            headerName: 'Thuế',
            width: 120,
            renderCell: (params) => params.row.tax?.tax_name || 'Không có thuế'
        },
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
    ], [showDeleted]);



    const handleEdit = (row) => {
        navigate(`/product/ProductDetail/${row.productId}`);
    };

    const handleAdd = () => {
        navigate('/product/ProductDetail/create');
    };

    const handleToggleActive = (row) => {
        const updatedProduct = { ...row, isActive: !row.isActive };
        dispatch(updateProductAsync(updatedProduct));
    };

    const handleDelete = (productId) => {
        dispatch(removeProductAsync(productId));
    };

    const handleShowDeletedToggle = (event) => {
        setShowDeleted(event.target.checked);
    };

    if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;

    if (error) return <Alert severity="error">Lỗi khi tải dữ liệu: {error}</Alert>;

    return (
        <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={3}>
                <Typography variant="h4" component="h2" fontWeight="bold" color={showDeleted ? "#ab003c" : "inherit"}>
                    {showDeleted ? 'DANH SÁCH SẢN PHẨM ĐÃ XÓA' : 'DANH SÁCH SẢN PHẨM'}
                </Typography>
                <Button variant="contained" color="success" startIcon={<AddCircleIcon />} onClick={handleAdd}>
                    Thêm mới
                </Button>
            </Box>
            <Box sx={{ height: 500, overflow: 'auto' }}>
                <TableCustom columns={columns} rows={showDeleted ? deletedProducts : products} stt={true} id="productId" />
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
                <Box display="flex" alignItems="center">
                    <Typography variant="body1" marginRight={1} color="red">
                        Hiển thị sản phẩm đã bị xóa
                    </Typography>
                    <Switch checked={showDeleted} onChange={handleShowDeletedToggle} color="secondary" />
                </Box>
                <Button variant="contained" startIcon={<ExplicitIcon />} sx={{ fontSize: 10 }}>
                    Xuất Excel
                </Button>
            </Box>
        </Container>
    );
}
