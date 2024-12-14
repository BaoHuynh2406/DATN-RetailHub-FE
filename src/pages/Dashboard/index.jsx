import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { axiosSecure } from '@/config/axiosInstance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// Import các component con
import InvoiceCard from './InvoiceCard';
import CustomerCard from './Customer';
import RevenueCard from './RevenueCard';
import TopSellingProducts from './TopSellingProducts'; // Import component TopSellingProducts
import { Margin, Padding } from '@mui/icons-material';

function Dashboard() {
    const [ordersToday] = useState(120);
    const [ordersYesterday] = useState(100);
    const [customersToday] = useState(80);
    const [customersYesterday] = useState(70);
    const [revenueToday] = useState(5000000);
    const [revenueYesterday] = useState(4500000);

    // Dữ liệu cho biểu đồ doanh thu và lợi nhuận
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const year = 2024; // Ví dụ bạn muốn lấy dữ liệu cho năm 2024
                const response = await axiosSecure.get(`/api/thong-ke/revenue-by-year?year=${year}`);
                
                if (response?.data?.data) {
                    // Chuyển đổi dữ liệu trả về thành định dạng phù hợp với biểu đồ
                    const formattedData = response.data.data.map(item => ({
                        name: `Tháng ${item.month}`,
                        doanhThu: item.revenue,
                        loiNhuan: item.profit
                    }));
                    setSalesData(formattedData);
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };

        fetchSalesData(); // Gọi API khi component được render
    }, []);

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

    // Hàm định dạng tiền tệ
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

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
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={salesData} barCategoryGap="10%"
                        margin={{ left: 50, right: 30, top: 20, bottom: 20 }}  // Thêm margin cho toàn bộ biểu đồ
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis
                               interval="preserveStartEnd"
                               tickFormatter={(value) => formatCurrency(value)}
                               style={{ paddingLeft: '10px' }}  // Thêm khoảng cách cho trục Y
                               tick={{ fontSize: 12 }}  // Điều chỉnh kích thước font
                           />
                            <Tooltip formatter={(value) => formatCurrency(value)} /> {/* Định dạng tiền tệ trong Tooltip */}
                            <Legend />
                            <Bar dataKey="doanhThu" fill="#8884d8" name="Doanh thu" />
                            <Bar dataKey="loiNhuan" fill="#82ca9d" name="Lợi nhuận" />
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>

                <TopSellingProducts /> {/* Sử dụng component TopSellingProducts */}
            </Box>
        </Box>
    );
}

export default Dashboard;
