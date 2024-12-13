import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { axiosSecure } from '@/config/axiosInstance';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import dayjs from 'dayjs';

function InvoiceCard() {
    const [numOfInvoiceToday, setNumOfInvoiceToday] = useState(0);
    const [numOfInvoiceYesterday, setNumOfInvoiceYesterday] = useState(0);
    const [growth, setGrowth] = useState(0); // % tăng hoặc giảm

    useEffect(() => {
        const fetchData = async () => {
            const today = dayjs().format('YYYY-MM-DD');
            const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');

            try {
                // Gọi API cho hôm nay
                const todayResponse = await axiosSecure.get('/api/thong-ke/invoice-count-by-date-and-paid', {
                    params: {
                        invoiceDate: today,
                    },
                });
                setNumOfInvoiceToday(todayResponse.data.data);

                // Gọi API cho hôm qua
                const yesterdayResponse = await axiosSecure.get('/api/thong-ke/invoice-count-by-date-and-paid', {
                    params: {
                        invoiceDate: yesterday,
                    },
                });
                setNumOfInvoiceYesterday(yesterdayResponse.data.data);

                // Tính toán % tăng hoặc giảm
                const todayCount = todayResponse.data.data;
                const yesterdayCount = yesterdayResponse.data.data;

                const percentageChange =
                    yesterdayCount > 0
                        ? ((todayCount - yesterdayCount) / yesterdayCount) * 100
                        : todayCount > 0
                        ? 100
                        : 0;

                setGrowth(percentageChange);
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        };

        fetchData();
    }, []);

    const renderArrow = () => {
        return growth > 0 ? <TrendingUpIcon color="success" /> : <TrendingDownIcon color="error" />;
    };

    const growthStyle = {
        color: growth > 0 ? '#28a745' : growth < 0 ? '#dc3545' : '#6c757d',
        fontWeight: 'bold',
        fontSize: '1.2rem',
    };

    return (
        <>
            <Paper sx={{ p: 3, flex: '1 1 30%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShoppingCartIcon color="primary" fontSize="large" sx={{ mr: 2 }} />
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="h6" sx={{ color: '#34495E', fontWeight: 'bold' }}>
                        Đơn hàng hôm nay
                    </Typography>
                    <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                        {numOfInvoiceToday}
                    </Typography>
                    <Typography color="textSecondary" display="flex" alignItems="center">
                        {renderArrow()}
                        <Box sx={growthStyle}>
                            {growth.toFixed(2)}% so với hôm qua
                        </Box>
                    </Typography>
                </Box>
            </Paper>
        </>
    );
}

export default InvoiceCard;
