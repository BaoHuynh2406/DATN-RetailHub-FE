import React, { useState, useEffect, useDebugValue } from 'react';
import { axiosSecure } from '@/config/axiosInstance';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Switch,
    FormControlLabel,
    Grid,
    Box,
    Typography,
    Divider,
} from '@mui/material';
import { fetchAllDiscounts } from '@/redux/Discount/discountSlice';
import { useDispatch } from 'react-redux';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
    position: {
        x: 'right',
        y: 'top',
    },
    dismissible: true,
});

const DiscountDialog = ({ open, onClose, productId, isCreate = false }) => {
    const dispatch = useDispatch();

    const productDefault = {
        productName: 'Loading...',
        image: 'https://via.placeholder.com/150',
        price: 0,
    };
    // Giả lập dữ liệu sản phẩm (sẽ thay thế bằng API sau)
    const [product, setProduct] = useState(productDefault);

    const [discountRate, setDiscountRate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [active, setActive] = useState(true);
    const [discountedPrice, setDiscountedPrice] = useState(0);

    // Tính giá sau khi giảm khi giá gốc hoặc tỷ lệ giảm thay đổi
    useEffect(() => {
        if (product.price && discountRate) {
            const discountAmount = (product.price * discountRate) / 100;
            setDiscountedPrice(product.price - discountAmount); // Tính giá sau giảm
        } else {
            setDiscountedPrice(0); // Không có tỷ lệ giảm thì không tính giá giảm
        }
    }, [product.price, discountRate]);

    useEffect(() => {
        if (isCreate) {
            //Thêm mới
            //Lấy giữ liệu
            axiosSecure.get(`/api/product/${productId}`).then((r) => {
                setProduct(r.data.data);
            });
            setStartDate('');
            setEndDate('');
            setActive(true);
            setDiscountedPrice(0);

            return;
        }
        setProduct(productDefault);

        //Cập nhật
    }, [isCreate, productId, open]);

    const handleSubmit = async () => {
        // Kiểm tra tính hợp lệ của dữ liệu
        if (!discountRate || !startDate || !endDate) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        const discountData = {
            productId,
            originalPrice: parseFloat(product.price),
            discountedPrice,
            discountRate: parseFloat(discountRate) / 100,
            startDate,
            endDate,
            active: true,
        };

        if (isCreate) {
            //Lưu
            await axiosSecure
                .post('/api/discount/create', discountData)
                .then(() => {
                    notyf.success('Thêm khuyến mãi thành công!');
                })
                .catch((e) => {
                    notyf.error(e.response.data.message);
                });

            await dispatch(fetchAllDiscounts({ page: 1, size: 10 })).then((r) => {
                console.log(r);
            });
        }
        onClose(); // Đóng dialog sau khi submit
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Thêm khuyến mãi cho sản phẩm</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {/* Hiển thị hình ảnh, tên sản phẩm, và giá gốc */}
                    <Grid item xs={12} display="flex" alignItems="center">
                        <Box
                            component="img"
                            src={product.image}
                            alt={product.productName}
                            sx={{ width: '100px', height: '80px', marginRight: 2 }}
                        />
                        <Box>
                            <Typography variant="h6">{product.productName}</Typography>
                            <Box display="flex" alignItems="center">
                                {/* Hiển thị giá gốc và giá đã giảm */}
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                    sx={{
                                        textDecoration: discountRate ? 'line-through' : 'none',
                                        color: discountRate ? 'red' : 'black',
                                        fontStyle: discountRate ? 'italic' : 'normal',
                                        marginRight: 2,
                                    }}
                                >
                                    {product.price.toLocaleString()} VNĐ
                                </Typography>
                                {discountedPrice > 0 && (
                                    <Typography variant="body1" color="primary">
                                        {discountedPrice.toLocaleString()} VNĐ
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </Grid>

                    {/* Tỷ lệ giảm giá */}
                    <Grid item xs={12}>
                        <TextField
                            label="Tỷ lệ giảm giá (%)"
                            fullWidth
                            value={discountRate}
                            onChange={(e) => setDiscountRate(e.target.value)}
                            variant="outlined"
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                    max: 100,
                                },
                            }}
                        />
                    </Grid>

                    {/* Ngày bắt đầu */}
                    <Grid item xs={12}>
                        <TextField
                            label="Ngày bắt đầu"
                            fullWidth
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            variant="outlined"
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    {/* Ngày kết thúc */}
                    <Grid item xs={12}>
                        <TextField
                            label="Ngày kết thúc"
                            fullWidth
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            variant="outlined"
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    {/* Trạng thái */}
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Switch checked={active} onChange={(e) => setActive(e.target.checked)} name="active" />
                            }
                            label="Active"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Hủy
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DiscountDialog;
