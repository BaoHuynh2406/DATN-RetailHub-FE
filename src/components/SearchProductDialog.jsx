import { axiosSecure } from '@/config/axiosInstance';
import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Autocomplete,
    Box,
    Slide,
} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const SearchProductDialog = ({ open, onClose, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Hàm gọi API khi người dùng nhập vào ô tìm kiếm
    const handleSearchChange = (event, newValue) => {
        setSearchQuery(newValue);

        if (!newValue.trim()) return; // Nếu không có giá trị tìm kiếm thì không gọi API

        axiosSecure
            .get('/api/v2/product/search', {
                params: {
                    keyword: newValue,
                    page: 1,
                    size: 50,
                },
            })
            .then((response) => {
                setOptions(response.data.data.data || []);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    };

    // Hàm xử lý khi chọn sản phẩm
    const handleSelectProduct = (event, value) => {
        if (value) {
            setSelectedProduct(value);
            onSearch(value.productId); // Truyền ID sản phẩm cho component cha
            onClose(); // Đóng dialog khi đã chọn sản phẩm
        }
    };

    return (
        <Dialog TransitionComponent={Transition} maxWidth="lg" open={open} onClose={onClose}>
            <DialogTitle width="100%">Tìm kiếm sản phẩm</DialogTitle>
            <DialogContent width="100%">
                <Autocomplete
                    autoFocus
                    sx={{
                        width: '50vw',
                    }}
                    value={selectedProduct}
                    onInputChange={handleSearchChange}
                    onChange={handleSelectProduct}
                    options={options}
                    getOptionLabel={(option) => option.productName || ''}
                    renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
                    renderOption={(props, option) => (
                        <Box {...props} key={option.productId}>
                            <img
                                src={option.image}
                                alt={option.productName}
                                style={{ width: 30, height: 30, marginRight: 10 }}
                            />
                            {option.productName} - {option.productId}
                        </Box>
                    )}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SearchProductDialog;
