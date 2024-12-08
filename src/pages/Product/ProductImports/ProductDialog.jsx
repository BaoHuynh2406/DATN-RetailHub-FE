import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function ProductDialog({
  open,
  handleClose,
  handleSearchClick,
  searchQuery,
  setSearchQuery,
  productImportDetails,
  setProductImportDetails,
  selectedProduct,
  handleSaveImport,
}) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>Nhập Sản phẩm</DialogTitle>
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearchClick}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </>
        ) : (
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
                onChange={(e) => setProductImportDetails({ ...productImportDetails, [name]: e.target.value })}
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
        <Button onClick={handleClose} sx={{ fontSize: '20px', color: 'red', padding: '10px 20px' }}>
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}
