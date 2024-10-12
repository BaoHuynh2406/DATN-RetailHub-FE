import { useState, useEffect } from 'react';
import { Box, Container, Typography, Select, MenuItem, Divider, FormControlLabel, Checkbox } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';

import TableCustom from '@/components/TableCustom';

dayjs.extend(weekOfYear);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const formatNumber = (value) => {
    if (value >= 1e12) {
        // Nếu lớn hơn hoặc bằng 1 tỷ
        return `${(value / 1e12).toLocaleString()}T`; // Tỷ
    } else if (value >= 1e9) {
        // Nếu lớn hơn hoặc bằng 1 triệu
        return `${(value / 1e9).toLocaleString()}B`; // Triệu
    } else if (value >= 1e6) {
        // Nếu lớn hơn hoặc bằng 1 triệu
        return `${(value / 1e6).toLocaleString()}m`; // Triệu
    } else if (value >= 1e3) {
        // Nếu lớn hơn hoặc bằng 1 nghìn
        return `${(value / 1e3).toLocaleString()}K`; // Nghìn
    }
    return value.toLocaleString(); // Trả về giá trị gốc
};

const generateMockData = (start, end) => {
    const data = [];
    const days = dayjs(end).diff(dayjs(start), 'day');

    for (let i = 0; i <= days; i++) {
        const date = dayjs(start).add(i, 'day').format('DD/MM/YYYY');
        const pendingAmount = Math.floor(Math.random() * 100);
        const paidAmount = Math.floor(Math.random() * 100);
        const returnAmount = Math.floor(Math.random() * 100);
        const pricePerInvoice = Math.floor(Math.random() * (100000 - 50000 + 1)) + 50000; // Giá hóa đơn dao động từ 50,000 đến 100,000

        data.push({
            date,
            PENDING: pendingAmount, // Số lượng hóa đơn đang thanh toán
            PAID: paidAmount, // Số lượng hóa đơn đã thanh toán
            RETURN: returnAmount, // Số lượng hóa đơn đổi trả
            PENDING_TOTAL: pendingAmount * pricePerInvoice, // Tổng tiền hóa đơn đang thanh toán
            PAID_TOTAL: paidAmount * pricePerInvoice, // Tổng tiền hóa đơn đã thanh toán
            RETURN_TOTAL: returnAmount * pricePerInvoice, // Tổng tiền hóa đơn đổi trả
        });
    }
    return data;
};

