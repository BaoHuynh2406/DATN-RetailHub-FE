import { useState, useEffect } from 'react';
import { Box, Container, Divider } from '@mui/material';
import BoLoc from './boLoc';
import BieuDo from './bieuDo';
import TableOfContent from './table';
import Dashboard from './Dashboard';

import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(weekOfYear);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default function Invoice() {
    const [invoiceDays, setInvoiceDays] = useState(1);
    const [viewMode, setViewMode] = useState('total');
    const [sort, setSort] = useState('des');
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());
    const [checkboxValues, setCheckboxValues] = useState({
        PENDING: false,
        PAID: true, //boolean
        RETURN: false, //boolean`
    });

    const [invoiceDataMini, setInvoiceDataMini] = useState([]);

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
                {/* Bộ lộc */}
                <BoLoc
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    checkboxValues={checkboxValues}
                    handleCheckboxChange={handleCheckboxChange}
                    handleChange={handleChange}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    invoiceDays={invoiceDays}
                    sort={sort}
                    setSort={setSort}
                />
                {/* Biểu đồ */}
                <BieuDo
                    invoiceDays={invoiceDays}
                    checkboxValues={checkboxValues}
                    startDate={startDate}
                    endDate={endDate}
                    viewMode={viewMode}
                    setInvoiceDataMini={setInvoiceDataMini}
                />
            </Box>

            {/* Dashboard */}
            <Dashboard invoiceDataMini={invoiceDataMini} />

            {/* Danh sách hóa đơn */}
            <Divider />
            <TableOfContent startDate={startDate} endDate={endDate} checkboxValues={checkboxValues} sort={sort} />
        </Container>
    );
}
