import { useState } from 'react';
import { Box, Typography, Select, MenuItem, Button, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function BoLoc({ startDate, endDate, setStartDate, setEndDate, handleChange, invoiceDays, sort, setSort }) {
    const [customDateRange, setCustomDateRange] = useState({ start: null, end: null });

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
                return { prev: 'Ngày trước', next: 'Ngày sau' };
            case 7:
                return { prev: 'Tuần trước', next: 'Tuần sau' };
            case 30:
                return { prev: 'Tháng trước', next: 'Tháng sau' };
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

        // Update startDate and endDate if both dates are selected
        if (customDateRange.start && customDateRange.end) {
            setStartDate(customDateRange.start);
            setEndDate(customDateRange.end);
        }
    };

    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#f2f2f2',
                    padding: 2,
                    borderRadius: 1,
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    display: 'flex', // Set the container to flex display
                    flexDirection: 'row', // Arrange items horizontally
                    justifyContent: 'space-between', // Distribute items across the row
                    alignItems: 'center', // Align items vertically center
                    flexWrap: 'wrap', // Allow items to wrap for better responsiveness
                }}
                flex={5}
            >
                <Typography variant="h6" component="h3" fontWeight="bold" color="inherit" marginRight={1}>
                    BÁO CÁO XUẤT HÀNG THEO:
                </Typography>

                {/* Left-side items stay fixed */}
                <Box display="flex" alignItems="center">
                    <Select id="filter-invoice-select" value={invoiceDays} onChange={handleChange}>
                        <MenuItem value={1}>Hôm nay</MenuItem>
                        <MenuItem value={7}>Tuần này</MenuItem>
                        <MenuItem value={30}>Tháng này</MenuItem>
                        <MenuItem value="custom">Tùy chỉnh</MenuItem>
                    </Select>
                </Box>

                {/* Middle section: date range and navigation buttons */}
                {invoiceDays === 'custom' ? (
                    <Box display="flex" alignItems="center" gap={2} sx={{ flexGrow: 1, justifyContent: 'center' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Ngày bắt đầu"
                                value={customDateRange.start}
                                onChange={(newValue) => handleCustomDateChange('start', newValue)}
                                renderInput={(params) => <TextField {...params} />}
                                format="DD/MM/YYYY" // Format the date to Day/Month/Year
                            />
                            <Typography> đến </Typography>
                            <DatePicker
                                label="Ngày kết thúc"
                                value={customDateRange.end}
                                onChange={(newValue) => handleCustomDateChange('end', newValue)}
                                renderInput={(params) => <TextField {...params} />}
                                format="DD/MM/YYYY" // Format the date to Day/Month/Year
                            />
                        </LocalizationProvider>
                    </Box>
                ) : (
                    buttonLabels && (
                        <Box display="flex" alignItems="center" gap={2} sx={{ flexGrow: 1, justifyContent: 'center' }}>
                            <Button variant="outlined" onClick={() => handleDateAdjust('day', 'prev')}>
                                {buttonLabels.prev}
                            </Button>
                            <Typography>
                                {invoiceDays === 1
                                    ? startDate.format('DD/MM/YYYY') // Display formatted date
                                    : `Từ ${startDate.format('DD/MM/YYYY')} đến ${endDate.format('DD/MM/YYYY')}`}
                            </Typography>
                            <Button variant="outlined" onClick={() => handleDateAdjust('day', 'next')}>
                                {buttonLabels.next}
                            </Button>
                        </Box>
                    )
                )}

                {/* Right-side items stay fixed */}
                <Box display="flex" alignItems="center">
                    <Typography fontWeight="bold" marginRight={1}>
                        Sắp xếp:{' '}
                    </Typography>
                    <Select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <MenuItem value="asc">Ít nhất</MenuItem>
                        <MenuItem value="des">Nhiều nhất</MenuItem>
                    </Select>
                </Box>
            </Box>
        </>
    );
}

export default BoLoc;
