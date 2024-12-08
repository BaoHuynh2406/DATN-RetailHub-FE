import React, { useState, useMemo } from 'react';
import {
    Box,
    Button,
    Container,
    Typography,
    IconButton,
    Switch,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';
import { AddCircle as AddCircleIcon, Edit as EditIcon } from '@mui/icons-material';

export default function ProductTable() {
    const [open, setOpen] = useState(false);
    const [openSecondDialog, setOpenSecondDialog] = useState(false);
    const [productDetails, setProductDetails] = useState({
        productId: '',
        productName: '',
        category: '',
    });
    const [productImportDetails, setProductImportDetails] = useState({
        productId: '',
        productName: '',
        barcode: '',
        price: '',
        quantity: '',
        note: '',
    });

    const columns = useMemo(
        () => [
            { field: 'ID', headerName: 'Mã', width: 150 },
            { field: 'productName', headerName: 'Tên sản phẩm', width: 120 },
            { field: 'category', headerName: 'Số lượng', width: 120 },
            { field: 'price', headerName: 'Thành tiền', width: 120 },
            {
                field: 'isActive',
                headerName: 'Trạng thái',
                width: 120,
                renderCell: (row) => (
                    <Switch checked={row.isActive} color="secondary" />
                ),
            },
            {
                field: 'actions',
                headerName: 'Công cụ',
                width: 150,
                align: 'center',
                renderCell: (params) => (
                    <Box display="flex" justifyContent="left" alignItems="center">
                        <IconButton color="primary" onClick={() => handleEdit(params.row)}>
                            <EditIcon />
                        </IconButton>
                    </Box>
                ),
            },
        ],
        [],
    );

    const mockData = [
        {
            ID: 'SP001',
            productName: 'Sản phẩm 1',
            category: '2',
            price: '15,000',
            isActive: true,
        },
        {
            ID: 'SP002',
            productName: 'Sản phẩm 2',
            category: '4',
            price: '25,000',
            isActive: false,
        },
    ];

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({
            ...productDetails,
            [name]: value,
        });
    };

    const handleInputChangeImport = (e) => {
        const { name, value } = e.target;
        setProductImportDetails({
            ...productImportDetails,
            [name]: value,
        });
    };

    const handleSave = () => {
        console.log('Product details saved:', productDetails);
        setOpen(false);
        setOpenSecondDialog(true); // Mở form nhập sản phẩm sau khi lưu thông tin sản phẩm
    };

    const handleSaveImport = () => {
        console.log('Import product details saved:', productImportDetails);
        setOpenSecondDialog(false);
    };

    const handleCloseImport = () => {
        setOpenSecondDialog(false);
    };

    return (
        <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={3}>
                <Typography variant="h4" component="h2" fontWeight="bold">
                    Tạo mới phiếu nhập hàng
                </Typography>
            </Box>
            <Box sx={{ height: 300, overflow: 'auto', border: '1px solid #ddd', borderRadius: 2, padding: 2 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.field}
                                    style={{
                                        borderBottom: '1px solid #ccc',
                                        textAlign: 'left',
                                        padding: '8px',
                                        background: '#f7f7f7',
                                    }}
                                >
                                    {col.headerName}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {mockData.map((row, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                                {columns.map((col) => (
                                    <td key={col.field} style={{ padding: '8px' }}>
                                        {col.renderCell ? col.renderCell(row) : row[col.field] || ''}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Box>

            <Box display="flex" justifyContent="space-between" flexDirection="column" marginTop={2}>
                <Box display="flex" sx={{ margin: '5px 10px' }}>
                    <Button variant="contained" color="success" startIcon={<AddCircleIcon />} onClick={handleOpen}>
                        Nhấn để thêm sản phẩm
                    </Button>
                </Box>
                <Box display="flex" sx={{ margin: '20px 30px' }}>
                    <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
                        Lưu
                    </Button>
                    <Button variant="outlined">Đặt Lại</Button>
                </Box>
            </Box>

            {/* Dialog for product details */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Chọn sản phẩm cần nhập</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Mã Sản phẩm"
                        fullWidth
                        variant="outlined"
                        name="productId"
                        value={productDetails.productId}
                        onChange={handleInputChange}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Tên Sản phẩm"
                        fullWidth
                        variant="outlined"
                        name="productName"
                        value={productDetails.productName}
                        onChange={handleInputChange}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Danh mục"
                        fullWidth
                        variant="outlined"
                        name="category"
                        value={productDetails.category}
                        onChange={handleInputChange}
                        sx={{ marginBottom: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Hủy
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for product import details */}
            <Dialog open={openSecondDialog} onClose={handleCloseImport}>
                <DialogTitle>Nhập Sản phẩm</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Mã Sản phẩm"
                        fullWidth
                        variant="outlined"
                        name="productId"
                        value={productImportDetails.productId}
                        onChange={handleInputChangeImport}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Tên Sản phẩm"
                        fullWidth
                        variant="outlined"
                        name="productName"
                        value={productImportDetails.productName}
                        onChange={handleInputChangeImport}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Barcode"
                        fullWidth
                        variant="outlined"
                        name="barcode"
                        value={productImportDetails.barcode}
                        onChange={handleInputChangeImport}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Giá nhập"
                        fullWidth
                        variant="outlined"
                        name="price"
                        value={productImportDetails.price}
                        onChange={handleInputChangeImport}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Số lượng"
                        fullWidth
                        variant="outlined"
                        name="quantity"
                        value={productImportDetails.quantity}
                        onChange={handleInputChangeImport}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Ghi chú"
                        fullWidth
                        variant="outlined"
                        name="note"
                        value={productImportDetails.note}
                        onChange={handleInputChangeImport}
                        sx={{ marginBottom: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseImport} color="secondary">
                        Thoát
                    </Button>
                    <Button onClick={handleSaveImport} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
