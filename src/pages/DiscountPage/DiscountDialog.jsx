import React, { useState, useEffect } from 'react';
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

// Hàm để chuyển đổi từ ISO 8601 thành datetime-local format
const formatDateTimeForInput = (dateTimeString) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return date.toISOString().slice(0, 16); // Chuyển thành yyyy-MM-ddTHH:mm
};

const DiscountDialog = ({ open, onClose, productId, discountId, isCreate = false }) => {
    const dispatch = useDispatch();

    const defaultProduct = {
        productName: 'Loading...',
        image: 'https://via.placeholder.com/150',
        price: 0,
    };

    // Sử dụng useState để lưu trữ tất cả các giá trị trong discountData
    const [discountData, setDiscountData] = useState({
        product: defaultProduct,
        discountRate: 0,
        startDate: '',
        endDate: '',
        active: true,
    });

    useEffect(() => {
        if (isCreate && open) {
            // Thêm mới
            axiosSecure.get(`/api/product/${productId}`).then((r) => {
                setDiscountData({
                    ...discountData,
                    product: r.data.data,
                    startDate: '',
                    endDate: '',
                    discountRate: 0,
                    active: true,
                });
            });
            return;
        }

        if (open) {
            axiosSecure.get(`/api/discount/${discountId}`).then((r) => {
                const response = r.data.data;
                setDiscountData({
                    product: {
                        productName: response.productName,
                        image: response.image,
                        price: response.price,
                        productId: response.productId,
                    },
                    discountRate: response.discountRate * 100,
                    startDate: formatDateTimeForInput(response.startDate),
                    endDate: formatDateTimeForInput(response.endDate),
                    active: response.active,
                    id: response.id,
                });
            });
        }
    }, [open, discountId, productId, isCreate]);

    const handleSubmit = async () => {
        const { discountRate, startDate, endDate, discountedPrice, active } = discountData;

        if (!discountRate || !startDate || !endDate) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        let discountDataPayload = {
            id: discountId,
            productId,
            discountRate: parseFloat(discountRate) / 100,
            startDate,
            endDate,
            active,
        };

        try {
            if (isCreate) {
                await axiosSecure.post('/api/discount/create', discountDataPayload);
                notyf.success('Thêm khuyến mãi thành công!');
            } else {
                discountDataPayload = {
                    ...discountDataPayload,
                    productId: discountData.product.productId,
                    id: discountData.id,
                };
                await axiosSecure.put('/api/discount/update', discountDataPayload);
                notyf.success('Cập nhật khuyến mãi thành công!');
            }

            await dispatch(fetchAllDiscounts({ page: 1, size: 10 }));
            onClose(); // Đóng dialog sau khi submit
        } catch (e) {
            notyf.error(e.response.data.message);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{isCreate ? 'THÊM KHUYẾN MÃI CHO SẢN PHẨM' : 'CẬP NHẬT KHUYẾN MÃI'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} display="flex" alignItems="center">
                        <Box
                            component="img"
                            src={discountData.product.image}
                            alt={discountData.product.productName}
                            sx={{ width: '100px', height: '80px', marginRight: 2 }}
                        />
                        <Box>
                            <Typography variant="h6">{discountData.product.productName}</Typography>
                            <Box display="flex" alignItems="center">
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                    sx={{
                                        textDecoration: discountData.discountRate ? 'line-through' : 'none',
                                        color: discountData.discountRate ? 'red' : 'black',
                                        fontStyle: discountData.discountRate ? 'italic' : 'normal',
                                        marginRight: 2,
                                    }}
                                >
                                    {discountData.product.price.toLocaleString()} VNĐ
                                </Typography>
                                {discountData.discountRate > 0 && (
                                    <Typography variant="body1" color="primary">
                                        {(
                                            discountData.product.price * (1 - discountData.discountRate / 100 || 0)
                                        ).toLocaleString()}{' '}
                                        VNĐ
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Tỷ lệ giảm giá (%)"
                            fullWidth
                            value={discountData.discountRate}
                            onChange={(e) => setDiscountData({ ...discountData, discountRate: e.target.value })}
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

                    <Grid item xs={12}>
                        <TextField
                            label="Ngày bắt đầu"
                            fullWidth
                            value={discountData.startDate}
                            onChange={(e) => setDiscountData({ ...discountData, startDate: e.target.value })}
                            variant="outlined"
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Ngày kết thúc"
                            fullWidth
                            value={discountData.endDate}
                            onChange={(e) => setDiscountData({ ...discountData, endDate: e.target.value })}
                            variant="outlined"
                            type="datetime-local"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={discountData.active}
                                    onChange={(e) => setDiscountData({ ...discountData, active: e.target.checked })}
                                    name="active"
                                />
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
