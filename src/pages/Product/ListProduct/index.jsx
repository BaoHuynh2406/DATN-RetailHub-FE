import { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TableCustom from '@/components/TableCustom';
import { useNavigate } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';

export default function DataTable() {
    const navigate = useNavigate();

    const columns = [
        { field: 'productId', headerName: 'Mã Sản phẩm', width: 150 },
        { field: 'barcode', headerName: 'Mã barcode', width: 150 },
        { field: 'productName', headerName: 'Tên sản phẩm', width: 150 },
        { field: 'category', headerName: 'Loại', width: 120 },
        { field: 'unit', headerName: 'Đơn vị tính', width: 100 },
        { field: 'inventoryCount', headerName: 'Tồn kho', width: 120 },
        { field: 'cost', headerName: 'Giá gốc', width: 120 },
        { field: 'price', headerName: 'Giá bán', width: 120 },
        { field: 'expiryDate', headerName: 'Ngày hết hạn', width: 150 },
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
    ];

    const [products, setProducts] = useState(useSelector((state) => state.products));

    const handleEdit = (row) => {
        navigate(`/product/detail/${row.productId}`);
    };

    const handleAdd = () => {
        navigate('/product/detail/create');
    };

    const showProductDeleted = () => {
        setProducts(products.filter((row) => row.status === false));
        console.log(products);
    };

    return (
        <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={3}>
                <Typography variant="h4" component="h2" fontWeight="bold">
                    Danh sách sản phẩm
                </Typography>
                <Button variant="contained" color="success" startIcon={<AddCircleIcon />} onClick={handleAdd}>
                    Thêm mới
                </Button>
            </Box>
            <Box sx={{ height: 500, overflow: 'auto' }}>
                <TableCustom columns={columns} rows={products} stt={true} id="productId" />
            </Box>
            <Button onClick={showProductDeleted}>Hiện</Button>
        </Container>
    );
}
