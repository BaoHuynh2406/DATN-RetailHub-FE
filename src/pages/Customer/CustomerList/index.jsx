import React, { useState, useEffect, useMemo } from 'react';
import { Box, Button, Container, Typography, IconButton, Switch, CircularProgress, Alert, Pagination } from '@mui/material';
import { AddCircle as AddCircleIcon, Edit as EditIcon, Explicit as ExplicitIcon } from '@mui/icons-material';
import TableCustom from '@/components/TableCustom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCustomersPaginationAsync,
    updateCustomerAsync,
    removeCustomerAsync,
    fetchDeletedCustomersPaginationAsync,
    
} from '@/redux/Customer/customerSlice';

export default function CustomerTable() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, data, error, deletedCustomers, totalCustomers } = useSelector((state) => state.customer);

    const [showDeleted, setShowDeleted] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        if (showDeleted) {
            console.log('Fetching deleted customers...');
            dispatch(fetchDeletedCustomersPaginationAsync({ page, size: pageSize }));
        } else {
            console.log('Fetching active customers...');
            dispatch(fetchCustomersPaginationAsync({ page, size: pageSize }));
        }
    }, [dispatch, page, pageSize, showDeleted]);
    
    const customers = useMemo(() => {
        if (Array.isArray(data)) {
            return data.filter((row) => (showDeleted ? row.isDelete === true : row.isDelete === false));
        }
        console.error('Invalid customer data', data);
        return [];
    }, [showDeleted, data]);    

    const columns = useMemo(
        () => [
            { field: 'customerId', headerName: 'Mã khách hàng', width: 150 },
            { field: 'fullName', headerName: 'Họ và tên', width: 210 },
            { field: 'phoneNumber', headerName: 'Số điện thoại', width: 170 },
            { field: 'points', headerName: 'Điểm', width: 150 },
            {
                field: 'isActive',
                headerName: 'Trạng thái',
                width: 120,
                renderCell: (params) => (
                    <Switch checked={params.value} onChange={() => handleToggleActive(params.row)} color="secondary" />
                ),
            },
            {
                field: 'actions',
                headerName: 'Công cụ',
                width: 150,
                renderCell: (params) => (
                    <Box display="flex" justifyContent="left" alignItems="center" height="100%">
                        <IconButton color="primary" onClick={() => handleEdit(params.row)}>
                            <EditIcon />
                        </IconButton>
                    </Box>
                ),
            },
        ],
        [showDeleted],
    );

    const handleEdit = (row) => {
        navigate(`/customer/CustomerDetail/${row.customerId}`);
    };

    const handleAdd = () => {
        navigate('/customer/CustomerDetail/create');
    };

    const handleToggleActive = (row) => {
        const updatedCustomer = { ...row, isActive: !row.isActive };
        dispatch(updateCustomerAsync(updatedCustomer));
    };

    const handleDelete = (customerId) => {
        dispatch(removeCustomerAsync(customerId));
    };

    const handleShowDeletedToggle = (event) => {
        setShowDeleted(event.target.checked);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const totalPages = Math.ceil(totalCustomers / pageSize);

    return (
        <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={3}>
                <Typography variant="h4" component="h2" fontWeight="bold" color={showDeleted ? '#ab003c' : 'inherit'}>
                    {showDeleted ? 'DANH SÁCH KHÁCH HÀNG ĐÃ XÓA' : 'DANH SÁCH KHÁCH HÀNG'}
                </Typography>
                <Button variant="contained" color="success" startIcon={<AddCircleIcon />} onClick={handleAdd}>
                    Thêm mới
                </Button>
            </Box>
            <Box sx={{ height: 500, overflow: 'auto' }}>
                <TableCustom
                    columns={columns}
                    rows={showDeleted ? deletedCustomers : customers}
                    stt={true}
                    id="customerId"
                    loading={loading}
                />
                {loading && <CircularProgress />}
                {error && <Alert severity="error">{error}</Alert>}
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
                <Box display="flex" alignItems="center">
                    <Typography variant="body1" marginRight={1} color="red">
                        Hiển thị khách hàng đã bị xóa
                    </Typography>
                    <Switch checked={showDeleted} onChange={handleShowDeletedToggle} color="secondary" />
                </Box>
                <Button variant="contained" startIcon={<ExplicitIcon />} onClick={() => handleDelete(customerId)}>
                    Excel
                </Button>
            </Box>
            <Box display="flex" justifyContent="center" marginTop={2}>
                <Pagination
                    count={totalPages} 
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Container>
    );
}
