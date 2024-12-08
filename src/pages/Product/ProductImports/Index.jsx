import React, { useState, useMemo } from 'react';
import {
    Box,
    Button,
    Container,
    Typography,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { AddCircle as AddCircleIcon, Edit as EditIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProductTable() {
    const [open, setOpen] = useState(false);
    const [openSecondDialog, setOpenSecondDialog] = useState(false);
    const [productImportDetails, setProductImportDetails] = useState({
        productId: '',
        productName: '',
        barcode: '',
        price: '',
        quantity: '',
        note: '',
    });

    const mockData = [
        { id: 1, ID: 'SP001', productName: 'Sản phẩm 1', quantity: 10, totalAmount: '150,000', Barcode: '73254822' },
        { id: 2, ID: 'SP002', productName: 'Sản phẩm 2', quantity: 5, totalAmount: '125,000', Barcode: '894274247' },
    ];

    const handleOpen = () => {
        // Mở form thêm sản phẩm
        setProductImportDetails({
            productId: '',
            productName: '',
            barcode: '',
            price: '',
            quantity: '',
            note: '',
        });
        setOpenSecondDialog(true); // Mở Dialog nhập sản phẩm (Dialog thứ hai)
    };
    

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseImport = () => {
        setOpenSecondDialog(false);
    };

    const handleRowSelect = (row) => {
        setProductImportDetails({
            productId: row.ID,
            productName: row.productName,
            barcode: row.Barcode, // Cập nhật barcode từ dòng dữ liệu
            price: '',  // Có thể thêm giá trị mặc định nếu cần
            quantity: '',
            note: '',
        });
        setOpen(false); // Đóng dialog chọn sản phẩm
        setOpenSecondDialog(true); // Mở dialog nhập chi tiết
    };

    const handleInputChangeImport = (e) => {
        const { name, value } = e.target;
        setProductImportDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveImport = () => {
        console.log('Import product details saved:', productImportDetails);
        setOpenSecondDialog(false);
    };

    const handleEdit = (row) => {
        // Mở Dialog và truyền dữ liệu sản phẩm vào state (ví dụ: state cho sản phẩm đang được chỉnh sửa)
        setOpen(true); // Mở Dialog
        setProductEditDetails({
            productId: row.ID,
            productName: row.productName,
            barcode: row.Barcode,
            // ... các trường khác mà bạn cần
        });
    };

    const handleSave = () => {
        // Kiểm tra xem các thông tin có hợp lệ không
        if (productEditDetails.productId && productEditDetails.productName) {
            // Giả sử bạn đang dùng Redux hoặc Local State để lưu danh sách sản phẩm
            // Cập nhật sản phẩm trong danh sách
            dispatch(updateProduct(productEditDetails)); // Action Redux (nếu có)
            setOpen(false); // Đóng Dialog
        } else {
            alert('Vui lòng điền đầy đủ thông tin sản phẩm');
        }
    };
    
    const handleDelete = (productId) => {
        // Cập nhật lại danh sách sản phẩm sau khi xóa
        const updatedData = mockData.filter(product => product.ID !== productId);
        setMockData(updatedData); // Nếu bạn đang sử dụng state cho mockData
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
                                {/* Nút Xóa */}
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

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Chọn sản phẩm cần nhập
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ height: 300, width: '100%', overflowY: 'auto' }}>
                        <DataGrid
                            rows={mockData} // Dữ liệu bảng sản phẩm
                            columns={[
                                { field: 'ID', headerName: 'Mã Sản phẩm', width: 150 },
                                { field: 'productName', headerName: 'Tên Sản phẩm', width: 200 },
                                { field: 'Barcode', headerName: 'Barcode', width: 150 },
                                
                            ]}
                            onRowClick={(params) => handleRowSelect(params.row)} // Xử lý khi chọn dòng
                            hideFooterPagination // Ẩn footer phân trang
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button
                        onClick={handleSave} // Lưu dữ liệu khi nhấn nút Lưu
                        sx={{
                            fontSize: '20px',
                            color: 'green',
                            padding: '10px 20px',
                        }}
                    >
                        Lưu
                    </Button>
                    <Button
                        onClick={handleClose} // Đóng form khi nhấn Hủy
                        sx={{
                            fontSize: '20px',
                            color: 'red',
                            padding: '10px 20px',
                        }}
                    >
                        Hủy
                    </Button>
                </DialogActions>
            </Dialog>


            {/* Dialog nhập chi tiết sản phẩm */}
            <Dialog open={openSecondDialog} onClose={handleCloseImport}>
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>Nhập Sản phẩm</DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            marginTop: '30px',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)', // 2 cột chia đều
                            gap: 2, // Khoảng cách giữa các ô
                        }}
                    >
                        {[ 
                            { label: 'Mã Sản phẩm', name: 'productId' },
                            { label: 'Tên Sản phẩm', name: 'productName' },
                            { label: 'Barcode', name: 'barcode' },
                            { label: 'Giá nhập', name: 'price' },
                            { label: 'Số lượng', name: 'quantity' },
                            { label: 'Ghi chú', name: 'note' },
                        ].map(({ label, name }) => (
                            <TextField
                                key={name}
                                label={label}
                                fullWidth
                                variant="outlined"
                                name={name}
                                value={productImportDetails[name]}
                                onChange={handleInputChangeImport}
                            />
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button
                        onClick={handleSaveImport}
                        sx={{
                            fontSize: '20px',
                            color: 'green',
                            padding: '10px 20px',
                        }}
                    >
                        Lưu
                    </Button>
                    <Button
                        onClick={handleCloseImport}
                        sx={{
                            fontSize: '20px',
                            color: 'red',
                            padding: '10px 20px',
                        }}
                    >
                        Hủy
                    </Button>
                </DialogActions>
            </Dialog>

        </Container>
    );
}
