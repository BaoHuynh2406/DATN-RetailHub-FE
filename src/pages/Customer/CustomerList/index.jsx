import React, { useState, useEffect, useMemo } from 'react';
import { Box, Button, Container, Typography, IconButton, Switch } from '@mui/material';
import { AddCircle as AddCircleIcon, Edit as EditIcon } from '@mui/icons-material';
import TableCustom from '@/components/TableCustom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ExplicitIcon from '@mui/icons-material/Explicit';

export default function EmployeeTable() {
    const navigate = useNavigate();
    const allEmployees = useSelector((state) => state.employee); // Bảo vệ để allEmployees không phải undefined

    const [employees, setEmployees] = useState(allEmployees);
    const [showDeleted, setShowDeleted] = useState(false);

    // Định nghĩa các cột bằng useMemo để cải thiện hiệu suất
    const columns = useMemo(() => [
        { field: 'userId', headerName: 'Mã nhân viên', width: 150 },
        { field: 'fullName', headerName: 'Họ và tên', width: 210 },
        { field: 'phoneNumber', headerName: 'Số điện thoại', width: 170 },
        { field: 'roleId', headerName: 'Chức vụ', width: 150 },
        { field: 'startDate', headerName: 'Ngày vào làm', width: 180 },
        {
            field: 'image',
            headerName: 'Ảnh',
            width: 150,
            renderCell: (params) => (
                <img
                    src={params.value}
                    alt={params.row.fullName}
                    style={{ width: '50%', height: 'auto', borderRadius: '50%' }}
                />
            ),
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

    // Lọc nhân viên dựa trên trạng thái của switch (showDeleted)
    useEffect(() => {
        if (Array.isArray(allEmployees)) {
            if (showDeleted) {
                setEmployees(allEmployees.filter((row) => row.status === false));
            } else {
                setEmployees(allEmployees.filter((row) => row.status !== false));
            }
        } else {
            console.error('Dữ liệu nhân viên không hợp lệ');
        }
    }, [showDeleted, allEmployees]);

    const handleEdit = (row) => {
        navigate(`/employee/EmployeeDetail/${row.userId}`);
    };

    const handleAdd = () => {
        navigate('/employee/EmployeeDetail/create');
    };

    const handleShowDeletedToggle = (event) => {
        setShowDeleted(event.target.checked);
    };

    return (
        <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={3}>
                <Typography variant="h4" component="h2" fontWeight="bold" color={showDeleted ? "#ab003c" : "inherit"}>
                    {showDeleted ? 'DANH SÁCH NHÂN VIÊN ĐÃ XÓA' : 'DANH SÁCH NHÂN VIÊN'}
                </Typography>
                <Button variant="contained" color="success" startIcon={<AddCircleIcon />} onClick={handleAdd}>
                    Thêm mới
                </Button>
            </Box>
            <Box sx={{ height: 500, overflow: 'auto' }}>
                <TableCustom columns={columns} rows={employees} stt={true} id="userId" />
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
                <Box display="flex" alignItems="center">
                    <Typography variant="body1" marginRight={1} color="red">
                        Hiển thị nhân viên đã bị xóa
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
