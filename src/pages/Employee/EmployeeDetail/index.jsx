import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Container, Box, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import BadgeIcon from '@mui/icons-material/Badge';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, removeEmployee, updateEmployee, restoreEmployee } from '@/redux/EmployeeController/EmployeeAction';

const StyledBox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(3),
}));

const EmployeeDetails = () => {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees || []);
    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        id: '',
        userId: '',
        fullName: '',
        password: '',
        email: '',
        phoneNumber: '',
        address: '',
        cccd: '',
        startDate: '',
        endDate: '',
        status: true,
        roleId: '',
    });

    useEffect(() => {
        if (id === 'create') {
            setEmployee({
                id: '',
                userId: '',
                fullName: '',
                password: '',
                email: '',
                phoneNumber: '',
                address: '',
                cccd: '',
                startDate: '',
                endDate: '',
                status: true,
                roleId: '',
            });
        } else {
            if (Array.isArray(employees)) {
                const foundEmployee = employees.find((item) => item.id === id);
                if (foundEmployee) {
                    setEmployee(foundEmployee);
                } else {
                    alert('Nhân viên không tồn tại!');
                    navigate('/not-found');
                }
            } else {
                console.error('Danh sách nhân viên không hợp lệ');
                navigate('/not-found');
            }
        }
    }, [id, employees, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (id === 'create') {
            dispatch(addEmployee(employee));
        } else {
            dispatch(updateEmployee(employee));
        }
        alert('Lưu thành công');
    };

    const handleDelete = () => {
        if (id !== '0') {
            dispatch(removeEmployee(id));
            alert('Nhân viên đã được xóa');
            navigate('/employee');
        } else {
            console.log('Lỗi khi xóa nhân viên có id: ', id);
        }
    };

    const handleRestore = () => {
        if (id !== '0') {
            dispatch(restoreEmployee(id));
            alert('Nhân viên đã được khôi phục');
            navigate('/employee');
        } else {
            console.log('Lỗi khi khôi phục nhân viên có id: ', id);
        }
    };

    const handleReset = () => {
        setEmployee({
            id: '',
            userId: '',
            fullName: '',
            password: '',
            email: '',
            phoneNumber: '',
            address: '',
            cccd: '',
            startDate: '',
            endDate: '',
            status: true,
            roleId: '',
        });
    };

    const handleBack = () => navigate('/employee');

    return (
        <Container maxWidth="lg" sx={{ overflow: 'auto', height: '100vh' }}>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{ marginBottom: 2 }}
                marginTop="20px"
            >
                <Typography variant="h4" align="left" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {id === 'create' ? 'Tạo Mới' : 'Chi Tiết'}
                </Typography>
                <Button variant="contained" onClick={handleBack}>
                    <ReplyAllIcon />
                </Button>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Mã nhân viên"
                        name="userId"
                        value={employee.userId}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            readOnly: id !== 'create',
                            endAdornment: (
                                <InputAdornment position="end">
                                    <BadgeIcon />
                                </InputAdornment>
                            ),
                        }}
                        margin="normal"
                    />
                    <TextField
                        label="Họ và tên"
                        name="fullName"
                        value={employee.fullName}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <EmailIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Số điện thoại"
                        name="phoneNumber"
                        value={employee.phoneNumber}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <PhoneIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        label="Địa chỉ"
                        name="address"
                        value={employee.address}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <HomeIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="CCCD/ID"
                        name="cccd"
                        value={employee.cccd}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <BadgeIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Ngày bắt đầu"
                        name="startDate"
                        type="date"
                        value={employee.startDate}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Ngày kết thúc"
                        name="endDate"
                        type="date"
                        value={employee.endDate}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: 3 }}>
                <Grid item xs={12} sm={4}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
                        {id === 'create' ? 'Tạo mới' : 'Lưu'}
                    </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button variant="outlined" color="secondary" fullWidth onClick={handleReset}>
                        Đặt lại
                    </Button>
                </Grid>
                {id !== 'create' && (
                    <Grid item xs={12} sm={4}>
                        {employee.status ? (
                            <Button variant="contained" color="error" fullWidth onClick={handleDelete}>
                                Xóa nhân viên
                            </Button>
                        ) : (
                            <Button variant="contained" color="success" fullWidth onClick={handleRestore}>
                                Khôi phục nhân viên
                            </Button>
                        )}
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default EmployeeDetails;
