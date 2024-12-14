import { Box, IconButton, Typography, Button } from '@mui/material';
import TablePagination from '@/components/TableCustom/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ExplicitIcon from '@mui/icons-material/Explicit';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInvoices } from '@/redux/Invoice/invoiceSlice';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { axiosSecure, axiosPublic } from '@/config/axiosInstance';
import InvoiceDetailDialog from './InvoiceDetailDialog';

import handleExport from '@/hooks/useExportExcel';

function convertCheckboxValuesToString(ck) {
    return Object.keys(ck)
        .filter((key) => ck[key])
        .join(',');
}

function Table({ startDate, endDate, checkboxValues, sort }) {
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const columns = [
        { field: 'invoiceId', headerName: 'Mã hóa đơn', width: 150 },
        { field: 'userFullName', headerName: 'Nhân viên', width: 150 },
        { field: 'fullName', headerName: 'Khách hàng', width: 170 },
        { field: 'invoiceDate', headerName: 'Ngày lập hóa đơn', width: 200 },
        {
            field: 'finalTotal',
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
        {
            field: 'status',
            headerName: 'Trạng thái',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                const getStatusStyle = (status) => {
                    switch (status) {
                        case 'PENDING':
                            return { backgroundColor: '#FFA500', color: 'white' };
                        case 'PAID':
                            return { backgroundColor: '#008000', color: 'white' };
                        case 'RETURN':
                            return { backgroundColor: '#FF0000', color: 'white' };
                        default:
                            return { backgroundColor: '#CCCCCC', color: 'black' }; // Mặc định
                    }
                };

                const style = {
                    ...getStatusStyle(params.row.status),
                    borderRadius: '10px',
                    padding: '4px 8px',
                    fontWeight: 'bold',
                };

                return (
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                            <label style={style}>{params.row.status}</label>
                        </div>
                    </Box>
                );
            },
        },
        {
            field: 'actions',
            headerName: 'Xem chi tiết',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <IconButton color="primary" onClick={() => handleEdit(params.row)}>
                        <VisibilityIcon />
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
                status: convertCheckboxValuesToString(checkboxValues),
                sort: sort,
            }),
        );
    }, [startDate, endDate, checkboxValues, sort]);

    const formatDateForApi = (isoDate) => {
        return dayjs(isoDate).format('YYYY-MM-DD');
    };

    const handleEdit = async (row) => {
        try {
            const response = await axiosSecure.get(`/api/v1/invoice/get/${row.invoiceId}`);
            setSelectedInvoice(response.data.data);
            setOpenDialog(true);
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu hóa đơn:', error);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedInvoice(null);
    };

    // Lấy dữ liệu từ Redux
    const invoiceData = useSelector((state) => state.invoice?.data?.data || []);

    const handleExportExcel = () => {
        // Định nghĩa các cột
        const columns = [
            { header: 'STT', key: 'STT', width: 10 },
            { header: 'Mã hóa đơn', key: 'invoiceId', width: 15 },
            { header: 'Nhân viên', key: 'userFullName', width: 25 },
            { header: 'Khách hàng', key: 'fullName', width: 20 },
            { header: 'Ngày lập', key: 'invoiceDate', width: 20 },
            { header: 'Số tiền', key: 'finalTotal', width: 20 },
            { header: 'Trạng thái', key: 'status', width: 15 },
        ];
        if (!invoiceData) return;

        handleExport(columns, invoiceData, 'DsHoaDon');
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
                    status: convertCheckboxValuesToString(checkboxValues),
                }}
            />

            {selectedInvoice && (
                <InvoiceDetailDialog open={openDialog} onClose={handleCloseDialog} invoiceData={selectedInvoice} />
            )}
            {/* Nút xuất Excel */}
            <Button
                sx={{ marginY: '20px', fontSize: 10 }}
                variant="contained"
                startIcon={<ExplicitIcon />}
                onClick={handleExportExcel}
            >
                Xuất Excel
            </Button>
        </>
    );
}

export default Table;
