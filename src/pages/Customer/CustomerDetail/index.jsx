import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Container, Box, InputAdornment, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer, removeCustomer, restoreCustomer, updateCustomer } from '@/redux/Customer/CustomerAction';

const StyledBox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(3),
}));

const CustomerDetails = () => {
    const dispatch = useDispatch();
    const customers = useSelector((state) => state.customer);
    const { customerId } = useParams();
    const navigate = useNavigate();

    const [customer, setCustomer] = useState({
        customerId: '',
        fullName: '',
        phoneNumber: '',
        points: '',
        isActive: true, // Default value for new customers
        isDelete: true,
    });

    const createCustomer = 'create';

    useEffect(() => {
        console.log('CustomerId:', customerId);
        console.log('Customers:', customers);
        if (customerId !== createCustomer) {
            if (Array.isArray(customers)) {
                const foundCustomer = customers.find((item) => item.customerId === customerId);
                console.log('Found Customer:', foundCustomer);
                if (foundCustomer) {
                    setCustomer(foundCustomer);
                } else {
                    alert('Khách hàng không tồn tại!');
                    navigate('/not-found');
                }
            }
        }
    }, [customerId, customers, navigate]);

    useEffect(() => {
        console.log('Danh sách khách hàng đã cập nhật:', customers);
    }, [customers]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { checked } = e.target;
        setCustomer({ ...customer, isActive: checked });
    };

    const handleSave = () => {
        if (customerId === createCustomer) {
            dispatch(addCustomer(customer)); // Thêm khách hàng vào redux
            console.log('Thêm khách hàng:', customer);
        } else {
            dispatch(updateCustomer(customer)); // Cập nhật khách hàng
            console.log('Cập nhật khách hàng:', customer);
        }
        alert('Lưu thành công');
    };

    const handleDelete = () => {
        if (customerId !== '0') {
            dispatch(removeCustomer(customerId));
            console.log('Xóa khách hàng với ID:', customerId);
            alert('Khách hàng đã được xóa');
        } else {
            console.log('Lỗi khi xóa khách hàng có id: ', customerId);
        }
    };

    const handleRestore = () => {
        if (customerId !== '0') {
            dispatch(restoreCustomer(customerId));
            console.log('Khôi phục khách hàng với ID:', customerId);
            alert('Khách hàng đã được khôi phục');
        } else {
            console.log('Lỗi khi khôi phục khách hàng có id: ', customerId);
        }
    };

    const handleReset = () => {
        setCustomer({
            customerId: '',
            fullName: '',
            phoneNumber: '',
            points: '',
            isActive: true, // Reset to default value
            isDelete: true,
        });
    };

    const handleBack = () => navigate('/customer');

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
                    {customerId === createCustomer ? 'Tạo Mới' : 'Chi Tiết'}
                </Typography>
                <Button variant="contained" onClick={handleBack}>
                    <ReplyAllIcon />
                </Button>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Mã khách hàng"
                        name="customerId"
                        value={customer.customerId}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            readOnly: customerId !== createCustomer, // Chỉ đọc nếu không phải trang tạo mới
                            endAdornment: (
                                <InputAdornment position="end">
                                    <PermIdentityIcon />
                                </InputAdornment>
                            ),
                        }}
                        margin="normal"
                    />
                    <TextField
                        label="Họ và tên"
                        name="fullName"
                        value={customer.fullName}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Số điện thoại"
                        name="phoneNumber"
                        value={customer.phoneNumber}
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
                        type="number"
                        name="points"
                        value={customer.points}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <FormControl margin="normal">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={customer.isActive}
                                    onChange={handleCheckboxChange}
                                    color="primary"
                                />
                            }
                            label="Trạng thái hoạt động"
                        />
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: 3 }}>
                <Grid item xs={12} sm={4}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
                        {customerId === createCustomer ? 'Tạo mới' : 'Lưu'}
                    </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button variant="outlined" color="secondary" fullWidth onClick={handleReset}>
                        Đặt lại
                    </Button>
                </Grid>
                {customerId !== createCustomer && (
                    <Grid item xs={12} sm={4}>
                        {customer.isDelete ? (
                            <Button variant="contained" color="success" fullWidth onClick={handleRestore}>
                                Khôi phục khách hàng
                            </Button>
                        ) : (
                            <Button variant="contained" color="error" fullWidth onClick={handleDelete}>
                                Xóa khách hàng
                            </Button>

                        )}
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default CustomerDetails;
