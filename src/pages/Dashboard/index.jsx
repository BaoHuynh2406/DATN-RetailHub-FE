import React, { useState, useEffect } from 'react';
import { Box, Divider, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { axiosSecure } from '@/config/axiosInstance';
import { useSelector } from 'react-redux';

// Import các component con
import InvoiceCard from './InvoiceCard';
import CustomerCard from './Customer';
import RevenueCard from './RevenueCard';
import TopSellingProducts from './TopSellingProducts';
import SapHetHangCard from './SapHetHangCard';
import ExpiryLessThan30Days from './ExpiryLessThan30Days';

function Dashboard() {
    const { data } = useSelector((state) => state.userCurrent);
    const [isAdmin, setIsAdmin] = useState(true);
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        if (data?.role) {
            setIsAdmin(data.role.roleId !== 'SC');
        }
    }, [data]);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const year = new Date().getFullYear();
                const response = await axiosSecure.get(`/api/thong-ke/revenue-by-year?year=${year}`);
                const formattedData =
                    response?.data?.data?.map((item) => ({
                        name: `Tháng ${item.month}`,
                        doanhThu: item.revenue,
                        loiNhuan: item.profit,
                    })) || [];
                setSalesData(formattedData);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };
        fetchSalesData();
    }, []);

    const formatCurrency = (amount) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

    return (
        <Box p={3} bgcolor="#f4f6f8">
            {isAdmin && (
                <>
                    <Box display="flex" flexWrap="wrap" gap={3} mb={4}>
                        <InvoiceCard />
                        <CustomerCard />
                        <RevenueCard />
                    </Box>
                    <Box display="flex" flexWrap="wrap" mb={3} gap={3}>
                        <Paper sx={{ p: 3, flex: '1 1 65%', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" mb={2} sx={{ color: '#34495E' }}>
                                Biểu đồ doanh thu và lợi nhuận theo tháng
                            </Typography>
                            {salesData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={350}>
                                    <BarChart data={salesData} barCategoryGap="10%">
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis tickFormatter={(value) => formatCurrency(value)} />
                                        <Tooltip formatter={(value) => formatCurrency(value)} />
                                        <Legend />
                                        <Bar dataKey="doanhThu" fill="#8884d8" name="Doanh thu" />
                                        <Bar dataKey="loiNhuan" fill="#82ca9d" name="Lợi nhuận" />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <Typography variant="body2" color="textSecondary">
                                    Không có dữ liệu để hiển thị biểu đồ.
                                </Typography>
                            )}
                        </Paper>
                        <TopSellingProducts />
                    </Box>
                    <Divider sx={{ my: 4 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            KHO HÀNG
                        </Typography>
                    </Divider>
                </>
            )}
            <Box display="flex" flexWrap="wrap" gap={3}>
                <SapHetHangCard />
                <ExpiryLessThan30Days />
            </Box>
        </Box>
    );
}

export default Dashboard;
