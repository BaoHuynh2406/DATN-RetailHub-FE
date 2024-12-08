import React, { useState, useMemo } from 'react';
import { Box, Button, Container, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputAdornment } from '@mui/material';
import { AddCircle as AddCircleIcon, Edit as EditIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';  // Thêm biểu tượng tìm kiếm

export default function ProductTable() {
    const [open, setOpen] = useState(false);
    const [productImportDetails, setProductImportDetails] = useState({
        productId: '',
        productName: '',
        barcode: '',
        price: '',
        quantity: '',
        note: '',
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [mockData, setMockData] = useState([
        { id: 1, ID: 'SP001', productName: 'Sản phẩm 1', quantity: 10, totalAmount: '150,000', Barcode: '73254822' },
        { id: 2, ID: 'SP002', productName: 'Sản phẩm 2', quantity: 5, totalAmount: '125,000', Barcode: '894274247' },
    ]);

    // Handle Open and Close for Dialogs
    const handleOpen = () => {
        setProductImportDetails({
            productId: '',
            productName: '',
            barcode: '',
            price: '',
            quantity: '',
            note: '',
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setProductImportDetails({
            productId: '',
            productName: '',
            barcode: '',
            price: '',
            quantity: '',
            note: '',
        });
        setSelectedProduct(null); // Reset lại selectedProduct
    };

    const validateBarcode = (barcode) => {
        // Kiểm tra nếu mã barcode có ít nhất 3 ký tự và 3 ký tự cuối là chữ số
        const regex = /\d{3}$/; // Kiểm tra 3 chữ số cuối
        return regex.test(barcode);
    };

    const handleSearchClick = () => {
        // Kiểm tra mã barcode có đúng 3 chữ số cuối hay không
        if (!validateBarcode(searchQuery)) {
            alert('Mã barcode phải có đúng 3 chữ số ở cuối');
            return;  // Dừng hàm nếu mã barcode không hợp lệ
        }

        // Tiến hành tìm kiếm nếu mã barcode hợp lệ
        const foundProduct = mockData.find(
            (product) =>
                product.ID.includes(searchQuery) ||
                product.Barcode.includes(searchQuery) ||
                product.productName.includes(searchQuery)
        );

        if (foundProduct) {
            setSelectedProduct(foundProduct);
        } else {
            alert('Không tìm thấy sản phẩm');
        }
    };

    const handleSaveImport = () => {
        console.log('Import product details saved:', productImportDetails);
        setProductImportDetails({
            productId: '',
            productName: '',
            barcode: '',
            price: '',
            quantity: '',
            note: '',
        });
        setSelectedProduct(null); // Reset selectedProduct sau khi lưu
        setOpen(false);
    };

    const handleEdit = (row) => {
        setProductImportDetails({
            productId: row.ID,
            productName: row.productName,
            barcode: row.Barcode,
            price: '',
            quantity: '',
            note: '',
        });
        setOpen(true);
    };

    const handleDelete = (productId) => {
        const updatedData = mockData.filter(product => product.ID !== productId);
        setMockData(updatedData);
    };

    const columns = useMemo(
        () => [
            { field: 'ID', headerName: 'Mã', width: 150 },
            { field: 'productName', headerName: 'Tên sản phẩm', width: 200 },
            { field: 'quantity', headerName: 'Số lượng', width: 150 },
            { field: 'totalAmount', headerName: 'Thành tiền', width: 120 },
            {
                field: 'actions',
                headerName: 'Công cụ',
                width: 150,
                align: 'center',
                renderCell: (params) => (
                    <Box display="flex" justifyContent="left" alignItems="center">
                        <IconButton color="error" onClick={() => handleDelete(params.row.ID)}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={() => handleEdit(params.row)}>
                            <EditIcon />
                        </IconButton>
                    </Box>
                ),
            },
        ],
        []
    );

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
                                <th key={col.field} style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px', background: '#f7f7f7' }}>
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

            {/* Dialog for importing products */}
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Nhập Sản phẩm
                </DialogTitle>
                <DialogContent>
                    {/* Search Section */}
                    {!selectedProduct ? (
                        <>
                            <TextField
                                label="Tìm kiếm sản phẩm (ID hoặc Barcode)"
                                fullWidth
                                variant="outlined"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                sx={{ marginBottom: '20px' }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleSearchClick}>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </>
                    ) : (
                        // Product Details Form Section
                        <Box
                            sx={{
                                marginTop: '30px',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: 2,
                            }}
                        >
                            {[ 
                                { label: 'Mã Sản phẩm', name: 'productId', value: selectedProduct.ID },
                                { label: 'Tên Sản phẩm', name: 'productName', value: selectedProduct.productName },
                                { label: 'Barcode', name: 'barcode', value: selectedProduct.Barcode },
                                { label: 'Giá nhập', name: 'price' },
                                { label: 'Số lượng', name: 'quantity' },
                                { label: 'Ghi chú', name: 'note' },
                            ].map(({ label, name, value }) => (
                                <TextField
                                    key={name}
                                    label={label}
                                    fullWidth
                                    variant="outlined"
                                    name={name}
                                    value={value || productImportDetails[name]}
                                    onChange={(e) => setProductImportDetails({ ...productImportDetails, [name]: e.target.value })}
                                />
                            ))}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    {selectedProduct ? (
                        <Button
                            onClick={handleSaveImport}
                            sx={{ fontSize: '20px', color: 'green', padding: '10px 20px' }}
                        >
                            Lưu
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSearchClick}
                            sx={{ fontSize: '20px', color: 'blue', padding: '10px 20px' }}
                        >
                            Tìm kiếm
                        </Button>
                    )}
                    <Button onClick={handleClose} sx={{ fontSize: '20px', color: 'red', padding: '10px 20px' }}>
                        Hủy
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
