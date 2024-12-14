import { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, TextField, IconButton } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import dayjs from 'dayjs';

function BoLoc({ startDate, endDate, setStartDate, setEndDate, handleChange, invoiceDays, sort, setSort }) {
    const [customDateRange, setCustomDateRange] = useState({ start: null, end: null });

    // Cập nhật startDate và endDate khi customDateRange thay đổi
    useEffect(() => {
        if (customDateRange.start && customDateRange.end) {
            setStartDate(customDateRange.start);
            setEndDate(customDateRange.end);
        }
    }, [customDateRange, setStartDate, setEndDate]);

    const handleDateAdjust = (type, direction) => {
        const adjustment = direction === 'next' ? 1 : -1;

        let newStartDate = startDate;

        if (invoiceDays === 7) {
            newStartDate = startDate.add(adjustment * 7, 'day');
        } else if (invoiceDays === 30) {
            newStartDate = startDate.add(adjustment, 'month');
        } else {
            newStartDate = startDate.add(adjustment, 'day');
        }

        setStartDate(newStartDate);

        if (invoiceDays === 1) {
            setEndDate(newStartDate);
        } else if (invoiceDays === 7) {
            setEndDate(newStartDate.endOf('week'));
        } else if (invoiceDays === 30) {
            setEndDate(newStartDate.endOf('month'));
        }
    };

    const getButtonLabels = () => {
        switch (invoiceDays) {
            case 1:
                return { prev: <ArrowBackIosIcon />, next: <ArrowForwardIosIcon /> };
            case 7:
                return { prev: <ArrowBackIosIcon />, next: <ArrowForwardIosIcon /> };
            case 30:
                return { prev: <ArrowBackIosIcon />, next: <ArrowForwardIosIcon /> };
            default:
                return null;
        }
    };

    const buttonLabels = getButtonLabels();

    const handleCustomDateChange = (dateType, value) => {
        setCustomDateRange((prev) => ({
            ...prev,
            [dateType]: value,
        }));
    };

    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#f2f2f2',
                    padding: 2,
                    borderRadius: 1,
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}
                flex={5}
            >
                <Typography variant="h6" component="h3" fontWeight="bold" color="inherit" marginRight={1}>
                    BÁO CÁO XUẤT HÀNG THEO:
                </Typography>

                <Box display="flex" alignItems="center">
                    <Select id="filter-invoice-select" value={invoiceDays} onChange={handleChange}>
                        <MenuItem value={1}>Hôm nay</MenuItem>
                        <MenuItem value={7}>Tuần này</MenuItem>
                        <MenuItem value={30}>Tháng này</MenuItem>
                        <MenuItem value="custom">Tùy chỉnh</MenuItem>
                    </Select>
                </Box>

                {invoiceDays === 'custom' ? (
                    <Box display="flex" alignItems="center" gap={2} sx={{ flexGrow: 1, justifyContent: 'center' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Ngày bắt đầu"
                                value={customDateRange.start}
                                onChange={(newValue) => handleCustomDateChange('start', newValue)}
                                renderInput={(params) => <TextField {...params} />}
                                format="DD/MM/YYYY"
                            />
                            <Typography> đến </Typography>
                            <DatePicker
                                label="Ngày kết thúc"
                                value={customDateRange.end}
                                onChange={(newValue) => handleCustomDateChange('end', newValue)}
                                renderInput={(params) => <TextField {...params} />}
                                format="DD/MM/YYYY"
                            />
                        </LocalizationProvider>
                    </Box>
                ) : (
                    buttonLabels && (
                        <Box display="flex" alignItems="center" gap={2} sx={{ flexGrow: 1, justifyContent: 'center' }}>
                            <IconButton variant="outlined" onClick={() => handleDateAdjust('day', 'prev')}>
                                {buttonLabels.prev}
                            </IconButton>
                            <Typography>
                                {invoiceDays === 1
                                    ? startDate.format('DD/MM/YYYY')
                                    : `Từ ${startDate.format('DD/MM/YYYY')} đến ${endDate.format('DD/MM/YYYY')}`}
                            </Typography>
                            <IconButton variant="outlined" onClick={() => handleDateAdjust('day', 'next')}>
                                {buttonLabels.next}
                            </IconButton>
                        </Box>
                    )
                )}
            </Box>
        </>
    );
}

export default BoLoc;
