import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Grid,
    Typography,
    Container,
    Box,
    InputAdornment,
    Skeleton,
    CircularProgress,
    IconButton,
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
import QrCodeScannerTwoToneIcon from '@mui/icons-material/QrCodeScannerTwoTone';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useImgBB } from '@/hooks/useImgBB';
import { fetchSettingsfillCategoryAsync, fetchSettingsfillTaxAsync } from '@/redux/Settings/SettingSlice';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import BarcodeLookup from './BarcodeLookUp';

import {
    fetchProductByIdAsync,
    setError,
    removeProductAsync,
    restoreProductAsync,
    updateProductAsync,
    addProductAsync,
} from '@/redux/Product/ProductSlice';

import ScanDialog from './ScanDialog';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
    position: {
        x: 'right',
        y: 'top',
    },
    dismissible: true,
});

const ProductDetails = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.settings.categories);
    const taxes = useSelector((state) => state.settings.taxes);
    const defaultImage = 'https://via.placeholder.com/400x300?text=No+Image';
    const [open, setOpen] = useState(false);
    const { data, currentData, loading, error } = useSelector((state) => state.ProductSlice);
    const [isLoading, setIsLoading] = useState(false);
    const { productId } = useParams();
    const navigate = useNavigate();
    const { handleUpload } = useImgBB();
    const [selectedFile, setSelectedFile] = useState(null);
    const productNull = {
        productId: '',
        productName: '',
        productDescription: '',
        category: {
            cateroryId: '',
            categoryName: '',
        },
        tax: {
            taxId: '',
            taxName: '',
            taxRate: 0,
        },
        unit: '',
        inventoryCount: 0,
        cost: 0,
        price: 0,
        expiryDate: '',
        isActive: true,
        isDelete: false,
        image: null,
    };
    const [product, setProduct] = useState(productNull);

    //----------------------------------------------------------------

    useEffect(() => {
        dispatch(fetchSettingsfillCategoryAsync());
        dispatch(fetchSettingsfillTaxAsync());
    }, []);

    useEffect(() => {
        if (productId === 'create') {
            setProduct(productNull);
            return;
        }

        if (!data.data) {
            dispatch(fetchProductByIdAsync(productId))
                .unwrap()
                .then((result) => {
                    setProduct(result);
                    return;
                })
                .catch((error) => {
                    console.error('Failed to fetch product: ', error);
                    return;
                });
            return;
        }
        const foundProduct = data?.data.find((prod) => prod.productId == productId);
        if (foundProduct) {
            setProduct(foundProduct);
            return;
        }
        navigate('/Product/ProductDetail/create');
    }, [productId, data, dispatch]);

    useEffect(() => {
        if (error) {
            notyf.error('Lỗi khi tải sản phẩm: ', error.message);
            dispatch(setError(null));
            navigate('/Product/ProductList');
        }
    }, [error, dispatch, navigate]);

    //----------------------------------------------------------------

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (barcode) => {
        setOpen(false);
        if (barcode) {
            setProduct({ ...product, barcode: barcode });
            notyf.success('Đã quét thành công!');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'categoryId') {
            setProduct((prevProduct) => ({
                ...prevProduct,
                category: {
                    ...prevProduct.category,
                    categoryId: value,
                },
            }));
        } else if (name === 'taxId') {
            setProduct((prevProduct) => ({
                ...prevProduct,
                tax: {
                    ...prevProduct.tax,
                    taxId: value,
                },
            }));
        } else {
            setProduct((prevProduct) => ({
                ...prevProduct,
                [name]: value,
            }));
        }
    };

    const handleDelete = () => {
        if (productId !== '0') {
            dispatch(removeProductAsync(productId))
                .unwrap()
                .then(() => {
                    notyf.success('Đã xóa!');
                    navigate('/Product/ProductList');
                })
                .catch(() => {
                    notyf.error('Có lỗi khi xóa sản phẩm!');
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
                    notyf.success('Khôi phục thành công!');
                    navigate('/Product/ProductList');
                })
                .catch(() => {
                    notyf.error('Lỗi!');
                });
        } else {
            console.log('Lỗi khi khôi phục sản phẩm với productId: ', productId);
        }
    };

    const handleSave = async () => {
        setIsLoading(true);
        let data = product;
        // Bổ sung thêm trường role
        data = { ...data, categoryId: product.category?.categoryId || 1, taxId: product.tax?.taxId || 'THUE' };

        // Nếu có file ảnh được chọn, tải ảnh lên trước khi lưu
        if (selectedFile) {
            try {
                const url = await handleUploadImage(); // Đợi tải ảnh
                data = { ...data, image: url }; // Bổ sung URL ảnh vào dữ liệu
            } catch (error) {
                notyf.error('Không thể tải ảnh lên');
                return;
            }
        }

        // Sau khi đã có URL ảnh hoặc nếu không có ảnh thì tiếp tục lưu
        if (productId === 'create') {
            dispatch(addProductAsync(data))
                .unwrap()
                .then(() => {
                    setIsLoading(false);
                    notyf.success('Thêm mới thành công!');
                    handleBack();
                })
                .catch(() => {
                    notyf.error('Không thể thêm!');
                    setIsLoading(false);
                });
        } else {
            dispatch(updateProductAsync(data))
                .unwrap()
                .then(() => {
                    notyf.success('Cập nhật thành công!');
                    setIsLoading(false);
                })
                .catch(() => {
                    notyf.error('Không thể cập nhật!');
                    setIsLoading(false);
                });
        }
    };

    const handleChoseImage = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setProduct({ ...product, image: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleUploadImage = async () => {
        if (!selectedFile) throw new Error('No file selected');
        if (!selectedFile.type.startsWith('image/')) {
            notyf.error('Chỉ nhận file ảnh');
            throw new Error('Invalid file type');
        }

        const fileName =
            'ProductImage-' +
            selectedFile.name
                .substring(0, selectedFile.name.lastIndexOf('.'))
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/\s+/g, '')
                .toLowerCase();

        const url = await handleUpload(selectedFile, fileName);
        return url;
    };

    const handleReset = () => {
        if (productId === 'create') {
            setProduct(productNull);
        } else {
            setProduct(currentData);
        }
    };

    const handleBack = () => navigate(-1);

    const handleLookUpBarcode = async (barcode) => {
        try {
            if (!barcode) throw new Error('Invalid barcode');
            setIsLoading(true);
            const result = await BarcodeLookup(barcode);
            notyf.success('Tự động điền sản phẩm thành công!');
            setProduct({
                ...product,
                productName: result.productName,
                image: result.imageUrl,
                price: result.price,
            });
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
        }
    };

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
        <Container maxWidth="lg" sx={{ overflow: 'auto', height: '100vh', position: 'relative' }}>
            {isLoading && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 10,
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{ marginBottom: 2 }}
                marginTop="20px"
            >
                <Typography variant="h4" align="left" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {productId === 'create' ? 'Tạo Mới' : 'Chi Tiết'}
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
                        value={product.productId || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
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
                        value={product.productName || ''}
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
                        value={product.barcode || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => {
                                            handleClickOpen();
                                        }}
                                    >
                                        <QrCodeScannerTwoToneIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            handleLookUpBarcode(product.barcode || null);
                                        }}
                                    >
                                        <TravelExploreRoundedIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Đơn vị tính"
                        name="unit"
                        value={product.unit || ''}
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
                        label="Ngày hết hạn"
                        type="date"
                        name="expiryDate"
                        value={product.expiryDate || ''}
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
                        value={product.cost || ''}
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
                        value={product.price || ''}
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
                        select
                        label="Loại"
                        name="categoryId"
                        value={product.category.categoryId || ''}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat.categoryId} value={cat.categoryId}>
                                {cat.categoryName}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        label="Thuế suất"
                        name="taxId"
                        value={product.tax.taxId || ''}
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
                    >
                        {taxes.map((tax) => (
                            <MenuItem key={tax.taxId} value={tax.taxId}>
                                {tax.taxName} ({tax.taxRate}%)
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Vị trí"
                        name="location"
                        value={product.location || ''}
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
                        label="Mô tả"
                        name="productDescription"
                        value={product.productDescription || ''}
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
                            Chọn ảnh
                            <input type="file" hidden onChange={handleChoseImage} />
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

            {open && <ScanDialog handleClose={handleClose} open={open} />}
        </Container>
    );
};

export default ProductDetails;
