import { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Grid,
    Typography,
    Container,
    Box,
    InputAdornment,
    Skeleton,
    Switch,
    Tooltip,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';

// Icons
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import EventIcon from '@mui/icons-material/Event';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

// Redux
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
    const categories = useSelector((state) => state.categories) || [];
    const taxes = useSelector((state) => state.taxes) || [];
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
                    // Bạn có thể lấy lại danh sách sản phẩm ở đây hoặc điều hướng đến danh sách
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
                    // Cũng có thể điều hướng hoặc làm mới danh sách sản phẩm
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
        if (productId === 'create') {
            dispatch(addProductAsync(product))
                .unwrap()
                .then(() => {
                    alert('Sản phẩm đã được thêm thành công!');
                    navigate('/Product/ProductList');
                })
                .catch(() => {
                    alert('Lỗi: Sản phẩm đã tồn tại.');
                });
        } else {
            dispatch(updateProductAsync(product))
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

    return (
        <Container maxWidth="xl">
            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={2} marginTop="20px">
                <Typography variant="h4" align="left" gutterBottom fontWeight="bold">
                    {productId === 'create' ? 'Tạo Mới' : `Sản Phẩm: ${product.productName}`}
                </Typography>
                <Button variant="contained" onClick={handleBack}>
                    <ReplyAllIcon />
                </Button>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={6} md={4}>
                    <TextField
                        label="Mã Sản Phẩm"
                        name="productId"
                        value={product.productId || ''}
                        disabled
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
                        label="Tên Sản Phẩm"
                        name="productName"
                        value={product.productName || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Mô Tả Sản Phẩm"
                        name="productDescription"
                        value={product.productDescription || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <Box display="flex" alignItems="center" className="mt-2 ms-1">
                        <Typography marginRight={2} fontWeight="bold">
                            Trạng Thái Kích Hoạt:
                        </Typography>
                        <Tooltip title={product.isActive ? 'Sản phẩm này đang hoạt động' : 'Sản phẩm này đã bị vô hiệu hóa'} placement="top">
                            <Switch
                                checked={product.isActive}
                                onChange={(e) => setProduct({ ...product, isActive: e.target.checked })}
                                color="secondary"
                                name="active"
                            />
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid item xs={6} md={4}>
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel id="category-label">Loại Sản Phẩm</InputLabel>
                        <Select
                            labelId="category-label"
                            name="categoryId"
                            value={product.categoryId || ''}
                            onChange={handleChange}
                        >
                            {categories.map(category => (
                                <MenuItem key={category.categoryId} value={category.categoryId}>
                                    {category.categoryName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Giá Bán"
                        name="price"
                        type="number"
                        value={product.price || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <PriceCheckIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                   
                    <TextField
                        label="Giá Gốc"
                        name="cost"
                        type="number"
                        value={product.cost || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <PriceCheckIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={6} md={4}>
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel id="tax-label">Mức Thuế</InputLabel>
                        <Select
                            labelId="tax-label"
                            name="taxId"
                            value={product.taxId || ''}
                            onChange={handleChange}
                        >
                            {taxes.map(tax => (
                                <MenuItem key={tax.taxId} value={tax.taxId}>
                                    {tax.taxName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Số Lượng Tồn Kho"
                        name="inventoryCount"
                        type="number"
                        value={product.inventoryCount || ''}
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
                        label="Ngày Hết Hạn"
                        name="expiryDate"
                        type="date"
                        value={product.expiryDate ? product.expiryDate.split('T')[0] : ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <EventIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                  
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
