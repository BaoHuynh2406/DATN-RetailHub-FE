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
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, removeEmployee, updateEmployee, restoreEmployee } from '@/redux/EmployeeController/EmployeeAction';

const StyledBox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(3),
}));

const defaultImage = 'https://via.placeholder.com/400x300?text=No+Image';

const EmployeeDetails = () => {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employee);
    const { userId } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        userId: '',
        fullName: '',
        password: '',
        confirmPassword: '',
        email: '',
        phoneNumber: '',
        address: '',
        cccd: '',
        startDate: '',
        endDate: '',
        status: true,
        roleId: '',
        image: '',
    });

    useEffect(() => {
        if (userId === 'create') {
            setEmployee({
                userId: '',
                fullName: '',
                password: '',
                confirmPassword: '',
                email: '',
                phoneNumber: '',
                address: '',
                cccd: '',
                startDate: '',
                endDate: '',
                status: true,
                roleId: '',
                image: '',
            });
        } else {
            if (Array.isArray(employees)) {
                const foundEmployee = employees.find((item) => item.userId === userId);
                if (foundEmployee) {
                    setEmployee({
                        ...foundEmployee,
                        password: '', // Đặt mật khẩu và xác nhận mật khẩu là rỗng khi chỉnh sửa
                        confirmPassword: '', // Điều này cho phép người dùng nhập mật khẩu mới
                    });
                } else {
                    alert('Nhân viên không tồn tại!');
                    navigate('/not-found');
                }
            } else {
                console.error('Danh sách nhân viên không hợp lệ');
                navigate('/not-found');
            }
        }
    }, [userId, employees, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setEmployee({ ...employee, image: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (employee.password !== employee.confirmPassword) {
            alert('Mật khẩu và xác nhận mật khẩu không khớp!');
            return;
        }

        const { password, confirmPassword, ...employeeData } = employee;

        if (userId === 'create') {
            dispatch(addEmployee(employeeData));
        } else {
            dispatch(updateEmployee( employeeData ));
        }
        navigate('/employee');
        alert('Lưu thành công');
    };

    const handleDelete = () => {
        if (userId !== '0') {
            dispatch(removeEmployee(userId));
            alert('Nhân viên đã được xóa');
            navigate('/employee');
        } else {
            console.log('Lỗi khi xóa nhân viên có userId: ', userId);
        }
    };

    const handleRestore = () => {
        if (userId !== '0') {
            dispatch(restoreEmployee(userId));
            alert('Nhân viên đã được khôi phục');
            navigate('/employee');
        } else {
            console.log('Lỗi khi khôi phục nhân viên có userId: ', userId);
        }
    };

    const handleReset = () => {
        setEmployee({
            userId: '',
            fullName: '',
            password: '',
            confirmPassword: '',
            email: '',
            phoneNumber: '',
            address: '',
            cccd: '',
            startDate: '',
            endDate: '',
            status: true,
            roleId: '',
            image: '',
        });
    };

    const handleBack = () => navigate('/employee');

    return (
        <Container maxWidth="lg" sx={{ overflow: 'auto', height: '100vh' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ marginBottom: 2 }} marginTop="20px">
                <Typography variant="h4" align="left" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {userId === 'create' ? 'Tạo Mới' : 'Chi Tiết'}
                </Typography>
                <Button variant="contained" onClick={handleBack}>
                    <ReplyAllIcon />
                </Button>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Mã nhân viên"
                        name="userId"
                        value={employee.userId}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            readOnly: userId !== 'create',
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
                </Grid>

                <Grid item xs={12} md={4}>
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
                        label="Mật khẩu"
                        name="password"
                        type="password"
                        value={employee.password}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Nhập lại mật khẩu"
                        name="confirmPassword"
                        type="password"
                        value={employee.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Vai trò"
                        name="roleId"
                        value={employee.roleId}
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
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <DateRangeIcon />
                                </InputAdornment>
                            ),
                        }}
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
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <DateRangeIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ marginBottom: '16px' }}
                    />
                    <img
                        src={employee.image || defaultImage}
                        alt="Employee"
                        style={{ width: '100%', borderRadius: '8px' }}
                    />
                </Grid>
            </Grid>

            <StyledBox display="flex" justifyContent="flex-end" marginTop={4}>
                {userId === 'create' ? (
                    <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginRight: 2 }}>
                        Lưu
                    </Button>
                ) : (
                    <>
                        {employee.status ? (
                            <Button variant="outlined" color="error" onClick={handleDelete} sx={{ marginRight: 2 }}>
                                Xóa
                            </Button>
                        ) : (
                            <Button variant="outlined" color="info" onClick={handleRestore} sx={{ marginRight: 2 }}>
                                Khôi phục
                            </Button>
                        )}
                        <Button variant="contained" color="success" onClick={handleSave} sx={{ marginRight: 2 }}>
                            Cập nhật
                        </Button>
                    </>
                )}
                <Button variant="outlined" onClick={handleReset}>
                    Làm lại
                </Button>
            </StyledBox>
        </Container>
    );
};

export default EmployeeDetails;
