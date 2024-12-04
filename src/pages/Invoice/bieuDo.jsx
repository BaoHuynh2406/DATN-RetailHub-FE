import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { useSelector, useDispatch } from 'react-redux';

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
function BieuDo({ invoiceDays, checkboxValues, startDate, endDate, viewMode }) {
    const { data, loading, error } = useSelector((state) => state.invoice);

    // Dữ liệu hóa đơn mẫu
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        setChartData(data?.data || []);
    }, [startDate, endDate]);

    return (
        <>
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
        </>
    );
}

export default BieuDo;
