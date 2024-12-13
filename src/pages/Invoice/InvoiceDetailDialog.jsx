import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Divider,
    Grid,
} from '@mui/material';
import dayjs from 'dayjs';

// Hàm format ngày giờ
const formatDateTime = (dateString) => {
    return dayjs(dateString).format('DD/MM/YYYY HH:mm:ss');
};

function InvoiceDetailDialog({ open, onClose, invoiceData }) {
    const handlePrint = () => {
        window.print();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            {/* CSS cho chế độ in */}
            <style>
                {`
                    @media print {
                        .no-print {
                            display: none;
                        }
                        .print-header {
                            content: 'RETAILHUB - HÓA ĐƠN';
                        }
                        .print-footer {
                            display: block;
                            text-align: center;
                            margin-top: 50px;
                            font-size: 0.9rem;
                            color: #555;
                        }
                    }
                `}
            </style>

            {/* Tiêu đề */}
            <DialogTitle
                sx={{
                    backgroundColor: '#f5f5f5',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                }}
                className="print-header"
            >
                THÔNG TIN HÓA ĐƠN
            </DialogTitle>

            {/* Nội dung */}
            <DialogContent
                sx={{
                    backgroundColor: '#fafafa',
                    padding: 3,
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            <strong>Hóa đơn:</strong> {invoiceData.invoiceId}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            <strong>Khách hàng:</strong> {invoiceData.customerId} - {invoiceData.customerName}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            <strong>Nhân viên:</strong> {invoiceData.userId} - {invoiceData.userFullName}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            <strong>Thời gian:</strong> {formatDateTime(invoiceData.invoiceDate)}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ marginY: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                    Danh sách sản phẩm
                </Typography>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                        <TableRow>
                            <TableCell>
                                <strong>Mã sản phẩm</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Tên sản phẩm</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Số lượng</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Đơn giá</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Thuế suất</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Thành tiền</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoiceData.listItem.map((item) => (
                            <TableRow key={item.invoiceItemId}>
                                <TableCell>{item.productId}</TableCell>
                                <TableCell>{item.productName}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>
                                    {' '}
                                    {item.discountRate > 0 && (
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: '14px',
                                                fontStyle: 'italic',
                                                color: 'red',
                                                textDecoration: 'line-through',
                                                marginRight: '10px',
                                            }}
                                        >
                                            {item.unitPrice.toLocaleString()}đ
                                        </Typography>
                                    )}
                                    <Typography variant="body2">
                                        {(item.unitPrice * (1 - (item.discountRate || 0))).toLocaleString()}đ
                                    </Typography>
                                </TableCell>
                                <TableCell>{item.taxRate * 100}%</TableCell>
                                <TableCell>
                                    {(
                                        item.quantity *
                                        (item.unitPrice * (1 - (item.discountRate || 0))) *
                                        (1 + (item.taxRate || 0))
                                    ).toLocaleString()}
                                    đ
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="subtitle1">
                        <strong>Tổng tiền hàng:</strong> {invoiceData.totalAmount.toLocaleString()}đ
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Tổng thuế:</strong> {invoiceData.totalTax.toLocaleString()}đ
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Giảm giá:</strong> {invoiceData.discountAmount.toLocaleString()}đ
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                    <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                        <strong>Tổng thanh toán:</strong> {invoiceData.finalTotal.toLocaleString()}đ
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                    <Typography variant="subtitle1">
                        <strong>Đã thanh toán:</strong> {invoiceData.totalPayment.toLocaleString()}đ
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Tiền thừa:</strong>{' '}
                        {Math.max(invoiceData.totalPayment - invoiceData.finalTotal, 0).toLocaleString()}đ
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        sx={{
                            marginTop: 1,
                            color: invoiceData.status === 'PAID' ? 'green' : 'orange',
                            fontWeight: 'bold',
                        }}
                    >
                        <strong>Trạng thái:</strong> {invoiceData.status}
                    </Typography>
                </Box>

                {/* Thông tin liên hệ cho chế độ in */}
                <Box
                    className="print-footer"
                    sx={{
                        display: 'none',
                    }}
                >
                    <Divider sx={{ marginY: 2 }} />

                    <Typography>
                        <strong>Email:</strong> mts.studio.2019@gmail.com
                    </Typography>
                    <Typography>
                        <strong>SĐT:</strong> 0388319013
                    </Typography>
                    <Typography>
                        <strong>Địa chỉ:</strong> Quận 12, TP Hồ Chí Minh
                    </Typography>
                </Box>
            </DialogContent>

            {/* Nút không in */}
            <DialogActions className="no-print" sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                <Button variant="outlined" onClick={onClose}>
                    Đóng
                </Button>
                <Button variant="contained" color="primary" onClick={handlePrint}>
                    In hóa đơn
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default InvoiceDetailDialog;
