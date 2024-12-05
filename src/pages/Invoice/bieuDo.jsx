import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { axiosSecure, axiosPublic } from '@/config/axiosInstance';
import CircularProgress from '@mui/material/CircularProgress';

// Extend Day.js
dayjs.extend(weekOfYear);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

function convertCheckboxValuesToString(ck) {
    return Object.keys(ck)
        .filter((key) => ck[key])
        .join(',');
}

const formatDateForApi = (isoDate) => {
    return dayjs(isoDate).format('YYYY-MM-DD');
};

// Format number utility
const formatNumber = (value) => {
    if (value >= 1e12) return `${(value / 1e12).toLocaleString()}T`; // Trillion
    if (value >= 1e9) return `${(value / 1e9).toLocaleString()}B`; // Billion
    if (value >= 1e6) return `${(value / 1e6).toLocaleString()}M`; // Million
    if (value >= 1e3) return `${(value / 1e3).toLocaleString()}K`; // Thousand
    return value.toLocaleString();
};

// Component
function BieuDo({ invoiceDays, checkboxValues, startDate, endDate, viewMode }) {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axiosSecure.get('/api/v2/invoice/chart-data', {
                    params: {
                        startDate: formatDateForApi(startDate),
                        endDate: formatDateForApi(endDate),
                        status: convertCheckboxValuesToString(checkboxValues),
                    },
                });

                // Đảm bảo `response.data` tồn tại và trích xuất `data`
                const invoices = response.data?.data;

                if (Array.isArray(invoices)) {
                    const processedData = invoices.reduce((acc, item) => {
                        const date = dayjs(item.invoiceDate).format('DD/MM/YYYY');
                        const status = item.status;
                        const finalTotal = item.finalTotal;

                        if (!acc[date]) {
                            acc[date] = {
                                date,
                                PENDING: 0,
                                PAID: 0,
                                RETURN: 0,
                                PENDING_TOTAL: 0,
                                PAID_TOTAL: 0,
                                RETURN_TOTAL: 0,
                            };
                        }

                        acc[date][status] += 1; // Tăng số lượng hóa đơn theo trạng thái
                        acc[date][`${status}_TOTAL`] += finalTotal; // Tổng tiền theo trạng thái

                        return acc;
                    }, {});

                    // Sắp xếp dữ liệu theo ngày
                    const sortedData = Object.values(processedData).sort((a, b) =>
                        dayjs(a.date, 'DD/MM/YYYY').diff(dayjs(b.date, 'DD/MM/YYYY')),
                    );

                    setChartData(sortedData);
                } else {
                    console.error('Expected an array in response.data.data but got:', typeof invoices);
                    setError('Dữ liệu trả về không hợp lệ.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Lỗi khi tải dữ liệu.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [startDate, endDate, checkboxValues]);

    if (loading)
        return (
            <Box
                flex={7}
                sx={{
                    minWidth: '300px',
                    height: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CircularProgress />
            </Box>
        );
    if (error)
        return (
            <Box
                flex={7}
                sx={{
                    minWidth: '300px',
                    height: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {error}
            </Box>
        );

    return (
        <Box
            flex={7}
            sx={{
                minWidth: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
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
                            color: '#ffa500',
                        },
                        checkboxValues.PAID && {
                            data:
                                viewMode === 'quantity'
                                    ? chartData.map((item) => item.PAID)
                                    : chartData.map((item) => item.PAID_TOTAL),
                            label: 'Đã thanh toán',
                            color: '#008000',
                        },
                        checkboxValues.RETURN && {
                            data:
                                viewMode === 'quantity'
                                    ? chartData.map((item) => item.RETURN)
                                    : chartData.map((item) => item.RETURN_TOTAL),
                            label: 'Đổi trả',
                            color: '#d32f2f',
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
                            color: '#ffa500',
                        },
                        checkboxValues.PAID && {
                            data:
                                viewMode === 'quantity'
                                    ? chartData.map((item) => item.PAID)
                                    : chartData.map((item) => item.PAID_TOTAL),
                            label: 'Đã thanh toán',
                            color: '#008000',
                        },
                        checkboxValues.RETURN && {
                            data:
                                viewMode === 'quantity'
                                    ? chartData.map((item) => item.RETURN)
                                    : chartData.map((item) => item.RETURN_TOTAL),
                            label: 'Đổi trả',
                            color: '#d32f2f',
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
    );
}

export default BieuDo;