export default function Invoice() {
    const [invoiceDays, setInvoiceDays] = useState(1);
    const [viewMode, setViewMode] = useState('quantity'); // Chế độ xem: quantity hoặc total
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());
    const [checkboxValues, setCheckboxValues] = useState({
        PENDING: true,
        PAID: true,
        RETURN: false,
    });

    // Dữ liệu hóa đơn mẫu
    const [chartData, setChartData] = useState([]);

    const columns = [
        { field: 'customerId', headerName: 'Mã hóa đơn', width: 150 },
        { field: 'fullName', headerName: 'Mã nhân viên', width: 210 },
        { field: 'phoneNumber', headerName: 'Mã khách hàng', width: 170 },
        { field: 'points', headerName: 'SĐT Khách hàng', width: 150 },
        { field: 'pointss', headerName: 'Ngày lập hóa đơn', width: 150 },
        { field: 'pointsss', headerName: 'Số tiền', width: 150 },
        { field: 'pointssss', headerName: 'Trạng thái', width: 150 },
        {
            field: 'actions',
            headerName: 'Xem chi tiết',
            width: 150,
            renderCell: (params) => (
                <Box display="flex" justifyContent="left" alignItems="center" height="100%">
                    <IconButton color="primary" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];

    useEffect(() => {
        // Tạo dữ liệu mẫu dựa trên ngày đã chọn
        const data = generateMockData(startDate, endDate);
        setChartData(data);
    }, [startDate, endDate]);

    const handleChange = (event) => {
        setInvoiceDays(event.target.value);
        const value = event.target.value;

        let start, end;
        const today = dayjs();

        if (value === 1) {
            start = today.startOf('day');
            end = today.endOf('day');
        } else if (value === 7) {
            start = today.startOf('week');
            end = today.endOf('week');
        } else if (value === 30) {
            start = today.startOf('month');
            end = today.endOf('month');
        }

        setStartDate(start);
        setEndDate(end);
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        const isAtLeastOneChecked = Object.values(checkboxValues).filter((val) => val).length > 1;

        if (!isAtLeastOneChecked && !checked) {
            return;
        }

        setCheckboxValues((prevValues) => ({
            ...prevValues,
            [name]: checked,
        }));
    };

    return (
        <Container maxWidth="xl" sx={{ paddingTop: 2 }}>
            <Box display="flex" flexWrap="wrap" alignItems="center" marginBottom={1}>
                {/* Bộ lọc */}
                <Box
                    sx={{
                        backgroundColor: '#f2f2f2',
                        padding: 2,
                        borderRadius: 1,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    }}
                    flex={5}
                >
                    <Typography marginBottom={1} variant="h6" component="h3" fontWeight="bold" color="inherit">
                        BÁO CÁO ĐƠN HÀNG THEO:
                    </Typography>
                    <Box display="flex" alignItems="center" marginBottom={1}>
                        <Select id="filter-invoice-select" value={invoiceDays} onChange={handleChange}>
                            <MenuItem value={1}>Hôm nay</MenuItem>
                            <MenuItem value={7}>Tuần này</MenuItem>
                            <MenuItem value={30}>Tháng này</MenuItem>
                            <MenuItem value="custom">Tùy chỉnh</MenuItem>
                        </Select>

                        <Divider
                            sx={{
                                marginX: 2,
                            }}
                            orientation="vertical"
                            variant="middle"
                            flexItem
                        />

                        {invoiceDays === 'custom' ? (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Từ"
                                    value={startDate}
                                    onChange={(newValue) => setStartDate(newValue)}
                                />
                                <Divider
                                    sx={{
                                        marginX: 1,
                                        width: '5px',
                                    }}
                                />
                                <DatePicker label="Đến" value={endDate} onChange={(newValue) => setEndDate(newValue)} />
                            </LocalizationProvider>
                        ) : (
                            <Typography variant="body1">
                                {`Từ ${startDate.format('DD/MM/YYYY')} đến ${endDate.format('DD/MM/YYYY')}`}
                            </Typography>
                        )}
                    </Box>

                    <Box display="flex" alignItems="center">
                        <Typography
                            sx={{
                                marginRight: 2,
                            }}
                            fontWeight="bold"
                            id="demo-checkbox-group-label"
                        >
                            Loại hóa đơn:{' '}
                        </Typography>
                        <Box>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkboxValues.PENDING}
                                        onChange={handleCheckboxChange}
                                        name="PENDING"
                                    />
                                }
                                label="Đang thanh toán"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkboxValues.PAID}
                                        onChange={handleCheckboxChange}
                                        name="PAID"
                                    />
                                }
                                label="Đã thanh toán"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkboxValues.RETURN}
                                        onChange={handleCheckboxChange}
                                        name="RETURN"
                                    />
                                }
                                label="Đổi trả"
                            />
                        </Box>
                    </Box>

                    <Box display="flex" alignItems="center" marginY={2}>
                        <Typography
                            sx={{
                                marginRight: 2,
                            }}
                            fontWeight="bold"
                        >
                            Chế độ xem:{' '}
                        </Typography>
                        <Select value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
                            <MenuItem value="quantity">Số lượng hóa đơn</MenuItem>
                            <MenuItem value="total">Tổng tiền</MenuItem>
                        </Select>
                    </Box>
                </Box>
                {/* Biểu đồ */}
                {/* Biểu đồ số lượng hóa đơn */}
                <Box
                    flex={7}
                    sx={{
                        minWidth: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        minWidth: '300px',
                    }}
                >
                    {invoiceDays === 1 ? (
                        <BarChart
                            height={300}
                            series={[
                                checkboxValues.PENDING && {
                                    data:
                                        viewMode === 'quantity'
                                            ? chartData.map((item) => item.PENDING)
                                            : chartData.map((item) => item.PENDING_TOTAL),
                                    label: 'Đang thanh toán',
                                },
                                checkboxValues.PAID && {
                                    data:
                                        viewMode === 'quantity'
                                            ? chartData.map((item) => item.PAID)
                                            : chartData.map((item) => item.PAID_TOTAL),
                                    label: 'Đã thanh toán',
                                },
                                checkboxValues.RETURN && {
                                    data:
                                        viewMode === 'quantity'
                                            ? chartData.map((item) => item.RETURN)
                                            : chartData.map((item) => item.RETURN_TOTAL),
                                    label: 'Đổi trả',
                                },
                            ].filter(Boolean)}
                            xAxis={[{ scaleType: 'band', data: chartData.map((item) => item.date) }]}
                            yAxis={[
                                {
                                    valueFormatter: (value) => formatNumber(value),
                                },
                            ]}
                        />
                    ) : (
                        <LineChart
                            height={300}
                            series={[
                                checkboxValues.PENDING && {
                                    data:
                                        viewMode === 'quantity'
                                            ? chartData.map((item) => item.PENDING)
                                            : chartData.map((item) => item.PENDING_TOTAL),
                                    label: 'Đang thanh toán',
                                    color: '#bab0ab',
                                },
                                checkboxValues.PAID && {
                                    data:
                                        viewMode === 'quantity'
                                            ? chartData.map((item) => item.PAID)
                                            : chartData.map((item) => item.PAID_TOTAL),
                                    label: 'Đã thanh toán',
                                },
                                checkboxValues.RETURN && {
                                    data:
                                        viewMode === 'quantity'
                                            ? chartData.map((item) => item.RETURN)
                                            : chartData.map((item) => item.RETURN_TOTAL),
                                    label: 'Đổi trả',
                                    color: '#e15759',
                                },
                            ].filter(Boolean)}
                            xAxis={[{ scaleType: 'point', data: chartData.map((item) => item.date) }]}
                            yAxis={[
                                {
                                    valueFormatter: (value) => formatNumber(value),
                                },
                            ]}
                        />
                    )}
                </Box>
            </Box>

            {/* Danh sách hóa đơn */}
            <Divider />

            <Typography marginTop={4} marginBottom={2} variant="h6">
                Danh sách hóa đơn
            </Typography>

            <TableCustom columns={columns} rows={[]} stt={true} id="id" />
        </Container>
    );
}
