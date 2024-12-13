import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { axiosSecure } from '@/config/axiosInstance';

function InvoiceCard() {
    const [numOfInvoice, setNumOfInvoice] = useState(0);

    useEffect(() => {
        const fetchdata = async () => {
            const r = await axiosSecure.get('/api/thong-ke/invoice-count-by-date-and-paid', {
                params: {
                    invoiceDate: '2024-12-13',
                },
            });

            setNumOfInvoice(r.data.data);
        };

        fetchdata();
    }, []);

    const renderArrow = (growth) => {
        return growth > 0 ? <TrendingUpIcon color="success" /> : <TrendingDownIcon color="error" />;
    };

    const growthStyle = (growth) => ({
        color: growth > 0 ? '#28a745' : growth < 0 ? '#dc3545' : '#6c757d',
        fontWeight: 'bold',
        fontSize: '1.2rem',
    });

    //gọi api lấy giữ liệu đơn hàng hôm nay
    return (
        <>
            <Paper sx={{ p: 3, flex: '1 1 30%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShoppingCartIcon color="primary" fontSize="large" sx={{ mr: 2 }} />
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="h6" sx={{ color: '#34495E', fontWeight: 'bold' }}>
                        Đơn hàng hôm nay
                    </Typography>
                    <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                        {numOfInvoice}
                    </Typography>
                    <Typography color="textSecondary" display="flex" alignItems="center">
                        {' '}
                        <Box sx={growthStyle(5)}>{5}%</Box>
                    </Typography>
                </Box>
            </Paper>
        </>
    );
}

export default InvoiceCard;
