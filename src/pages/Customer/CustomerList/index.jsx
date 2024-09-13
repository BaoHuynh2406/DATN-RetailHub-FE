import React, { useState, useEffect, useMemo } from 'react';
import { Box, Button, Container, Typography, IconButton, Switch } from '@mui/material';
import { AddCircle as AddCircleIcon, Edit as EditIcon } from '@mui/icons-material';
import TableCustom from '@/components/TableCustom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ExplicitIcon from '@mui/icons-material/Explicit';
// import { addaddCustomer, removeCustomer, restoreCustomer, updateCustomer } from '@/redux/Customer/CustomerAction';

export default function CustomerTable() {
    const navigate = useNavigate();
    const allCustomers = useSelector((state) => state.customer); // Change to access customers
    const [customer, setCustomers] = useState(allCustomers);
    const [showDeleted, setShowDeleted] = useState(false);


    // Define columns for the customer table using useMemo to optimize performance
    const columns = useMemo(() => [
        { field: 'customerId', headerName: 'Mã khách hàng', width: 150 },
        { field: 'fullName', headerName: 'Họ và tên', width: 210 },
        { field: 'phoneNumber', headerName: 'Số điện thoại', width: 170 },
        { field: 'points', headerName: 'Điểm', width: 150 },
        {
            field: 'isActive', headerName: 'Trạng thái', width: 120, renderCell: (params) => (
                <span>{params.value ? 'Active' : 'Inactive'}</span>
            )
        },
        {
            field: 'actions',
            headerName: 'Công cụ',
            width: 130,
            renderCell: (params) => (
                <Box display="flex" justifyContent="left" alignItems="center">
                    <IconButton
                        color="primary"
                        onClick={() => handleEdit(params.row)}
                        style={{ textAlign: 'center' }}
                    >
                        <EditIcon />
                    </IconButton>
                </Box>
            ),
        },
    ], []);

    // Filter customers based on the showDeleted switch state
    useEffect(() => {
        if (Array.isArray(allCustomers)) {
            if (showDeleted) {
                setCustomers(allCustomers.filter((row) => row.isDelete));
            } else {
                setCustomers(allCustomers.filter((row) => !row.isDelete));
            }
        } else {
            console.error('Dữ liệu khách hàng không hợp lệ');
        }
    }, [showDeleted, allCustomers]);

    const handleEdit = (row) => {
        navigate(`/customer/CustomerDetail/${row.customerId}`);
    };

    const handleAdd = () => {
        navigate('/customer/CustomerDetail/create');
    };

    const handleShowDeletedToggle = (event) => {
        setShowDeleted(event.target.checked);
    };
    console.log(allCustomers);

    return (
        
        <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={3}>
                <Typography variant="h4" component="h2" fontWeight="bold" color={showDeleted ? "#ab003c" : "inherit"}>
                    {showDeleted ? 'DANH SÁCH KHÁCH HÀNG ĐÃ XÓA' : 'DANH SÁCH KHÁCH HÀNG'}
                </Typography>
                <Button variant="contained" color="success" startIcon={<AddCircleIcon />} onClick={handleAdd}>
                    Thêm mới
                </Button>
            </Box>
            <Box sx={{ height: 500, overflow: 'auto' }}>
                <TableCustom columns={columns} rows={customer} stt={true} id="customerId" />
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
                <Box display="flex" alignItems="center">
                    <Typography variant="body1" marginRight={1} color="red">
                        Hiển thị khách hàng đã bị xóa
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
