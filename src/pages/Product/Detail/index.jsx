import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Container, Box, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarcodeIcon from '@mui/icons-material/QrCode';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import TypeSpecimenIcon from '@mui/icons-material/TypeSpecimen';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProducts, removeProducts, updateProducts, restoreProducts } from '@/redux/Product/Actions';

const StyledBox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(3),
}));

const ProductDetails = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        productId: '',
        productName: '',
        barcode: '',
        category: '',
        productDescription: '',
        expiryDate: '',
        tax: '',
        location: '',
        cost: '',
        price: '',
        unit: '',
        inventoryCount: '',
        image: '',
        status: true, // Thêm thuộc tính status
    });

    const createProduct = 'create';

    useEffect(() => {
        if (productId !== createProduct) {
            if (Array.isArray(products)) {
                const foundProduct = products.find((item) => item.productId === productId);
                if (foundProduct) {
                    setProduct(foundProduct);
                } else {
                    alert('Sản phẩm không tồn tại!');
                    navigate('/not-found');
                }
            }
        }
    }, [productId, products, navigate]);

    useEffect(() => {
        console.log('Danh sách sản phẩm đã cập nhật:', products);
    }, [products]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProduct({ ...product, image: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (productId === 'create') {
            dispatch(addProducts(product)); // Thêm sản phẩm vào redux
            console.log('Thêm sản phẩm:', product);
        } else {
            dispatch(updateProducts(product)); // Cập nhật sản phẩm
            console.log('Cập nhật sản phẩm:', product);
        }
        alert('Lưu thành công');
    };
    

    const handleDelete = () => {
        if (productId !== '0') {
            dispatch(removeProducts(productId));
            console.log('Xóa sản phẩm với ID:', productId);
            alert('Sản phẩm đã được xóa');
            // navigate('/home');
        } else {
            console.log('Lỗi khi xóa sản phẩm có id: ', productId);
        }
    };

    const handleRestore = () => {
        if (productId !== '0') {
            dispatch(restoreProducts(productId));
            console.log('Khôi phục sản phẩm với ID:', productId);
            alert('Sản phẩm đã được khôi phục');
            // navigate('/home');
        } else {
            console.log('Lỗi khi khôi phục sản phẩm có id: ', productId);
        }
    };

    const handleReset = () => {
        setProduct({
            productId: '',
            productName: '',
            barcode: '',
            category: '',
            productDescription: '',
            expiryDate: '',
            tax: '',
            location: '',
            cost: '',
            price: '',
            unit: '',
            inventoryCount: '',
            image: '',
            status: true, // Đặt lại giá trị mặc định cho status
        });
    };

    const defaultImage = 'https://via.placeholder.com/400x300?text=No+Image';

    const handleBack = () => navigate('/home');

    return (
        <Container maxWidth="lg" sx={{ overflow: 'auto', height: '100vh' }}>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{ marginBottom: 2 }}
                marginTop="20px"
            >
                <Typography variant="h4" align="left" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {productId === createProduct ? 'Tạo Mới' : 'Chi Tiết'}
                </Typography>
                <Button variant="contained" onClick={handleBack}>
                    <ReplyAllIcon />
                </Button>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <TextField
                        label={
                            <>
                                Mã sản phẩm
                            </>
                        }
                        name="productId"
                        value={product.productId}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            readOnly: productId !== 'create', // Chỉ đọc nếu không phải trang tạo mới
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
                        name="barcode"
                        value={product.barcode}
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
                        name="inventoryCount"
                        value={product.inventoryCount}
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
                        name="cost"
                        value={product.cost}
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
                        name="price"
                        value={product.price}
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
                        name="tax"
                        value={product.tax}
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
                        name="productDescription"
                        value={product.productDescription}
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
                            src={product.image || defaultImage}
                            alt="Product"
                            style={{
                                width: '100%',
                                height: '250px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                            }}
                        />
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            sx={{
                                marginTop: 1,
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                width: '100%',
                                textAlign: 'center',
                            }}
                        >
                            {product.image ? 'Tên ảnh: ' + product.image.split('/').pop() : 'Chưa có ảnh'}
                        </Typography>
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
                        {productId === createProduct ? 'Tạo mới' : 'Lưu'}
                    </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button variant="outlined" color="secondary" fullWidth onClick={handleReset}>
                        Đặt lại
                    </Button>
                </Grid>
                {productId !== createProduct && (
                    <Grid item xs={12} sm={4}>
                        {product.status ? (
                            <Button variant="contained" color="error" fullWidth onClick={handleDelete}>
                                Xóa sản phẩm
                            </Button>
                        ) : (
                            <Button variant="contained" color="success" fullWidth onClick={handleRestore}>
                                Khôi phục sản phẩm
                            </Button>
                        )}
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default ProductDetails;
