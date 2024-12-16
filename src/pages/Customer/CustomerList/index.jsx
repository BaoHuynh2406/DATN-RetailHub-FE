import React, { useState, useEffect, useMemo } from 'react';
import { Box, Button, Container, Typography, IconButton, Switch } from '@mui/material';
import { AddCircle as AddCircleIcon, Edit as EditIcon, Explicit as ExplicitIcon } from '@mui/icons-material';
import TablePagination from '@/components/TableCustom/TablePagination';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { fetchAllDeletedCustomersAsync, fetchCustomersAsync } from '@/redux/Customer/customerSlice';
import handleExport from '@/hooks/useExportExcel';

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

    // Lấy dữ liệu từ Redux
    const response = useSelector((state) => state.customer.data?.data || []); 

    const handleExportExcel = async () => {
        
        const columns = [
            { header: 'STT', key: 'STT', width: 10 },
            { header: 'Mã khách hàng', key: 'customerId', width: 15 },
            { header: 'Họ và tên', key: 'fullName', width: 25 },
            { header: 'Số điện thoại', key: 'phoneNumber', width: 20 },
            { header: 'Điểm', key: 'points', width: 10 },
            { header: 'Trạng thái', key: 'isActive', width: 15 },
        ];
        
        if(!response) return;
        
        // formart data
        const formattedData = response.map((item, index) => ({
            customerId: item.customerId,
            fullName: item.fullName, 
            phoneNumber: item.phoneNumber, 
            points: item.points !== undefined ? item.points : 0, 
            isActive: item.isActive ? 'Hoạt động' : 'Không hoạt động',
        }));

        handleExport(columns, formattedData, "DanhSachKhachHang");
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
                <Button variant="contained" startIcon={<ExplicitIcon />} onClick={handleExportExcel}>
                    Excel
                </Button>
            </Box>
        </Container>
    );
}
