import React, { useState, useEffect, useMemo } from 'react';
import { Box, Button, Container, Typography, IconButton, Switch } from '@mui/material';
import { AddCircle as AddCircleIcon, Edit as EditIcon, Explicit as ExplicitIcon } from '@mui/icons-material';
import TablePagination from '@/components/TableCustom/TablePagination';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDeletedCustomersAsync, fetchCustomersAsync } from '@/redux/Customer/customerSlice';

export default function CustomerTable() {
    const navigate = useNavigate(); // Hook to navigate programmatically
    const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store
    const { data } = useSelector((state) => state.customer); // Selector to get customer data from the Redux store

    useEffect(() => {
        console.log('Customer data:', data); // Log customer data whenever it changes
    }, [data]);

    const [showDeleted, setShowDeleted] = useState(false); // State to toggle between showing deleted customers or not

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
        navigate(`/customer/CustomerDetail/${row.customerId}`); // Navigate to the customer detail page for editing
    };

    const handleAdd = () => {
        navigate('/customer/CustomerDetail/create'); // Navigate to the customer creation page
    };

    const handleDelete = (customerId) => {
        dispatch(removeCustomerAsync(customerId)); // Dispatch action to delete a customer
    };

    const handleShowDeletedToggle = (event) => {
        setShowDeleted(event.target.checked); // Toggle the state to show/hide deleted customers
    };

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
                <TablePagination
                    columns={columns} // Pass the columns configuration
                    stt={true} // Enable row numbering
                    id="customerId" // Set the unique identifier for rows
                    dispatchHandle={showDeleted ? fetchAllDeletedCustomersAsync : fetchCustomersAsync} // Fetch either deleted or active customers based on the state
                    sliceName="customer" // Specify the slice name for the Redux store
                />
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
        </Container>
    );
}
