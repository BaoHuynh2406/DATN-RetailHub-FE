import React, { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
//
import InvoiceCard from './InvoiceCard';
import CustomerCard from './Customer';
import RevenueCard from './RevenueCard';

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
    const [ordersToday] = useState(120);
    const [ordersYesterday] = useState(100);

    const [customersToday] = useState(80);
    const [customersYesterday] = useState(70);

    const [revenueToday] = useState(5000000);
    const [revenueYesterday] = useState(4500000);

    const calculateGrowth = (today, yesterday) => {
        return yesterday > 0 ? (((today - yesterday) / yesterday) * 100).toFixed(1) : '0';
    };

    const orderGrowth = calculateGrowth(ordersToday, ordersYesterday);
    const customerGrowth = calculateGrowth(customersToday, customersYesterday);
    const revenueGrowth = calculateGrowth(revenueToday, revenueYesterday);

    const renderArrow = (growth) => {
        return growth > 0 ? <TrendingUpIcon color="success" /> : <TrendingDownIcon color="error" />;
    };

    const growthStyle = (growth) => ({
        color: growth > 0 ? '#28a745' : growth < 0 ? '#dc3545' : '#6c757d',
        fontWeight: 'bold',
        fontSize: '1.2rem',
    });

    return (
        <Box p={3} bgcolor="#f4f6f8">
            <Box display="flex" flexWrap="wrap" gap={3} mb={4}>
                <InvoiceCard />

                <CustomerCard/>

                <RevenueCard/>
            </Box>

            <Box display="flex" flexWrap="wrap" gap={3}>
                <Paper sx={{ p: 3, flex: '1 1 65%', display: 'flex', flexDirection: 'column' }}>
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

                <Paper sx={{ p: 3, flex: '1 1 30%' }}>
                    <Typography variant="h6" sx={{ color: '#34495E' }}>
                        Top mặt hàng bán chạy
                    </Typography>
                    {topSellingProducts.map((product, index) => (
                        <Box key={index} mb={2}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                {product.name}
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
                </Paper>
            </Box>
        </Box>
    );
}

export default Dashboard;
