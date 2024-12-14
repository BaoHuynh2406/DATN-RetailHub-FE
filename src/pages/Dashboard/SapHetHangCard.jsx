import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, CircularProgress, Avatar } from '@mui/material';
import { axiosSecure } from '@/config/axiosInstance';
import WarningIcon from '@mui/icons-material/Warning';

function HetHang() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Gọi API lấy danh sách sản phẩm sắp hết hàng
                const response = await axiosSecure.get('/api/thong-ke/lowest-inventory-products');
                if (response.data.code === 200) {
                    setProducts(response.data.data);
                } else {
                    console.error('Error fetching products:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching revenue data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Paper sx={{ p: 3, flex: '1 1 35%' }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h6" sx={{ color: '#34495E', fontWeight: 'bold', mb: 2 }}>
                    Sản phẩm sắp hết hàng
                </Typography>
                <Box
                    sx={{
                        height: '400px',
                        overflow: 'auto',
                    }}
                >
                    {loading ? (
                        <CircularProgress />
                    ) : products.length > 0 ? (
                        products.map((product, index) => (
                            <Box
                                key={product.productId}
                                display="flex"
                                alignItems="center"
                                mb={2}
                                p={1}
                                borderBottom="1px solid #e0e0e0"
                                width="100%"
                            >
                                {/* Ảnh sản phẩm */}
                                <Avatar
                                    src={product.image}
                                    alt={product.productName}
                                    sx={{ width: 48, height: 48, mr: 2 }}
                                />

                                {/* Thông tin sản phẩm */}
                                <Box flex="1">
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                        {product.productName}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                                        Tồn kho: {product.inventoryCount} {product.unit}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                                        Hạn dùng: {new Date(product.expiryDate).toLocaleDateString()}
                                    </Typography>
                                </Box>

                                {/* Icon cảnh báo */}
                                <WarningIcon color="error" />
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                            Không có sản phẩm nào sắp hết hàng.
                        </Typography>
                    )}
                </Box>
            </Box>
        </Paper>
    );
}

export default HetHang;
