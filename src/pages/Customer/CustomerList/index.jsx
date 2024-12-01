import React, { useState, useEffect, useMemo } from 'react';
import { Box, Button, Container, Typography, IconButton, Switch } from '@mui/material';
import { AddCircle as AddCircleIcon, Edit as EditIcon, Explicit as ExplicitIcon } from '@mui/icons-material';
import TablePagination from '@/components/TableCustom/TablePagination';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDeletedCustomersAsync, fetchCustomersAsync } from '@/redux/Customer/customerSlice';

export default function CustomerTable() {
    const navigate = useNavigate(); // Hook để điều hướng chương trình
    const dispatch = useDispatch(); // Hook để dispatch các hành động tới Redux store

    const [showDeleted, setShowDeleted] = useState(false); // State để chuyển đổi giữa hiển thị khách hàng đã xóa hoặc không

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
        navigate(`/customer/CustomerDetail/${row.customerId}`); // Điều hướng tới trang chi tiết khách hàng để chỉnh sửa
    };

    const handleAdd = () => {
        navigate('/customer/CustomerDetail/create'); // Điều hướng tới trang tạo khách hàng mới
    };

    const handleDelete = (customerId) => {
        dispatch(removeCustomerAsync(customerId)); // Dispatch hành động xóa khách hàng
    };

    const handleShowDeletedToggle = (event) => {
        setShowDeleted(event.target.checked); // Chuyển đổi state để hiển thị/ẩn khách hàng đã xóa
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
                    columns={columns} // Truyền cấu hình các cột
                    stt={true} // Bật đánh số thứ tự hàng
                    id="customerId" // Đặt định danh duy nhất cho các hàng
                    dispatchHandle={showDeleted ? fetchAllDeletedCustomersAsync : fetchCustomersAsync} // Lấy dữ liệu khách hàng đã xóa hoặc đang hoạt động dựa trên state
                    sliceName="customer" // Chỉ định tên slice cho Redux store
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
