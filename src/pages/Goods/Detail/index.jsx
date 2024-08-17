import React, { useState } from 'react';
import {
    TextField,
    Button,
    Grid,
    Typography,
    Container,
    Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(3),
}));

const ProductDetail = () => {
    const [product, setProduct] = useState({
        productId: '',
        productName: '',
        barCode: '',
        category: '',
        description: '',
        expiryDate: '',
        taxRate: '',
        location: '',
        entryPrice: '',
        salePrice: '',
        unit: '',
        stockQuantity: '',
        imageUrl: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProduct({ ...product, imageUrl: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        console.log('Lưu sản phẩm', product);
    };

    const handleDelete = () => {
        console.log('Xóa sản phẩm', product.productId);
    };

    const handleRestore = () => {
        console.log('Khôi phục sản phẩm', product.productId);
    };

    const handleReset = () => {
        setProduct({
            productId: '',
            productName: '',
            barCode: '',
            category: '',
            description: '',
            expiryDate: '',
            taxRate: '',
            location: '',
            entryPrice: '',
            salePrice: '',
            unit: '',
            stockQuantity: '',
            imageUrl: '',
        });
    };

    const defaultImage = 'https://via.placeholder.com/400x300?text=No+Image';

    return (
        <Container maxWidth="lg" sx={{ overflow: 'auto', height: '100vh' }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', marginTop: '30px' }}>
                Chi tiết hàng hóa
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Mã sản phẩm"
                        name="productId"
                        value={product.productId}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                        margin="normal"
                    />
                    <TextField
                        label="Tên sản phẩm"
                        name="productName"
                        value={product.productName}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Bar Code"
                        name="barCode"
                        value={product.barCode}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Đơn vị tính"
                        name="unit"
                        value={product.unit}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Số tồn kho"
                        type="number"
                        name="stockQuantity"
                        value={product.stockQuantity}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Ngày hết hạn"
                        type="date"
                        name="expiryDate"
                        value={product.expiryDate}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        label="Giá nhập"
                        name="entryPrice"
                        value={product.entryPrice}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Giá bán"
                        name="salePrice"
                        value={product.salePrice}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Thuế suất"
                        name="taxRate"
                        value={product.taxRate}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Vị trí"
                        name="location"
                        value={product.location}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Mô tả"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={4}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <img
                            src={product.imageUrl || defaultImage}
                            alt="Product"
                            style={{
                                width: '100%',
                                height: 'auto',
                                marginBottom: '20px',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                        <Button
                            variant="contained"
                            component="label"
                            sx={{
                                marginTop: '10px',
                                '&:hover': {
                                    backgroundColor: '#1565C0',
                                },
                            }}
                        >
                            Tải ảnh lên
                            <input type="file" hidden onChange={handleImageUpload} />
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <StyledBox display="flex" justifyContent="space-between" marginTop="20px">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    sx={{
                        minWidth: '120px',
                        '&:hover': {
                            backgroundColor: '#2e7d32',
                        },
                    }}
                >
                    Lưu
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDelete}
                    sx={{
                        minWidth: '120px',
                        '&:hover': {
                            backgroundColor: '#d32f2f',
                        },
                    }}
                >
                    Xóa
                </Button>
                <Button
                    variant="contained"
                    onClick={handleRestore}
                    sx={{
                        minWidth: '120px',
                        backgroundColor: '#FFB74D',
                        '&:hover': {
                            backgroundColor: '#F57C00',
                        },
                    }}
                >
                    Khôi phục
                </Button>
                <Button
                    variant="contained"
                    onClick={handleReset}
                    sx={{
                        minWidth: '120px',
                        backgroundColor: '#757575',
                        '&:hover': {
                            backgroundColor: '#424242',
                        },
                    }}
                >
                    Đặt lại
                </Button>
            </StyledBox>
        </Container>
    );
};

export default ProductDetail;
