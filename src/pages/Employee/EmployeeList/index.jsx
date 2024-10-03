import React, { useState, useEffect, useMemo } from 'react';
import { Box, Button, Container, Typography, IconButton, Switch, Tooltip } from '@mui/material';
import { AddCircle as AddCircleIcon, Edit as EditIcon } from '@mui/icons-material';
import RotateRightRoundedIcon from '@mui/icons-material/RotateRightRounded';
import TablePagination from '@/components/TableCustom/TablePagination';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {
    fetchEmployeesDeletedAsync,
    fetchEmployeesAvailableAsync,
    restoreEmployeeAsync,
    toggleActiveEmployeeAsync,
} from '@/redux/Employee/employeeSlice';
import ExplicitIcon from '@mui/icons-material/Explicit';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';

export default function EmployeeTable() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogged = useSelector((state) => state.userCurrent);

    const defaultImage = 'https://via.placeholder.com/100x100?text=No+Image';

    const [showDeleted, setShowDeleted] = useState(false);

    // Định nghĩa các cột bằng useMemo để cải thiện hiệu suất
    const columns = useMemo(
        () => [
            {
                field: 'userId',
                headerName: 'Mã nhân viên',
                width: 150,
                renderCell: (params) => (
                    <span className={params.row.userId === userLogged.data.userId ? 'text-orange-400 font-bold' : ''}>
                        {params.value}
                    </span>
                ),
            },
            {
                field: 'fullName',
                headerName: 'Họ và tên',
                width: 210,
                renderCell: (params) => (
                    <span className={params.row.userId === userLogged.data.userId ? 'text-orange-400 font-bold' : ''}>
                        {params.value}
                    </span>
                ),
            },
            { field: 'phoneNumber', headerName: 'Số điện thoại', width: 170 },
            {
                field: 'role',
                headerName: 'Chức vụ',
                width: 150,
                valueGetter: (params) => (params.roleDescription ? params.roleDescription : '?'),
            },
            { field: 'startDate', headerName: 'Ngày vào làm', width: 180 },
            {
                field: 'image',
                headerName: 'Ảnh',
                width: 150,
                renderCell: (params) => {
                    const imageUrl = params.value || defaultImage;
                    <img
                        src={imageUrl}
                        alt={params.row.fullName}
                        style={{ width: '50%', height: 'auto', borderRadius: '50%' }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = defaultImage;
                        }}
                    />;
                },
            },
            {
                field: 'isActive',
                headerName: 'Trạng thái',
                width: 120,
                renderCell: (params) => (
                    <Switch
                        disabled={params.row.userId === userLogged.data.userId || false || showDeleted}
                        checked={params.row.isActive}
                        onChange={() => handleToggleActive(params.row.userId)}
                        color="secondary"
                    />
                ),
            },
            {
                field: 'actions',
                headerAlign: 'center',
                headerName: 'Công cụ',
                width: 130,
                renderCell: (params) => (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        {/* Nút chỉnh sửa */}
                        <IconButton
                            color="primary"
                            onClick={() => handleEdit(params.row)}
                            style={{ textAlign: 'center' }}
                        >
                            <EditIcon />
                        </IconButton>

                        {showDeleted && (
                            <Tooltip title="Khôi phục tài khoản này" placement="bottom">
                                <IconButton
                                    color="primary"
                                    onClick={() => handleRestore(params.row)}
                                    style={{ textAlign: 'center' }}
                                >
                                    <RotateRightRoundedIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>
                ),
            },
        ],
        [showDeleted],
    );

    const handleEdit = (row) => {
        navigate(`/employee/EmployeeDetail/${row.userId}`);
    };

    const handleAdd = () => {
        navigate('/employee/EmployeeDetail/create');
    };

    const handleToggleActive = (userId) => {
        dispatch(toggleActiveEmployeeAsync(userId));
    };

    const handleRestore = (row) => {
        if (row.userId) {
            dispatch(restoreEmployeeAsync(row.userId));
            alert('Nhân viên đã được khôi phục');
        }
    };

    const handleShowDeletedToggle = (event) => {
        setShowDeleted(event.target.checked);
        const newParams = new URLSearchParams(searchParams);
        newParams.set('showDeleted', event.target.checked);
        setSearchParams(newParams);
    };

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const check = searchParams.get('showDeleted') === 'true';
        setShowDeleted(check);
    }, []);

    return (
        <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={3}>
                <Typography variant="h4" component="h2" fontWeight="bold" color={showDeleted ? '#ab003c' : 'inherit'}>
                    {showDeleted ? 'DANH SÁCH NHÂN VIÊN ĐÃ XÓA' : 'DANH SÁCH NHÂN VIÊN'}
                </Typography>
                <Button variant="contained" color="success" startIcon={<AddCircleIcon />} onClick={handleAdd}>
                    Thêm mới
                </Button>
            </Box>
            <Box sx={{ height: 500, overflow: 'auto' }}>
                <TablePagination
                    columns={columns}
                    stt={true}
                    id="userId"
                    dispatchHandle={showDeleted ? fetchEmployeesDeletedAsync : fetchEmployeesAvailableAsync}
                    sliceName="employeeNew"
                />
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
                <Box display="flex" alignItems="center">
                    <Typography variant="body1" marginRight={1} color="red">
                        Nhân viên đã xóa:
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
