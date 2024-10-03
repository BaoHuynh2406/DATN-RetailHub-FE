import React, { useState, useEffect, useMemo } from 'react';
import { Box, Button, Container, Typography, IconButton, Switch, CircularProgress, Alert } from '@mui/material';
import { AddCircle as AddCircleIcon, Edit as EditIcon, Explicit as ExplicitIcon } from '@mui/icons-material';
import TablePagination from '@/components/TableCustom/TablePagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchProductsAvailableAsync,
    fetchProductsDeletedAsync,
    updateProductAsync,
    removeProductAsync,
} from '@/redux/Product/ProductSlice';

export default function ProductTable() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showDeleted, setShowDeleted] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const columns = useMemo(
        () => [
            { field: 'productId', headerName: 'Mã Sản phẩm', width: 150 },
            {
                field: 'image',
                headerName: 'Hình',
                width: 150,
                renderCell: (params) =>
                    params.value ? (
                        <img
                            src={params.value}
                            alt={params.row.productName}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    ) : (
                        <img
                            src="https://via.placeholder.com/120x60?text=Image+Not+Found"
                            alt={params.row.productName}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    ),
            },
            {
                field: 'productName',
                headerName: 'Tên sản phẩm',
                width: 120,
            },
            {
                field: 'category',
                headerName: 'Loại',
                width: 120,
                renderCell: (params) => {
                    return params.row.category?.categoryName || 'Không có loại';
                },
            },
            { field: 'unit', headerName: 'Đơn vị tính', width: 100 },
            { field: 'inventoryCount', headerName: 'Tồn kho', width: 120 },
            { field: 'cost', headerName: 'Giá gốc', width: 120 },
            { field: 'price', headerName: 'Giá bán', width: 120 },
            { field: 'expiryDate', headerName: 'Ngày hết hạn', width: 150 },
            {
                field: 'isActive',
                headerName: 'Trạng thái',
                width: 120,
                renderCell: (params) => (
                    <Switch
                        checked={params.row.isActive}
                        onChange={() => handleToggleActive(params.row)}
                        color="secondary"
                    />
                ),
            },
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

    const handleEdit = (row) => {
        navigate(`/product/ProductDetail/${row.productId}`);
    };

    const handleAdd = () => {
        navigate('/product/ProductDetail/create');
    };

    const handleToggleActive = (row) => {
        const updatedProduct = {
            ...row,
            taxId: row.tax.taxId,
            categoryId: row.category.categoryId,
            isActive: !row.isActive,
        };

        console.log(updatedProduct);

        dispatch(updateProductAsync(updatedProduct));
    };

    const handleDelete = (productId) => {
        dispatch(removeProductAsync(productId));
    };

    const handleShowDeletedToggle = (event) => {
        setShowDeleted(event.target.checked);
        const newParams = new URLSearchParams(searchParams);
        newParams.set('showDeleted', event.target.checked);
        setSearchParams(newParams);
    };

    useEffect(() => {
        const check = searchParams.get('showDeleted') === 'true';
        setShowDeleted(check);
    }, []);

    return (
        <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={3}>
                <Typography variant="h4" component="h2" fontWeight="bold" color={showDeleted ? '#ab003c' : 'inherit'}>
                    {showDeleted ? 'DANH SÁCH SẢN PHẨM ĐÃ XÓA' : 'DANH SÁCH SẢN PHẨM'}
                </Typography>
                <Button variant="contained" color="success" startIcon={<AddCircleIcon />} onClick={handleAdd}>
                    Thêm mới
                </Button>
            </Box>
            <Box sx={{ height: 500, overflow: 'auto' }}>
                <TablePagination
                    columns={columns}
                    sliceName="ProductSlice"
                    dispatchHandle={showDeleted ? fetchProductsDeletedAsync : fetchProductsAvailableAsync}
                    stt={true}
                    id="productId"
                />
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
