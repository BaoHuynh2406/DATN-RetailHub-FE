import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { useSelector } from 'react-redux';

// Extend Day.js
dayjs.extend(weekOfYear);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

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
    const { data, loading, error } = useSelector((state) => state.invoice);
    const [chartData, setChartData] = useState([]);

    // Process data for the chart
    useEffect(() => {
        if (data?.data) {
            const processedData = data.data.reduce((acc, item) => {
                const date = dayjs(item.invoiceDate, 'HH:mm:ss DD/MM/YYYY').format('DD/MM/YYYY');
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

                acc[date][status] += 1; // Count number of invoices by status
                acc[date][`${status}_TOTAL`] += finalTotal; // Calculate total amount by status

                return acc;
            }, {});

            // Convert processed data object to an array
            setChartData(Object.values(processedData));
        }
    }, [data]);

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
    );
}

export default BieuDo;
