import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Container, Typography, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchPointHistoryAsync } from '@/redux/Customer/pointHistorySlice';

export default function HistoryPointList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pointHistory = useSelector((state) => state.pointHistory?.data || []);
    const loading = useSelector((state) => state.pointHistory?.loading || false);
    const error = useSelector((state) => state.pointHistory?.error || null);

    const [showOnlyEarned, setShowOnlyEarned] = useState(false);

    useEffect(() => {
        const customerId = 1; // Thay thế bằng ID khách hàng động
        const page = 1;
        const size = 10;
        dispatch(fetchPointHistoryAsync({ customerId, page, size }));
    }, [dispatch]);

    const columns = useMemo(
        () => [
            { field: 'transactionId', headerName: 'Mã giao dịch', width: 150 },
            { field: 'transactionDate', headerName: 'Ngày giao dịch', width: 180 },
            { field: 'points', headerName: 'Điểm', width: 120 },
            {
                field: 'transactionType',
                headerName: 'Loại giao dịch',
                width: 180,
                renderCell: (params) => (params.value === 'earn' ? 'Tích điểm' : 'Đổi điểm'),
            },
            { field: 'description', headerName: 'Mô tả', width: 300 },
        ],
        [],
    );

    const handleToggleEarned = (event) => {
        setShowOnlyEarned(event.target.checked);
    };

    return (
        <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={3}>
                <Typography
                    variant="h4"
                    component="h2"
                    fontWeight="bold"
                    color={showOnlyEarned ? '#2e7d32' : '#ab003c'}
                >
                    {showOnlyEarned ? 'LỊCH SỬ TÍCH ĐIỂM' : 'LỊCH SỬ ĐỔI ĐIỂM'}
                </Typography>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => navigate('/customer')}
                >
                    Quay lại
                </Button>
            </Box>

            <Box sx={{ height: 500, overflow: 'auto' }}>
                {loading && <Typography>Đang tải dữ liệu...</Typography>}
                {error && <Typography>Có lỗi xảy ra: {error}</Typography>}
                {!loading && !error && pointHistory.length > 0 && (
                    // Thêm component lưới dữ liệu của bạn ở đây, sử dụng `pointHistory` làm nguồn dữ liệu
                    <Typography>Dữ liệu đã tải xong!</Typography>
                )}
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
                <Box display="flex" alignItems="center">
                    <Typography variant="body1" component="span" marginRight={1} color="secondary">
                        Chỉ hiển thị giao dịch tích điểm
                    </Typography>
                    <Switch checked={showOnlyEarned} onChange={handleToggleEarned} color="primary" />
                </Box>
                <Button variant="contained" onClick={() => console.log('Export to Excel')}>
                    Xuất Excel
                </Button>
            </Box>
        </Container>
    );
}
