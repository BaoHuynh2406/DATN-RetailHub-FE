import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Select,
    MenuItem,
    Divider,
    FormLabel,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

dayjs.extend(weekOfYear);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default function Invoice() {
    const [invoiceDays, setInvoiceDays] = useState(1);
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());
    const [customRange, setCustomRange] = useState(false);

    // State để lưu trạng thái của các checkbox
    const [checkboxValues, setCheckboxValues] = useState({
        ALL: false,
        PENDING: false,
        PAID: true,
        RETURN: false,
    });

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
        setCustomRange(false);
    };

    const handleCustomDateChange = (newValue) => {
        if (newValue && newValue.length === 2) {
            setStartDate(newValue[0]);
            setEndDate(newValue[1]);
        }
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        // Đảm bảo rằng ít nhất một checkbox luôn được chọn
        const isAtLeastOneChecked = Object.values(checkboxValues).filter((val) => val).length > 1;

        if (!isAtLeastOneChecked && !checked) {
            // Nếu chỉ còn một lựa chọn đang được chọn, không cho phép bỏ chọn
            return;
        }

        if (name === 'ALL') {
            // Nếu chọn checkbox "Tất cả", thì tắt tất cả các checkbox còn lại
            setCheckboxValues({
                ALL: checked,
                PENDING: false,
                PAID: false,
                RETURN: false,
            });
            return;
        }

        // Nếu chọn một checkbox khác ngoài "Tất cả", tắt "Tất cả"
        setCheckboxValues((prevValues) => ({
            ...prevValues,
            ALL: false, // Bỏ chọn "Tất cả" nếu bất kỳ checkbox khác nào được chọn
            [name]: checked,
        }));

        // Log giá trị checkbox ra console
        console.log(`${name}: ${checked}`);
    };

    return (
        <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
            <Box marginBottom={1}>
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
                            <DatePicker label="Từ" value={startDate} onChange={(newValue) => setStartDate(newValue)} />
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
                                <Checkbox checked={checkboxValues.ALL} onChange={handleCheckboxChange} name="ALL" />
                            }
                            label="Tất cả"
                        />
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
                                <Checkbox checked={checkboxValues.PAID} onChange={handleCheckboxChange} name="PAID" />
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

                <Divider />
            </Box>

            <Box sx={{ height: 500, overflow: 'auto' }}>Bảng</Box>
        </Container>
    );
}
