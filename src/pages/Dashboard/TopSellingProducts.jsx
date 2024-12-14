import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { axiosSecure } from '@/config/axiosInstance';

function TopSellingProducts() {
    const [topSellingProducts, setTopSellingProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopSellingProducts = async () => {
            try {
                const response = await axiosSecure.get('/api/thong-ke/invoice-SalesVolumeStatistics', {
                    params: {
                        startDate: '2024-01-01', 
                        endDate: '2024-12-31',
                        sort: 'productName  ',
                    },
                });
                
                // Xử lý dữ liệu trả về (giả sử trả về một mảng)
                setTopSellingProducts(response?.data?.data || []);
                setLoading(false);
            } catch (error) {
                setError('Không thể tải dữ liệu sản phẩm');
                setLoading(false);
            }
        };

        fetchTopSellingProducts();
    }, []);

    if (loading) {
        return <Typography variant="body1">Đang tải dữ liệu...</Typography>;
    }

    if (error) {
        return <Typography variant="body1" color="error">{error}</Typography>;
    }

    return (
        <Paper sx={{ p: 3, flex: '1 1 30%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingCartIcon color="secondary" fontSize="large" sx={{ mr: 2 }} />
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h6" sx={{ color: '#34495E', fontWeight: 'bold' }}>
                    Sản phẩm bán chạy
                </Typography>
                {topSellingProducts.length > 0 ? (
                    <Box>
                        {topSellingProducts.map((product, index) => (
                            <Box key={index} mb={2}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    {product.name} - {product.percent}%
                                </Typography>
                                <Box display="flex" alignItems="center">
                                    <Box flexGrow={1} height={8} bgcolor="#e0e0e0" borderRadius={4}>
                                        <Box
                                            sx={{
                                                width: `${product.percent}%`,
                                                height: '100%',
                                                bgcolor: `hsl(${(product.percent * 120) / 100}, 100%, 50%)`,
                                                borderRadius: 4,
                                            }}
                                        />
                                    </Box>
                                    <Typography variant="body2" sx={{ ml: 1 }}>
                                        {product.percent}%
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Typography variant="body1" color="error">Không có sản phẩm bán chạy</Typography>
                )}
            </Box>
        </Paper>
    );
}

export default TopSellingProducts;
