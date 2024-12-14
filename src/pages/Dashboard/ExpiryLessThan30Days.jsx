import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, CircularProgress, Avatar, Chip } from '@mui/material';
import { axiosSecure } from '@/config/axiosInstance';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function ExpiryLessThan30Days() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosSecure.get('/api/thong-ke/ExpiryLessThan30Days');
                if (response.data.code === 200) {
                    setProducts(response.data.data);
                } else {
                    setError(true);
                    console.error('API Error:', response.data.message);
                }
            } catch (err) {
                setError(true);
                console.error('Fetch Error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const calculateDaysLeft = (expiryDate) => {
        const now = new Date();
        const expiry = new Date(expiryDate);
        const diffTime = expiry - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <Paper sx={{ p: 3, flex: '1 1 50%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ color: '#34495E', fontWeight: 'bold', textAlign: 'center' }}>
                Sản phẩm gần hết hạn sử dụng
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography variant="body2" sx={{ color: 'red', textAlign: 'center' }}>
                    Đã xảy ra lỗi khi tải dữ liệu.
                </Typography>
            ) : products.length === 0 ? (
                <Typography variant="body2" sx={{ color: '#7f8c8d', textAlign: 'center' }}>
                    Không có sản phẩm nào gần hết hạn sử dụng.
                </Typography>
            ) : (
                <Box
                    sx={{
                        height: '400px',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    {products.map((product) => {
                        const daysLeft = calculateDaysLeft(product.expiryDate);
                        const isExpired = daysLeft < 0;

                        return (
                            <Box
                                key={product.productId}
                                display="flex"
                                alignItems="center"
                                p={2}
                                borderRadius="12px"
                                boxShadow="0px 4px 12px rgba(0,0,0,0.1)"
                                bgcolor={isExpired ? '#ffe5e5' : daysLeft <= 7 ? '#fff7e6' : '#f6f9fc'}
                            >
                                {/* Ảnh sản phẩm */}
                                <Avatar
                                    src={product.image}
                                    alt={product.productName}
                                    sx={{ width: 80, height: 80, mr: 3 }}
                                />

                                {/* Thông tin sản phẩm */}
                                <Box flex="1">
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                        {product.productName}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                                        Hạn dùng: {new Date(product.expiryDate).toLocaleDateString('vi-VN')}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                                        Tồn kho: {product.inventoryCount} {product.unit}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                                        Vị trí: {product.location}
                                    </Typography>
                                </Box>

                                {/* Trạng thái ngày */}
                                <Chip
                                    label={
                                        isExpired
                                            ? 'Đã hết hạn'
                                            : daysLeft === 0
                                            ? 'Hết hạn hôm nay'
                                            : `${daysLeft} ngày còn lại`
                                    }
                                    color={isExpired ? 'error' : daysLeft <= 7 ? 'warning' : 'primary'}
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem',
                                        p: 1,
                                        textTransform: 'uppercase',
                                    }}
                                />

                                {/* Icon cảnh báo */}
                                {isExpired ? (
                                    <WarningIcon color="error" sx={{ ml: 2 }} />
                                ) : (
                                    <CheckCircleIcon color="success" sx={{ ml: 2 }} />
                                )}
                            </Box>
                        );
                    })}
                </Box>
            )}
        </Paper>
    );
}

export default ExpiryLessThan30Days;
