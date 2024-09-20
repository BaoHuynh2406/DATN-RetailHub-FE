import { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Grid,
    Typography,
    Container,
    Box,
    Skeleton,
    Switch,
    Tooltip,
} from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
    fetchProductByIdAsync,
    setError,
    removeProductAsync,
    restoreProductAsync,
    updateProductAsync,
    addProductAsync,
} from '@/redux/Product/productSlice';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { data, currentData, loading, error } = useSelector((state) => state.productSlice);
    const { productId } = useParams();
    const navigate = useNavigate();

    const productNull = {
        productId: '',
        productName: '',
        category: { name: '' },  // Chỉ lấy name
        tax: { name: '' },       // Chỉ lấy name
        unit: '',
        inventoryCount: '',
        cost: '',
        price: '',
        expiryDate: '',
        isActive: true,
        isDelete: false,
    };

    const [product, setProduct] = useState(productNull);

    useEffect(() => {
        if (productId === 'create') {
            setProduct(productNull);
            return;
        }

        const foundProduct = data.find(prod => prod.productId === productId);
        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            dispatch(fetchProductByIdAsync(productId));
        }
    }, [productId, data, dispatch]);

    useEffect(() => {
        if (currentData && productId !== 'create') {
            setProduct(currentData);
        }
    }, [currentData, productId]);

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(setError(null));
            navigate('/product');
        }
    }, [error, dispatch, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    return (
        <Container maxWidth="xl">
            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ marginBottom: 2 }} marginTop="20px">
                <Typography variant="h4" align="left" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {productId === 'create' ? 'Tạo Mới Sản Phẩm' : `Sản Phẩm: ${product.productName}`}
                </Typography>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={6} md={4}>
                    <TextField
                        label="Mã Sản Phẩm"
                        name="productId"
                        value={product.productId || ''}
                        fullWidth
                        variant="outlined"
                        disabled
                        margin="normal"
                    />

                    <TextField
                        label="Tên Sản Phẩm"
                        name="productName"
                        value={product.productName || ''}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />

                    <TextField
                        label="Danh Mục"
                        name="category"
                        value={product.category.name || ''}
                        fullWidth
                        variant="outlined"
                        disabled
                        margin="normal"
                    />

                    <TextField
                        label="Thuế"
                        name="tax"
                        value={product.tax.name || ''}
                        fullWidth
                        variant="outlined"
                        disabled
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={6} md={4}>
                    <TextField
                        label="Đơn Vị"
                        name="unit"
                        value={product.unit || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Giá"
                        name="price"
                        value={product.price || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={6} md={4}>
                    <TextField
                        label="Số Lượng Tồn Kho"
                        name="inventoryCount"
                        value={product.inventoryCount || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Ngày Hết Hạn"
                        name="expiryDate"
                        value={product.expiryDate || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetails;
