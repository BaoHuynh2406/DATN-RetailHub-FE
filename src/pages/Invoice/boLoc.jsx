import { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, Divider, FormControlLabel, Checkbox } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

dayjs.extend(weekOfYear);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

function BoLoc({ 
    startDate, 
    endDate, 
    setStartDate,
    setEndDate,
    checkboxValues, 
    handleCheckboxChange, 
    handleChange, 
    viewMode, 
    setViewMode,
    invoiceDays
}) {
    return (
        <>
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
        </>
    );
}

export default BoLoc;
