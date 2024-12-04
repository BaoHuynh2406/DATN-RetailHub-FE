import { Box, IconButton, Typography } from '@mui/material';
import TablePagination from '@/components/TableCustom/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInvoices } from '@/redux/Invoice/invoiceSlice';
import dayjs from 'dayjs';
import { useEffect } from 'react';

function Table({ startDate, endDate, status }) {
    const dispatch = useDispatch();

    const columns = [
        { field: 'invoiceId', headerName: 'Mã hóa đơn', width: 150 },
        { field: 'userId', headerName: 'Mã nhân viên', width: 210 },
        { field: 'customerId', headerName: 'Mã khách hàng', width: 170 },
        { field: 'phoneNumber', headerName: 'SĐT Khách hàng', width: 150 },
        { field: 'invoiceDate', headerName: 'Ngày lập hóa đơn', width: 150 },
        {
            field: 'totalAmount',
            headerName: 'Số tiền',
            width: 150,
            renderCell: (params) => {
                const value = params.value;
                if (value != null) {
                    return new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    }).format(value);
                }
                return '';
            },
        },
        { field: 'status', headerName: 'Trạng thái', width: 150 },
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
        dispatch(
            fetchInvoices({
                page: 1,
                size: 20,
                startDate: formatDateForApi(startDate),
                endDate: formatDateForApi(endDate),
                status: 'PAID',
            }),
        );
    }, [startDate, endDate, status]);

    const formatDateForApi = (isoDate) => {
        return dayjs(isoDate).format('YYYY-MM-DD');
    };

    return (
        <>
            <Typography marginTop={4} marginBottom={2} variant="h6">
                Danh sách hóa đơn
            </Typography>
            <TablePagination
                columns={columns}
                stt={true}
                id="invoiceId"
                dispatchHandle={fetchInvoices}
                sliceName="invoice"
                additionalParams={{
                    startDate: formatDateForApi(startDate),
                    endDate: formatDateForApi(endDate),
                    status: status,
                }}
            />
        </>
    );
}

export default Table;
