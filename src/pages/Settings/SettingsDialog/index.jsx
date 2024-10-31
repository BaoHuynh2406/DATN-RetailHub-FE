// SettingsDialog.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box } from '@mui/material';

const SettingsDialog = ({ open, handleClose, modalData, setModalData, handleAddOrUpdate }) => (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', color: '#1976d2', textAlign: 'center' }}>
            {modalData.isEditMode
                ? modalData.modalType === 'category'
                    ? 'Sửa loại hàng'
                    : 'Sửa thuế'
                : modalData.modalType === 'category'
                ? 'Thêm loại hàng'
                : 'Thêm thuế'}
        </DialogTitle>
        <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                <TextField
                    label={modalData.modalType === 'category' ? 'Tên loại hàng' : 'Tên thuế'}
                    fullWidth
                    value={modalData.newItem}
                    onChange={(e) => setModalData((prev) => ({ ...prev, newItem: e.target.value }))}
                    error={!!modalData.validationError}
                    helperText={modalData.validationError}
                />
                {modalData.modalType === 'tax' && (
                    <>
                        <TextField
                            label="Mã thuế"
                            fullWidth
                            value={modalData.taxId}
                            onChange={(e) => setModalData((prev) => ({ ...prev, taxId: e.target.value }))}
                            error={!!modalData.validationError}
                            helperText={modalData.validationError}
                        />
                        <TextField
                            label="Thuế suất (%)"
                            fullWidth
                            value={modalData.newTaxRate}
                            onChange={(e) => setModalData((prev) => ({ ...prev, newTaxRate: e.target.value }))}
                            error={!!modalData.validationError}
                            helperText={modalData.validationError}
                        />
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

export default SettingsDialog;
