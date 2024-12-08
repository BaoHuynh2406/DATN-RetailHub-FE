import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Box } from '@mui/material';

export default function ProductDialog({ open, onClose, mockData, productImportDetails, handleInputChangeImport, handleSaveImport }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null); // Lưu sản phẩm đã chọn

    // Filter sản phẩm theo ID hoặc Barcode
const filteredData = (mockData || []).filter((product) => {
    return (
        product.ID?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.Barcode?.toLowerCase().includes(searchQuery.toLowerCase())
    );
});


    // Khi người dùng nhấn nút "Tìm kiếm"
    const handleSearchClick = () => {
        if (filteredData) {
            setSelectedProduct(filteredData); // Lưu sản phẩm vào selectedProduct
        } else {
            alert('Không tìm thấy sản phẩm'); // Thông báo nếu không tìm thấy sản phẩm
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                Nhập Sản phẩm
            </DialogTitle>
            <DialogContent>
                {!selectedProduct ? (
                    <>
                        <TextField
                            label="Tìm kiếm sản phẩm (ID hoặc Barcode)"
                            fullWidth
                            variant="outlined"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{ marginBottom: '20px' }}
                        />
                        <Button
                            onClick={handleSearchClick}
                            sx={{ fontSize: '20px', color: 'blue', padding: '10px 20px', width: '100%' }}
                        >
                            Tìm kiếm
                        </Button>
    
                        {/* Show filtered products if available */}
                        {filteredData.length > 0 && (
                            <Box sx={{ marginTop: '20px' }}>
                                {filteredData.map((product) => (
                                    <Button
                                        key={product.ID}
                                        onClick={() => {
                                            setSelectedProduct(product);
                                        }}
                                        sx={{
                                            marginBottom: '10px',
                                            padding: '10px 20px',
                                            width: '100%',
                                            textAlign: 'left',
                                        }}
                                    >
                                        {product.productName} - {product.ID}
                                    </Button>
                                ))}
                            </Box>
                        )}
    
                        {/* If no products match the search, show a message */}
                        {filteredData.length === 0 && (
                            <Typography sx={{ color: 'red', marginTop: '10px' }}>
                                Không tìm thấy sản phẩm
                            </Typography>
                        )}
                    </>
                ) : (
                    // Product details form when a product is selected
                    <Box
                        sx={{
                            marginTop: '30px',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: 2,
                        }}
                    >
                        {[ 
                            { label: 'Mã Sản phẩm', name: 'productId', value: selectedProduct.ID },
                            { label: 'Tên Sản phẩm', name: 'productName', value: selectedProduct.productName },
                            { label: 'Barcode', name: 'barcode', value: selectedProduct.Barcode },
                            { label: 'Giá nhập', name: 'price' },
                            { label: 'Số lượng', name: 'quantity' },
                            { label: 'Ghi chú', name: 'note' },
                        ].map(({ label, name, value }) => (
                            <TextField
                                key={name}
                                label={label}
                                fullWidth
                                variant="outlined"
                                name={name}
                                value={value || productImportDetails[name]}
                                onChange={handleInputChangeImport}
                            />
                        ))}
                    </Box>
                )}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                {selectedProduct ? (
                    <Button
                        onClick={handleSaveImport}
                        sx={{ fontSize: '20px', color: 'green', padding: '10px 20px' }}
                    >
                        Lưu
                    </Button>
                ) : (
                    <Button
                        onClick={handleSearchClick}
                        sx={{ fontSize: '20px', color: 'blue', padding: '10px 20px' }}
                    >
                        Tìm kiếm
                    </Button>
                )}
                <Button onClick={onClose} sx={{ fontSize: '20px', color: 'red', padding: '10px 20px' }}>
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    );
    
}
