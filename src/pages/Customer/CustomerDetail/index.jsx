import { useState, useEffect } from 'react';
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

// Icons
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import LockIcon from '@mui/icons-material/Lock';
// End Icons

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
    fetchCustomerByIdAsync,
    setError,
    removeCustomerAsync,
    restoreCustomerAsync,
    updateCustomerAsync,
    addCustomerAsync,
} from '@/redux/Customer/customerSlice';

const CustomerDetails = () => {
    const dispatch = useDispatch();
    const { data, currentData, loading, error } = useSelector((state) => state.customer);
    const { customerId } = useParams();
    const navigate = useNavigate();

    const customerNull = {
        customerId: '',
        fullName: '',
        phoneNumber: '',
        points: '',
        isActive: true,
        isDelete: false,
    };

    const [customer, setCustomer] = useState(customerNull);

    useEffect(() => {
        if (customerId === 'create') {
            setCustomer(customerNull);
            return;
        }

        // If data is available, find customer from it
        const foundCustomer = data.find(cust => cust.customerId === customerId);
        if (foundCustomer) {
            setCustomer(foundCustomer);
        } else {
            // Otherwise, fetch customer data
            dispatch(fetchCustomerByIdAsync(customerId));
        }
    }, [customerId, data, dispatch]);

    useEffect(() => {
        if (currentData && customerId !== 'create') {
            setCustomer(currentData);
        }
    }, [currentData, customerId]);

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(setError(null));
            navigate('/customer');
        }
    }, [error, dispatch, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleDelete = () => {
        if (customerId !== '0') {
            dispatch(removeCustomerAsync(customerId));
            alert('Khách hàng đã được xóa');
            navigate('/customer');
        } else {
            console.log('Lỗi khi xóa khách hàng với customerId: ', customerId);
        }
    };
    const handleSave = () => {
        if (customerId === 'create') {
            // Thêm mới khách hàng
            dispatch(addCustomerAsync(customer))
                .unwrap()
                .then((data) => {
                    // console.log('Customer added successfully', data);
                    alert('Khách hàng đã được thêm thành công!'); // Thông báo thành công
                    navigate('/customer'); // Chuyển hướng về danh sách khách hàng
                })
                .catch((error) => {
                    // console.error('Failed to add customer:', error.message);
                    alert('Lỗi: Khách hàng đã tồn tại dựa tên số điên thoại.'); // Hiển thị thông báo lỗi cho người dùng
                });
        } else {
            // Cập nhật thông tin khách hàng
            dispatch(updateCustomerAsync(customer))
                .unwrap()
                .then((data) => {
                    console.log('Customer updated successfully', data);
                    alert('Khách hàng đã được cập nhật thành công!'); // Thông báo thành công
                    navigate('/customer'); // Chuyển hướng về danh sách khách hàng
                })
                .catch((error) => {
                    console.error('Failed to update customer:', error.message);
                    alert('Lỗi: Không thể cập nhật khách hàng.'); // Hiển thị thông báo lỗi cho người dùng
                });
        }
    };

    const handleRestore = () => {
        if (customerId !== 'create') {
            dispatch(restoreCustomerAsync(customerId)); const handleSave = () => {
                if (customerId === 'create') {
                    // Thêm mới khách hàng
                    dispatch(addCustomerAsync(customer))
                        .unwrap()
                        .then((data) => {
                            console.log('Customer added successfully', data);
                            alert('Khách hàng đã được thêm thành công!'); // Thông báo thành công
                            navigate('/customer'); // Chuyển hướng về danh sách khách hàng
                        })
                        .catch((error) => {
                            console.error('Failed to add customer:', error.message);
                            alert('Lỗi: Khách hàng đã tồn tại.'); // Hiển thị thông báo lỗi cho người dùng
                        });
                } else {
                    // Cập nhật thông tin khách hàng
                    dispatch(updateCustomerAsync(customer))
                        .unwrap()
                        .then((data) => {
                            console.log('Customer updated successfully', data);
                            alert('Khách hàng đã được cập nhật thành công!'); // Thông báo thành công
                            navigate('/customer'); // Chuyển hướng về danh sách khách hàng
                        })
                        .catch((error) => {
                            console.error('Failed to update customer:', error.message);
                            alert('Lỗi: Không thể cập nhật khách hàng.'); // Hiển thị thông báo lỗi cho người dùng
                        });
                }
            };

            alert('Khách hàng đã được khôi phục');
            navigate('/customer');
        } else {
            console.log('Lỗi khi khôi phục khách hàng với customerId: ', customerId);
        }
    };

    const handleReset = () => {
        if (customerId === 'create') {
            setCustomer(customerNull); // Reset for new customer
        } else {
            setCustomer(currentData); // Reset to current data
        }
    };

    const handleBack = () => navigate('/customer');

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
                <Skeleton animation="wave" sx={{ height: 700, width: '30%' }} />
                <Skeleton animation="wave" sx={{ height: 700, width: '30%' }} />
                <Skeleton animation="wave" sx={{ height: 700, width: '30%' }} />
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
                    {customerId === 'create' ? 'Tạo Mới' : `Khách Hàng: ${customer.fullName}`}
                </Typography>
                <Button variant="contained" onClick={handleBack}>
                    <ReplyAllIcon />
                </Button>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={6} md={4}>
                    <TextField
                        label="Mã Khách Hàng"
                        name="customerId"
                        value={customer.customerId || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        disabled
                        InputProps={{
                            readOnly: customerId !== 'create',
                            endAdornment: (
                                <InputAdornment position="end">
                                    <BadgeIcon />
                                </InputAdornment>
                            ),
                        }}
                        margin="normal"
                    />

                    <TextField
                        label="Tên Đầy Đủ"
                        name="fullName"
                        value={customer.fullName || ''}
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

                    <Box className="mt-2 ms-1" display="flex" alignItems="center">
                        <Typography sx={{ marginRight: 2, fontWeight: 'bold' }}>Trạng Thái Kích Hoạt:</Typography>
                        <Tooltip
                            title={
                                customer.isActive ? 'Tài khoản này đang hoạt động' : 'Tài khoản này đã bị vô hiệu hóa'
                            }
                            placement="top"
                        >
                            <Switch
                                checked={customer.isActive}
                                onChange={(e) => setCustomer({ ...customer, isActive: e.target.checked })}
                                color="secondary"
                                name="active"
                            />
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid item xs={6} md={4}>
                    <TextField
                        label="Số Điện Thoại"
                        name="phoneNumber"
                        value={customer.phoneNumber || ''}
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
                        label="Điểm"
                        name="points"
                        value={customer.points || ''}
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
                </Grid>

            </Grid>

            <Box display="flex" justifyContent="flex-end" marginTop={5}>
                {customerId === 'create' ? (
                    <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginRight: 2 }}>
                        Lưu
                    </Button>
                ) : (
                    <>
                        {!customer.isDelete ? (
                            <Button variant="outlined" color="error" onClick={handleDelete} sx={{ marginRight: 2 }}>
                                Xóa
                            </Button>
                        ) : (
                            <Button variant="outlined" color="info" onClick={handleRestore} sx={{ marginRight: 2 }}>
                                Khôi Phục
                            </Button>
                        )}
                        <Button variant="contained" color="success" onClick={handleSave} sx={{ marginRight: 2 }}>
                            Cập Nhật
                        </Button>
                    </>
                )}
                <Button variant="outlined" onClick={handleReset}>
                    Đặt Lại
                </Button>
            </Box>
        </Container>
    );
};

export default CustomerDetails;
