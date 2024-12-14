import React, { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { axiosSecure } from "@/config/axiosInstance";

function TopSellingProducts() {
    const [topSellingProducts, setTopSellingProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hàm gọi API để lấy sản phẩm bán chạy
    const fetchTopSellingProducts = async () => {
        try {
            const response = await axiosSecure.get('/api/thong-ke/invoice-SalesVolumeStatistics', {
                params: {
                    startDate: '2024-01-01',
                    endDate: '2024-12-31',
                    sort: 'productName', // Hoặc 'desc' tùy theo yêu cầu
                },
            });

            setTopSellingProducts(response?.data?.data || []);
        } catch (error) {
            setError('Không thể tải dữ liệu sản phẩm');
        } finally {
            setLoading(false);
        }
    };

    // Gọi API khi component mount
    useEffect(() => {
        fetchTopSellingProducts();
    }, []);

    // Nếu đang tải hoặc có lỗi
    if (loading) {
        return <Typography variant="body1">Đang tải dữ liệu...</Typography>;
    }

    if (error) {
        return <Typography variant="body1" color="error">{error}</Typography>;
    }

    return (
        <Paper sx={{ p: 3, flex: '1 1 30%' }}>
            <Typography variant="h6" sx={{ color: '#34495E', paddingBottom:'20px' }}>
                Top mặt hàng bán chạy
            </Typography>

            {topSellingProducts.map((product, index) => (
                <Box key={index} mb={2}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {product.productName}
                    </Typography>

                    {/* Thanh tiến độ hiển thị tỷ lệ phần trăm */}
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1} height={8} bgcolor="#e0e0e0" borderRadius={4}>
                            <Box
                                sx={{
                                    width: `${(product.quantitySold / 1000) * 100}%`, // Tính tỷ lệ phần trăm dựa trên số lượng bán được
                                    height: '100%',
                                    bgcolor: `hsl(${(product.quantitySold / 1000) * 120}, 100%, 50%)`, // Tạo màu thanh dựa trên tỷ lệ phần trăm
                                    borderRadius: 4,
                                }}
                            />
                        </Box>
                        <Typography variant="body2" sx={{ ml: 1 }}>
                            {product.quantitySold} sản phẩm
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Paper>
    );
}

export default TopSellingProducts;
