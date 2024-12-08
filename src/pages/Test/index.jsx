import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInvoices } from '@/redux/Invoice/invoiceSlice';
import TableCustom from '@/components/TableCustom';

function Test() {
    const { data, loading, error } = useSelector((state) => state.invoice);
    const dispatch = useDispatch();

    // Trạng thái các tham số lọc
    const [filters, setFilters] = useState({
        page: 1,
        size: 20,
        startDate: '2023-01-01',
        endDate: '2025-01-01',
        status: '',
        sort: 'asc',
    });

    // Gọi API khi component được render
    useEffect(() => {
        dispatch(fetchInvoices(filters));
    }, [dispatch, filters]);

    // Xử lý sự kiện thay đổi giá trị bộ lọc
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Render phần nội dung
    return (
        <Box sx={{ padding: 4 }}>
            <h1>Test API Invoices</h1>

            {/* Form lọc */}
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 4 }}>
                <TextField
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="End Date"
                    name="endDate"
                    type="date"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Status"
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    placeholder="pending,paid"
                />
                <TextField
                    label="Sort"
                    name="sort"
                    value={filters.sort}
                    onChange={handleFilterChange}
                    placeholder="asc/desc"
                />
                <Button variant="contained" color="primary" onClick={() => dispatch(fetchInvoices(filters))}>
                    Apply Filters
                </Button>
            </Box>

            {/* Hiển thị trạng thái tải */}
            {loading && (
                <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
                    <CircularProgress />
                </Box>
            )}

            {/* Hiển thị lỗi */}
            {error && (
                <Box sx={{ color: 'red', marginBottom: 2 }}>
                    <p>Error: {error}</p>
                </Box>
            )}

            <TableCustom
                stt={true}
                columns={[
                    {
                        field: 'id',
                        headerName: 'ID',
                        width: 150,
                    },
                    {
                        field: 'name',
                        headerName: 'tên sản phẩm',
                        width: 150,
                    },
                    {
                        field: 'idP',
                        headerName: 'mã sản phẩm',
                        width: 150,
                    },
                    {
                        field: 'idP',
                        headerName: 'Giá nhập',
                        width: 150,
                    },
                    {
                        field: 'idP',
                        headerName: 'số lượng',
                        width: 150,
                    },
                    {
                        field: 't',
                        headerName: 'thành tiền',
                        width: 150,
                    },
                    {
                        field: 'công cụ',
                        headerName: 'công cụ',
                        width: 150,
                    },
                ]}
            />
        </Box>
    );
}

export default Test;
