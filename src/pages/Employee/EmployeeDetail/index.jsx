import { useState, useEffect, useRef } from 'react';
import {
    TextField,
    Button,
    Grid,
    Typography,
    Container,
    Box,
    InputAdornment,
    Skeleton,
    Switch,
    Tooltip,
} from '@mui/material';

//Icons
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import BadgeIcon from '@mui/icons-material/Badge';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import LockIcon from '@mui/icons-material/Lock';
import CakeIcon from '@mui/icons-material/Cake';
//End Icon

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
    fetchEmployeeByIdAsync,
    findEmployee,
    setError,
    removeEmployeeAsync,
    restoreEmployeeAsync,
    updateEmployeeAsync,
    addEmployeeAsync,
} from '@/redux/Employee/employeeSlice';

const defaultImage = 'https://via.placeholder.com/400x300?text=No+Image';

const EmployeeDetails = () => {
    //Định nghĩa các biến
    const dispatch = useDispatch();
    const { data, currentData, loading, error } = useSelector((state) => state.employeeNew);
    const { userId } = useParams();
    const navigate = useNavigate();
    const employeeNull = {
        userId: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        image: '',
        startDate: '',
        endDate: '',
        birthday: '',
        isActive: true,
        isDelete: false,
        password: '',
        role: {
            roleId: '',
            roleDescription: '',
        },
    };
    const [employee, setEmployee] = useState(employeeNull);

    // hook này có chức năng lấy dữ liệu từ kho lưu trữ,
    //hoặc nếu kho lưu trữ ko có sẳn thì lấy từ DB
    useEffect(() => {
        // Thêm mới nhân viên
        if (userId === 'create') {
            setEmployee(employeeNull);
            return;
        }
        //Nếu kho lưu trữ có sẳn thì lấy từ kho
        if (data.length) {
            dispatch(findEmployee(userId));
            return;
        }
        // ngược lại nếu kho không có thì lấy từ DB
        dispatch(fetchEmployeeByIdAsync(userId));
    }, []);

    //hooks này có chức năng load nhân viên khi dữ liệu có
    useEffect(() => {
        if (currentData && userId !== 'create') {
            setEmployee(currentData);
        }
    }, [currentData]);

    //hook này có chức năng hiển thị ra thông báo lỗi

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(setError(null));
            navigate('/employee');
        }
    }, [error]);

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
        let data = employee;
        //bổ sung thêm trường mật khẩu vào, và role
        data = { ...data, roleId: 'ADMIN' };
        if (userId === 'create') {
            dispatch(addEmployeeAsync(data));
        } else {
            dispatch(updateEmployeeAsync(data));
        }
        // navigate('/employee');
        // alert('Lưu thành công');
    };

    const handleDelete = () => {
        if (userId !== '0') {
            dispatch(removeEmployeeAsync(userId));
            alert('Nhân viên đã được xóa');
            navigate('/employee');
        } else {
            console.log('Lỗi khi xóa nhân viên có userId: ', userId);
        }
    };

    const handleRestore = () => {
        if (userId !== 'create') {
            dispatch(restoreEmployeeAsync(userId));
            alert('Nhân viên đã được khôi phục');
            navigate('/employee');
        } else {
            console.log('Lỗi khi khôi phục nhân viên có userId: ', userId);
        }
    };

    const handleReset = () => {
        setEmployee(employeeNull);
    };

    const handleBack = () => navigate('/employee');

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    height: '100%',
                }}
            >
                <Skeleton
                    animation="wave"
                    sx={{
                        height: 700,
                        width: '30%',
                    }}
                />
                <Skeleton
                    animation="wave"
                    sx={{
                        height: 700,
                        width: '30%',
                    }}
                />
                <Skeleton
                    animation="wave"
                    sx={{
                        height: 700,
                        width: '30%',
                    }}
                />
            </Box>
        );
    }

    return (
        <Container maxWidth="xl">
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{ marginBottom: 2 }}
                marginTop="20px"
            >
                <Typography variant="h4" align="left" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {userId === 'create' ? 'Tạo Mới' : `Nhân viên: ${employee.fullName}`}
                </Typography>
                <Button variant="contained" onClick={handleBack}>
                    <ReplyAllIcon />
                </Button>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Tooltip title={'Trường này không được thay đổi!'} placement="top-start">
                        <TextField
                            label="Mã nhân viên"
                            name="userId"
                            value={employee.userId || ''}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            disabled
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
                    </Tooltip>

                    <TextField
                        label="Họ và tên"
                        name="fullName"
                        value={employee.fullName || ''}
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
                        value={employee.email || ''}
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
                        value={employee.phoneNumber || ''}
                        onChange={handleChange}
                        fullWidth
                        type="number"
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
                        value={employee.address || ''}
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
                        label="Ngày sinh"
                        name="birthday"
                        type="date"
                        value={employee.birthday || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <CakeIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        label="CCCD"
                        name="cccd"
                        value="Chưa hỗ trợ"
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
                        value={employee.password || ''}
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
                        value={employee.role.roleId || ''}
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
                        value={employee.startDate || ''}
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
                        value={employee.endDate || ''}
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
                    <Box className="mt-2 ms-1" display="flex" alignItems="center">
                        <Typography sx={{ marginRight: 2, fontWeight: 'bold' }}>Trạng thái hoạt động:</Typography>
                        <Tooltip
                            title={
                                employee.isActive ? 'Tài khoản này đang hoạt động' : 'Tài khoản này bị chặn hoạt động'
                            }
                            placement="top"
                        >
                            <Switch
                                checked={employee.isActive}
                                onChange={(e) => setEmployee({ ...employee, isActive: e.target.checked })}
                                color="secondary"
                                name="active"
                            />
                        </Tooltip>
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Box display="flex" flexDirection="column" alignItems="center" paddingTop="20px">
                        <img
                            src={employee.image || defaultImage}
                            alt="Employee"
                            style={{ width: '100%', borderRadius: '8px' }}
                        />
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            sx={{
                                marginTop: 1,
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                width: '100%',
                                textAlign: 'center',
                            }}
                        >
                            {employee.image ? 'Tên ảnh: ' + employee.image.split('/').pop() : 'Chưa có ảnh'}
                        </Typography>
                        <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
                            Tải ảnh lên
                            <input type="file" hidden onChange={handleImageUpload} />
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Box display="flex" justifyContent="flex-end" marginTop={5}>
                {userId === 'create' ? (
                    <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginRight: 2 }}>
                        Lưu
                    </Button>
                ) : (
                    <>
                        {!employee.isDelete ? (
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
            </Box>
        </Container>
    );
};

export default EmployeeDetails;
