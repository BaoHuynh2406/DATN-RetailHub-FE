import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import dayjs from 'dayjs';
import { axiosSecure } from '@/config/axiosInstance';

function RevenueCard() {
    const [revenueToday, setRevenueToday] = useState(0);
    const [revenueYesterday, setRevenueYesterday] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const today = dayjs().format('YYYY-MM-DD');
            const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');

            try {
                const [todayResponse, yesterdayResponse] = await Promise.all([
                    axiosSecure.get('/api/thong-ke/revenue-by-date-and-paid', {
                        params: { date: today },
                    }),
                    axiosSecure.get('/api/thong-ke/revenue-by-date-and-paid', {
                        params: { date: yesterday },
                    }),
                ]);

                setRevenueToday(todayResponse.data.data);
                setRevenueYesterday(yesterdayResponse.data.data);
            } catch (error) {
                console.error('Error fetching revenue data:', error);
            }
        };

        fetchData();
    }, []);

    const calculateGrowth = (today, yesterday) => {
        return yesterday > 0 ? (((today - yesterday) / yesterday) * 100).toFixed(1) : '0';
    };

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
        <Paper sx={{ p: 3, flex: '1 1 30%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AttachMoneyIcon color="success" fontSize="large" sx={{ mr: 2 }} />
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h6" sx={{ color: '#34495E', fontWeight: 'bold' }}>
                    Doanh thu hôm nay
                </Typography>
                <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                    {revenueToday.toLocaleString()} VND
                </Typography>
                <Typography color="textSecondary" display="flex" alignItems="center">
                    {renderArrow(revenueGrowth)}
                    <Box sx={growthStyle(revenueGrowth)}>{revenueGrowth}% so với hôm qua</Box>
                </Typography>
            </Box>
        </Paper>
    );
}

export default RevenueCard;
