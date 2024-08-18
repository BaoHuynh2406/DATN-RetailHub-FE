import React, { useState, useEffect } from 'react';

// compoment by mui
import { TextField, Button, Grid, Typography, Container, Box, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';

// icon by mui
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarcodeIcon from '@mui/icons-material/QrCode';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import TypeSpecimenIcon from '@mui/icons-material/TypeSpecimen';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addGoods, removeGoods, updateGoods } from '@/redux/Goods/Actions';

const StyledBox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(3),
}));

const ProductDetails = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.goods); // Đảm bảo khớp với cấu trúc Redux store
    const { productId } = useParams();
    const navigate = useNavigate();

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

    // Tải dữ liệu sản phẩm nếu productId khác '0'
    useEffect(() => {
        if (productId !== '0') {
            const foundProduct = products.find((item) => item.productId === productId);
            if (foundProduct) {
                setProduct(foundProduct);
            }
        }
    }, [productId, products]);
    // Phụ thuộc vào productId và danh sách sản phẩm

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
        if (productId === '0') {
            dispatch(addGoods(product));
            console.log('Thêm sản phẩm:', product);
        } else {
            dispatch(updateGoods(product));
            console.log('Cập nhật sản phẩm:', product);
        }
        alert('Lưu thành công');
        handleBack();
    };

    const handleDelete = () => {
        if (productId !== '0') {
            dispatch(removeGoods(productId));
            console.log('Xóa sản phẩm với ID:', productId);
            alert('Xóa thành công');
            handleBack();
        }
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

    const handleBack = () => navigate('/home');

    return (
        <Container maxWidth="lg" sx={{ overflow: 'auto', height: '100vh' }}>
            <Typography variant="h4" align="left" gutterBottom sx={{ fontWeight: 'bold', marginTop: '30px' }}>
                {productId === '0' ? 'Tạo Mới' : 'Chi Tiết'}
            </Typography>
            <Button variant="contained" onClick={handleBack} sx={{ marginBottom: 2 }}>
                Quay lại
            </Button>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Mã sản phẩm"
                        name="productId"
                        value={product.productId}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            readOnly: productId !== '0',
                            endAdornment: (
                                <InputAdornment position="end">
                                    <StoreIcon />
                                </InputAdornment>
                            ),
                        }}
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
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <LocalOfferIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Bar Code"
                        name="barCode"
                        value={product.barCode}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <BarcodeIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Đơn vị tính"
                        name="unit"
                        value={product.unit}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <CategoryIcon />
                                </InputAdornment>
                            ),
                        }}
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
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <InventoryIcon />
                                </InputAdornment>
                            ),
                        }}
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
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <AttachMoneyIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Giá bán"
                        name="salePrice"
                        value={product.salePrice}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <AttachMoneyIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Thuế suất"
                        name="taxRate"
                        value={product.taxRate}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <LocalOfferIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Vị trí"
                        name="location"
                        value={product.location}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <LocationOnIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Loại"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <TypeSpecimenIcon />
                                </InputAdornment>
                            ),
                        }}
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
                        rows={1}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <DescriptionIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Box display="flex" flexDirection="column" alignItems="center" paddingTop="20px">
                        <img
                            src={product.imageUrl || defaultImage}
                            alt="Product"
                            style={{
                                width: '100%',
                                height: '250px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                            }}
                        />
                        <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
                            Tải ảnh lên
                            <input type="file" hidden onChange={handleImageUpload} />
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: 3 }}>
                <Grid item xs={12} sm={4}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
                        {productId === '0' ? 'Tạo mới' : 'Lưu'}
                    </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button variant="outlined" color="secondary" fullWidth onClick={handleReset}>
                        Đặt lại
                    </Button>
                </Grid>
                {productId !== '0' && (
                    <Grid item xs={12} sm={4}>
                        <Button variant="contained" color="error" fullWidth onClick={handleDelete}>
                            Xóa sản phẩm
                        </Button>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default ProductDetails;
