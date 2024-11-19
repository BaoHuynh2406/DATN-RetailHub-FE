import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Typography } from '@mui/material';

const SettingsDialog = ({ open, handleClose, modalData, setModalData, handleAddOrUpdate }) => {
    const handleChange = (field) => (e) => {
        setModalData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    // Tiêu đề dựa trên modalType và isEditMode
    const getDialogTitle = () => {
        const titles = {
            category: modalData.isEditMode ? 'Sửa loại hàng' : 'Thêm loại hàng',
            tax: modalData.isEditMode ? 'Sửa thuế' : 'Thêm thuế',
            paymentMethod: modalData.isEditMode ? 'Sửa phương thức thanh toán' : 'Thêm phương thức thanh toán',
        };
        return titles[modalData.modalType] || '';
    };

    const handleChoseImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setModalData((prevState) => ({
                    ...prevState,
                    image: reader.result, // Lưu URL của ảnh (base64)
                    imageName: file.name, // Lưu tên tệp
                }));
            };
            reader.readAsDataURL(file); // Đọc file dưới dạng base64
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ fontWeight: 'bold', color: '#1976d2', textAlign: 'center' }}>
                {getDialogTitle()}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    {/* Fields cho loại hàng */}
                    {modalData.modalType === 'category' && (
                        <TextField
                            label="Tên loại hàng"
                            fullWidth
                            value={modalData.newItem || ''}
                            onChange={handleChange('newItem')}
                            error={!!modalData.validationError}
                            helperText={modalData.validationError}
                        />
                    )}

                    {/* Fields cho thuế */}
                    {modalData.modalType === 'tax' && (
                        <>
                            <TextField
                                label="Tên thuế"
                                fullWidth
                                value={modalData.newItem || ''}
                                onChange={handleChange('newItem')}
                                error={!!modalData.validationError}
                                helperText={modalData.validationError}
                            />
                            <TextField
                                label="Mã thuế"
                                fullWidth
                                value={modalData.taxId || ''}
                                onChange={handleChange('taxId')}
                                error={!!modalData.validationError}
                                helperText={modalData.validationError}
                            />
                            <TextField
                                label="Thuế suất (%)"
                                type="number"
                                fullWidth
                                value={modalData.newTaxRate || ''}
                                onChange={handleChange('newTaxRate')}
                                error={!!modalData.validationError}
                                helperText={modalData.validationError}
                            />
                        </>
                    )}

                    {/* Fields cho phương thức thanh toán */}
                    {modalData.modalType === 'paymentMethod' && (
                        <>
                            <TextField
                                label="Tên phương thức thanh toán"
                                fullWidth
                                value={modalData.paymentName || ''}
                                onChange={handleChange('paymentName')}
                                error={!!modalData.validationError}
                                helperText={modalData.validationError}
                            />

                            {/* Ô chứa hình ảnh */}
                            <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleChoseImage} // Hàm xử lý khi chọn ảnh
                                    id="image-upload"
                                />
                                <label htmlFor="image-upload">
                                    <Box
                                        sx={{
                                            width: 200,
                                            height: 200,
                                            border: '2px dashed #aaa',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            backgroundColor: modalData.image ? 'transparent' : '#f5f5f5',
                                        }}
                                    >
                                        {modalData.image ? (
                                            <img
                                                src={modalData.image}
                                                alt="Hình ảnh phương thức thanh toán"
                                                style={{
                                                    maxWidth: '100%',
                                                    maxHeight: '100%',
                                                    objectFit: 'contain',
                                                    borderRadius: '8px',
                                                }}
                                            />
                                        ) : (
                                            <Typography variant="body2" color="textSecondary">
                                                Chọn hình ảnh
                                            </Typography>
                                        )}
                                    </Box>
                                </label>
                            </Box>

                            {/* Hiển thị tên ảnh */}
                            {modalData.imageName && (
                                <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                                    Tên ảnh: {modalData.imageName}
                                </Typography>
                            )}
                        </>
                    )}
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', py: 2 }}>
                <Button onClick={handleClose} variant="outlined" color="secondary" sx={{ mr: 1 }}>
                    Hủy
                </Button>
                <Button onClick={handleAddOrUpdate} variant="contained" color="primary">
                    {modalData.isEditMode ? 'Cập nhật' : 'Thêm'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SettingsDialog;
