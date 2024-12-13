import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import { axiosSecure } from '@/config/axiosInstance';

function CustomerCard() {
    const [totalCustomers, setTotalCustomers] = useState(0);

    useEffect(() => {
        const fetchTotalCustomers = async () => {
            try {
                const response = await axiosSecure.get('/api/thong-ke/active-customer-count');
                setTotalCustomers(response?.data?.data || 0);
            } catch (error) {
                console.error('Error fetching total customer count:', error);
            }
        };

        fetchTotalCustomers();
    }, []);

    return (
        <Paper sx={{ p: 3, flex: '1 1 30%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PeopleIcon color="secondary" fontSize="large" sx={{ mr: 2 }} />
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h6" sx={{ color: '#34495E', fontWeight: 'bold' }}>
                    Khách hàng
                </Typography>
                <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                    {totalCustomers}
                </Typography>
                <Typography sx={{ color: 'transparent', fontWeight: 'bold' }}>
                    Đây là dòng chữ màu trong suốt
                </Typography>
            </Box>
        </Paper>
    );
}

export default CustomerCard;
