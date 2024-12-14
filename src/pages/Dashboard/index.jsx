import React, { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// Import các component con
import InvoiceCard from './InvoiceCard';
import CustomerCard from './Customer';
import RevenueCard from './RevenueCard';
import TopSellingProducts from './TopSellingProducts'; // Import component TopSellingProducts

// Dữ liệu giả lập cho biểu đồ
const salesData = [
    { name: 'Tháng 1', doanhThu: 2400, lợiNhuận: 1400 },
    { name: 'Tháng 2', doanhThu: 3200, lợiNhuận: 2000 },
    { name: 'Tháng 3', doanhThu: 4300, lợiNhuận: 2800 },
    { name: 'Tháng 4', doanhThu: 2100, lợiNhuận: 1200 },
];

function Dashboard() {
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
                <CustomerCard />
                <RevenueCard />
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
                <TopSellingProducts /> {/* Sử dụng component TopSellingProducts */}
            </Box>

            <Box marginY={4} display="flex" flexWrap="wrap" gap={3}>
                <TopSellingProducts /> {/* Sử dụng component TopSellingProducts */}
                <Paper sx={{ p: 3, flex: '1 1 65%', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" mb={2} sx={{ color: '#34495E' }}>
                        Sản phẩm sắp hết hàng
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
            </Box>
        </Box>
    );
}

export default Dashboard;
