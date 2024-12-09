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
    CircularProgress,
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
    toggleActiveEmployeeAsync,
} from '@/redux/Employee/employeeSlice';

import { useImgBB } from '@/hooks/useImgBB';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
    position: {
        x: 'right',
        y: 'top',
    },
    dismissible: true,
});

const defaultImage = 'https://via.placeholder.com/400x300?text=No+Image';

const EmployeeDetails = () => {
    //Định nghĩa các biến
    const dispatch = useDispatch();
    const { data, currentData, loading, error } = useSelector((state) => state.employeeNew);
    const userLogged = useSelector((state) => state.userCurrent);
    const { handleUpload } = useImgBB();
    const [isLoading, setIsLoading] = useState(false);
    let { userId } = useParams();
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
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
    const [errors, setErrors] = useState({});

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
    }, [useParams()]);

    //hooks này có chức năng load nhân viên khi dữ liệu có
    useEffect(() => {
        if (currentData && userId !== 'create') {
            setEmployee(currentData);
        }
    }, [currentData]);

    //hook này có chức năng hiển thị ra thông báo lỗi
    useEffect(() => {
        if (loading) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [loading]);

    useEffect(() => {
        if (error) {
            notyf.error(error);
            console.log(error);
            if (error === 'User not found') {
                navigate('/employee/EmployeeDetail/create');
                return;
            }
            navigate(0);
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

    const handleChoseImage = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setEmployee({ ...employee, image: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleUploadImage = async () => {
        if (!selectedFile) throw new Error('No file selected');
        if (!selectedFile.type.startsWith('image/')) {
            notyf.error('Chỉ nhận file ảnh');
            throw new Error('Invalid file type');
        }

        const fileName =
            'UserImage-' +
            selectedFile.name
                .substring(0, selectedFile.name.lastIndexOf('.'))
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/\s+/g, '')
                .toLowerCase();

        const url = await handleUpload(selectedFile, fileName);
        return url;
    };

    const handleSave = async () => {
        if (!validateForm()) {
            notyf.error('Vui lòng kiểm tra các trường bắt buộc');
            return;
        }
    
        setIsLoading(true);
        let data = { ...employee, roleId: 'ADMIN' };
    
        try {
            if (userId === 'create') {
                await dispatch(addEmployeeAsync(data)).unwrap();
                notyf.success('Đã thêm!');
                setIsLoading(false);
                navigate(0);
                return;
            }
            await dispatch(updateEmployeeAsync(data)).unwrap();
            setIsLoading(false);
            notyf.success('Đã cập nhật!');
        } catch (error) {
            notyf.error('Lỗi trong quá trình lưu!');
            setIsLoading(false);
            console.log(error);
        }
    };
    

    const handleDelete = () => {
        if (userId !== 'create') {
            dispatch(removeEmployeeAsync(userId))
                .unwrap()
                .then(() => {
                    notyf.success('Đã xóa!');
                    navigate('/employee');
                });
        } else {
            console.log('Lỗi khi xóa nhân viên có userId: ', userId);
        }
    };

    const handleRestore = () => {
        if (userId !== 'create') {
            dispatch(restoreEmployeeAsync(userId));
            notyf.success('Đã khôi phục!');
            navigate('/employee');
        } else {
            console.log('Lỗi khi khôi phục nhân viên có userId: ', userId);
        }
    };

    const handleReset = () => {
        setEmployee(employeeNull);
    };

    const handleBack = () => navigate(-1);

    const handleToggleActive = () => {
        setEmployee({ ...employee, isActive: !employee.isActive });
        if (userId !== 'create') dispatch(toggleActiveEmployeeAsync(employee.userId));
    };

    const validateForm = () => {
        const errors = {};
    
        // Kiểm tra Họ và tên
        if (!employee.fullName) {
            errors.fullName = 'Họ và tên là bắt buộc';
        }
    
        // Kiểm tra Email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!employee.email || !emailRegex.test(employee.email)) {
            errors.email = 'Email không hợp lệ';
        }
    
        // Kiểm tra số điện thoại (phải là số và đúng độ dài)
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!employee.phoneNumber || !phoneRegex.test(employee.phoneNumber)) {
            errors.phoneNumber = 'Số điện thoại không hợp lệ';
        }
    
        // Kiểm tra Mật khẩu (tối thiểu 6 ký tự)
        if (employee.password && employee.password.length < 6) {
            errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }
    
        // Kiểm tra Ngày bắt đầu và Ngày kết thúc
        if (employee.startDate && employee.endDate) {
            if (new Date(employee.startDate) > new Date(employee.endDate)) {
                errors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
            }
        }
    
       // Kiểm tra Ngày sinh (Nhân viên phải từ 18 tuổi trở lên và trường này là bắt buộc)
            if (!employee.birthday) {
                errors.birthday = 'Ngày sinh là bắt buộc';
            } else {
                const age = new Date().getFullYear() - new Date(employee.birthday).getFullYear();
                if (age < 18) {
                    errors.birthday = 'Nhân viên phải từ 18 tuổi trở lên';
                }
            }

         // Kiểm tra Ngày bắt đầu (Ngày bắt đầu phải không để trống và phải trong tương lai)
        if (!employee.startDate) {
            errors.startDate = 'Ngày bắt đầu là bắt buộc';
        } else if (new Date(employee.startDate) < new Date()) {
            errors.startDate = 'Ngày bắt đầu phải là ngày hôm nay hoặc sau này';
        }
        // Kiểm tra Địa chỉ
        if (!employee.address) {
            errors.address = 'Địa chỉ là bắt buộc';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0; // Trả về true nếu không có lỗi
    };
    

    return (
        <Container maxWidth="xl">
            <Box position="relative">
                {isLoading && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 10,
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}
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
                            error={!!errors.fullName}
                            helperText={errors.fullName}
                        />

                        <TextField
                            label="Email"
                            name="email"
                            value={employee.email || ''}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            error={!!errors.email}
                            helperText={errors.email}
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
                            error={!!errors.phoneNumber}
                            helperText={errors.phoneNumber}
                        />

                        <TextField
                            label="Địa chỉ"
                            name="address"
                            value={employee.address || ''}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            error={!!errors.address}
                            helperText={errors.address}
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
                        error={!!errors.birthday}
                        helperText={errors.birthday}
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
                            error={!!errors.password}
                            helperText={errors.password}
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
                            error={!!errors.startDate}
                            helperText={errors.startDate}
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
                            error={!!errors.endDate}
                            helperText={errors.endDate}
                        />
                        <Box className="mt-2 ms-1" display="flex" alignItems="center">
                            <Typography sx={{ marginRight: 2, fontWeight: 'bold' }}>Trạng thái hoạt động:</Typography>
                            <Tooltip
                                title={
                                    employee.isActive
                                        ? 'Tài khoản này đang hoạt động'
                                        : 'Tài khoản này bị chặn hoạt động'
                                }
                                placement="top"
                            >
                                <Switch
                                    disabled={employee?.userId === userLogged?.data?.userId || false}
                                    checked={employee.isActive}
                                    onChange={handleToggleActive}
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
                                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
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
                                Chọn ảnh
                                <input type="file" hidden onChange={handleChoseImage} />
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                <Box display="flex" justifyContent="flex-start" marginTop={5} marginBottom={5}>
                    {userId === 'create' ? (
                        <>
                            <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginRight: 2 }}>
                                Lưu
                            </Button>
                            <Button variant="outlined" onClick={handleReset}>
                                Làm lại
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    navigate('/employee/EmployeeDetail/create');
                                }}
                                sx={{ marginRight: 2 }}
                            >
                                Thêm mới
                            </Button>
                            <Button variant="contained" color="success" onClick={handleSave} sx={{ marginRight: 2 }}>
                                Lưu thay đổi
                            </Button>
                            {!employee.isDelete ? (
                                <Button
                                    disabled={employee.userId === userLogged?.data?.userId || false}
                                    variant="outlined"
                                    color="error"
                                    onClick={handleDelete}
                                    sx={{ marginRight: 2 }}
                                >
                                    Xóa
                                </Button>
                            ) : (
                                <Button variant="outlined" color="info" onClick={handleRestore} sx={{ marginRight: 2 }}>
                                    Khôi phục
                                </Button>
                            )}
                        </>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default EmployeeDetails;
