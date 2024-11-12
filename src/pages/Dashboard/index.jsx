import React, { useState } from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// Dữ liệu giả lập cho biểu đồ
const salesData = [
    { name: 'Tháng 1', doanhThu: 2400, lợiNhuận: 1400 },
    { name: 'Tháng 2', doanhThu: 3200, lợiNhuận: 2000 },
    { name: 'Tháng 3', doanhThu: 4300, lợiNhuận: 2800 },
    { name: 'Tháng 4', doanhThu: 2100, lợiNhuận: 1200 },
];

// Dữ liệu mẫu cho top mặt hàng bán chạy
const topSellingProducts = [
    { name: 'Sản phẩm A', percent: 35 },
    { name: 'Sản phẩm B', percent: 25 },
    { name: 'Sản phẩm C', percent: 20 },
    { name: 'Sản phẩm D', percent: 15 },
    { name: 'Sản phẩm E', percent: 5 },
];

function Dashboard() {
    // Dữ liệu hàng ngày và dữ liệu của ngày hôm trước
    const [ordersToday, setOrdersToday] = useState(120);
    const [ordersYesterday, setOrdersYesterday] = useState(100);

    const [customersToday, setCustomersToday] = useState(80);
    const [customersYesterday, setCustomersYesterday] = useState(70);

    const [revenueToday, setRevenueToday] = useState(5000000);
    const [revenueYesterday, setRevenueYesterday] = useState(4500000);

    // Hàm tính phần trăm tăng trưởng
    const calculateGrowth = (today, yesterday) => {
        return yesterday > 0 ? (((today - yesterday) / yesterday) * 100).toFixed(1) : '0';
    };

    // Tính phần trăm tăng trưởng
    const orderGrowth = calculateGrowth(ordersToday, ordersYesterday);
    const customerGrowth = calculateGrowth(customersToday, customersYesterday);
    const revenueGrowth = calculateGrowth(revenueToday, revenueYesterday);

    // Hàm để render mũi tên lên hoặc xuống tùy vào sự thay đổi
    const renderArrow = (growth) => {
        if (growth > 0) {
            return <TrendingUpIcon color="success" />;
        } else if (growth < 0) {
            return <TrendingDownIcon color="error" />;
        } else {
            return <TrendingUpIcon color="disabled" />;
        }
    };

    // Hàm để áp dụng màu sắc cho phần trăm tăng trưởng
    const growthStyle = (growth) => {
        if (growth > 0) {
            return { color: '#28a745', fontWeight: 'bold', fontSize: '1.2rem' };
        } else if (growth < 0) {
            return { color: '#dc3545', fontWeight: 'bold', fontSize: '1.2rem' };
        } else {
            return { color: '#6c757d', fontWeight: 'bold', fontSize: '1.2rem' };
        }
    };

    return (
        <Box p={3} bgcolor="#f4f6f8">
            {/* Các ô thông tin */}
            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 3,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 2,
                            boxShadow: 3,
                            height: '100%',
                        }}
                    >
                        <ShoppingCartIcon color="primary" fontSize="large" sx={{ marginRight: 2 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ color: '#34495E', fontWeight: 'bold' }}>
                                Đơn hàng hôm nay
                            </Typography>
                            <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                                {ordersToday}
                            </Typography>
                            <Typography color="textSecondary" variant="body2" display="flex" alignItems="center">
                                {renderArrow(orderGrowth)}
                                <Box sx={growthStyle(orderGrowth)}>{orderGrowth}%</Box>
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 3,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center', 
                            borderRadius: 2,
                            boxShadow: 3,
                            height: '100%',
                        }}
                    >
                        <PeopleIcon color="secondary" fontSize="large" sx={{ marginRight: 2 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ color: '#34495E', fontWeight: 'bold' }}>
                                Khách hàng mới
                            </Typography>
                            <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                                {customersToday}
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                <Box sx={growthStyle(customerGrowth)}>+{customerGrowth}% so với hôm qua</Box>
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 3,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center', 
                            borderRadius: 2,
                            boxShadow: 3,
                            height: '100%',
                        }}
                    >
                        <AttachMoneyIcon color="success" fontSize="large" sx={{ marginRight: 2 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ color: '#34495E', fontWeight: 'bold' }}>
                                Doanh thu hôm nay
                            </Typography>
                            <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                                {revenueToday.toLocaleString()} VND
                            </Typography>
                            <Typography color="textSecondary" variant="body2" display="flex" alignItems="center">
                                {renderArrow(revenueGrowth)}
                                <Box sx={growthStyle(revenueGrowth)}>{revenueGrowth}%</Box>
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* Bố cục Biểu đồ và Top mặt hàng bán chạy */}
            <Grid container spacing={3}>
                {/* Biểu đồ doanh thu */}
                <Grid item xs={12} md={8}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 3,
                            borderRadius: 2,
                            boxShadow: 3,
                            height: '100%',
                        }}
                    >
                        <Typography variant="h6" mb={2} sx={{ color: '#34495E' }}>
                            Biểu đồ doanh thu và lợi nhuận theo tháng
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="doanhThu" fill="#8884d8" name="Doanh thu" />
                                <Bar dataKey="lợiNhuận" fill="#82ca9d" name="Lợi nhuận" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Top mặt hàng bán chạy */}
                <Grid item xs={12} md={4}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 3,
                            borderRadius: 2,
                            boxShadow: 3,
                            height: '100%',
                        }}
                    >
                        <Typography variant="h6" sx={{ color: '#34495E' }}>
                            Top mặt hàng bán chạy
                        </Typography>
                        {topSellingProducts.map((product, index) => (
                            <Box key={index} mb={2}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    {product.name}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {/* Thanh đường cho phần trăm bán chạy */}
                                    <Box sx={{ flexGrow: 1, height: 8, backgroundColor: '#e0e0e0', borderRadius: 4 }}>
                                        <Box
                                            sx={{
                                                width: `${product.percent}%`,
                                                height: '100%',
                                                backgroundColor: `hsl(${(product.percent * 120) / 100}, 100%, 50%)`, // Màu thay đổi theo phần trăm
                                                borderRadius: 4,
                                                transition: 'all 0.3s ease-in-out',
                                            }}
                                        />
                                    </Box>
                                    <Typography variant="body2" sx={{ marginLeft: 1 }}>
                                        {product.percent}%
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;
