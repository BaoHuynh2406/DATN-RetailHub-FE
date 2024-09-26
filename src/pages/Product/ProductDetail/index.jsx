import { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Grid,
    Typography,
    Container,
    Box,
    InputAdornment,
    Skeleton
} from '@mui/material';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import BarcodeIcon from '@mui/icons-material/QrCode';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import TypeSpecimenIcon from '@mui/icons-material/TypeSpecimen';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchProductByIdAsync,
    setError,
    removeProductAsync,
    restoreProductAsync,
    updateProductAsync,
    addProductAsync,
} from '@/redux/Product/ProductSlice';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { data, currentData, loading, error } = useSelector((state) => state.ProductSlice);
    // const categories = useSelector((state) => state.categories) || [];
    // const taxes = useSelector((state) => state.taxes) || [];
    const { productId } = useParams();
    const navigate = useNavigate();

    const productNull = {
        productId: '',
        productName: '',
        productDescription: '',
        categoryId: '',
        taxId: '',
        unit: '',
        inventoryCount: 0,
        cost: 0,
        price: 0,
        expiryDate: '',
        isActive: true,
        isDelete: false,
        image: null,  // Add an image property to store the uploaded image
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
            navigate('/Product/ProductList');
        }
    }, [error, dispatch, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

 

    const handleDelete = () => {
        if (productId !== '0') {
            dispatch(removeProductAsync(productId))
                .unwrap()
                .then(() => {
                    alert('Sản phẩm đã được xóa');
                    navigate('/Product/ProductList');
                })
                .catch(() => {
                    alert('Lỗi khi xóa sản phẩm.');
                });
        } else {
            console.log('Lỗi khi xóa sản phẩm với productId: ', productId);
        }
    };

    const handleRestore = () => {
        if (productId !== 'create') {
            dispatch(restoreProductAsync(productId))
                .unwrap()
                .then(() => {
                    alert('Sản phẩm đã được khôi phục');
                    navigate('/Product/ProductList');
                })
                .catch(() => {
                    alert('Lỗi khi khôi phục sản phẩm.');
                });
        } else {
            console.log('Lỗi khi khôi phục sản phẩm với productId: ', productId);
        }
    };

    const handleSave = () => {
        const formData = new FormData(); // Create a FormData object to handle file uploads
        Object.entries(product).forEach(([key, value]) => {
            formData.append(key, value);
        });

        if (productId === 'create') {
            dispatch(addProductAsync(formData))
                .unwrap()
                .then(() => {
                    alert('Sản phẩm đã được thêm thành công!');
                    navigate('/Product/ProductList');
                })
                .catch(() => {
                    alert('Lỗi: Sản phẩm đã tồn tại.');
                });
        } else {
            dispatch(updateProductAsync(formData))
                .unwrap()
                .then(() => {
                    alert('Sản phẩm đã được cập nhật thành công!');
                    navigate('/Product/ProductList');
                })
                .catch(() => {
                    alert('Lỗi: Không thể cập nhật sản phẩm.');
                });
        }
    };

    const handleReset = () => {
        if (productId === 'create') {
            setProduct(productNull);
        } else {
            setProduct(currentData);
        }
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
    const handleBack = () => navigate('/Product/ProductList');

    if (loading) {
        return (
            <Box display="flex" alignItems="center" justifyContent="space-around" height="100%">
                <Skeleton animation="wave" height={700} width="30%" />
                <Skeleton animation="wave" height={700} width="30%" />
                <Skeleton animation="wave" height={700} width="30%" />
            </Box>
        );
    }
    const defaultImage = 'https://via.placeholder.com/400x300?text=No+Image';

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
                    {productId === "create" ? 'Tạo Mới' : 'Chi Tiết'}
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
                                Mã sản phẩm<span style={{ color: 'red' }}> *</span>
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


            <Box display="flex" justifyContent="flex-end" marginTop={5}>
                {productId === 'create' ? (
                    <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginRight: 2 }}>
                        Lưu
                    </Button>
                ) : (
                    <>
                        {!product.isDelete ? (
                            <Button variant="outlined" color="error" onClick={handleDelete} sx={{ marginRight: 2 }}>
                                Xóa
                            </Button>
                        ) : (
                            <Button variant="outlined" color="info" onClick={handleRestore} sx={{ marginRight: 2 }}>
                                Khôi Phục
                            </Button>
                        )}
                        <Button variant="contained" color="success" onClick={handleSave} sx={{ marginRight: 2 }}>
                            Cập Nhật
                        </Button>
                    </>
                )}
                <Button variant="outlined" onClick={handleReset}>
                    Đặt Lại
                </Button>
            </Box>
        </Container>
    );
};

export default ProductDetails;
