import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container,
    Typography,
    Tabs,
    Tab,
    Box,
    Paper,
    TextField,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    fetchSettingsfillTaxAsync,
    fetchSettingsfillCategoryAsync,
    addCategoryAsync,
    updateCategoryAsync,
    deleteCategoryAsync,
    addTaxAsync,
    updateTaxAsync,
    deleteTaxAsync,
    clearError,
} from '../../redux/Settings/SettingSlice';

const TabPanel = ({ children, value, index, ...other }) => (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
    >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
);

export default function Settings() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.settings.categories);
    const taxes = useSelector((state) => state.settings.taxes);
    const loading = useSelector((state) => state.settings.loading);
    const error = useSelector((state) => state.settings.error);

    const [tabValue, setTabValue] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({
        newItem: '',
        newTaxRate: '',
        taxId: '',
        modalType: '',
        isEditMode: false,
        editIndex: null,
        validationError: '',
    });

    useEffect(() => {
        dispatch(fetchSettingsfillCategoryAsync());
        dispatch(fetchSettingsfillTaxAsync());
    }, [dispatch]);

    const handleOpenModal = (type, item = null, index = null) => {
        const newData = {
            modalType: type,
            isEditMode: !!item,
            editIndex: index,
            validationError: '',
        };

        if (item) {
            if (type === 'category') {
                newData.newItem = item.categoryName;
            } else if (type === 'tax') {
                newData.taxId = item.taxId;
                newData.newItem = item.taxName;
                newData.newTaxRate = item.taxRate;
            }
        } else {
            newData.taxId = ''; // Reset taxId
        }
        setModalData((prev) => ({ ...prev, ...newData }));
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setModalData({
            newItem: '',
            newTaxRate: '',
            taxId: '',
            modalType: '',
            isEditMode: false,
            editIndex: null,
            validationError: '',
        });
        dispatch(clearError());
    };

    const handleAddOrUpdate = async () => {
        const { newItem, newTaxRate, taxId, modalType, isEditMode, editIndex } = modalData;

        if (!newItem.trim()) {
            setModalData((prev) => ({
                ...prev,
                validationError:
                    modalType === 'category' ? 'Tên loại hàng không được để trống.' : 'Tên thuế không được để trống.',
            }));
            return;
        }

        if (modalType === 'category') {
            const updatedCategory = {
                categoryId: categories[editIndex]?.categoryId,
                categoryName: newItem,
                isDelete: false,
            };

            if (isEditMode && editIndex !== null) {
                // Gọi hàm cập nhật
                await dispatch(updateCategoryAsync({ categoryId: updatedCategory.categoryId, updatedCategory }));
            } else {
                // Gọi hàm thêm mới
                await dispatch(addCategoryAsync({ categoryName: newItem }));
            }
        } else if (modalType === 'tax') {
            if (!newTaxRate || isNaN(newTaxRate)) {
                setModalData((prev) => ({ ...prev, validationError: 'Thuế suất phải là một số hợp lệ.' }));
                return;
            }

            const updatedTax = {
                taxId, // Sử dụng taxId từ trạng thái modal
                taxName: newItem,
                taxRate: parseFloat(newTaxRate),
                isDelete: false,
            };

            if (isEditMode && editIndex !== null) {
                // Gọi hàm cập nhật
                await dispatch(updateTaxAsync({ taxId: updatedTax.taxId, updatedTax }));
            } else {
                // Chỉ gọi hàm thêm mới nếu không ở chế độ chỉnh sửa
                await dispatch(
                    addTaxAsync({
                        taxId: updatedTax.taxId || '', // Chỉ thêm taxId nếu có
                        taxName: newItem,
                        taxRate: parseFloat(newTaxRate),
                        isActive: false,
                    }),
                );
            }
        }

        // Tải lại danh sách sau khi thêm hoặc cập nhật
        dispatch(fetchSettingsfillCategoryAsync());
        dispatch(fetchSettingsfillTaxAsync());
        handleCloseModal();
    };

    const handleDelete = async (type, id) => {
        if (type === 'category') {
            await dispatch(deleteCategoryAsync(id));
        } else if (type === 'tax') {
            await dispatch(deleteTaxAsync(id));
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Cài đặt hệ thống
            </Typography>
            {loading && <Typography variant="body1">Đang tải dữ liệu...</Typography>}
            {error && (
                <Typography variant="body1" color="error">
                    {error}
                </Typography>
            )}
            <Paper elevation={3} sx={{ p: 2 }}>
                <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)} centered>
                    <Tab label="Loại hàng" />
                    <Tab label="Thuế" />
                </Tabs>

                {/* Loại hàng */}
                <TabPanel value={tabValue} index={0}>
                    <Typography variant="h6">Danh sách loại hàng</Typography>
                    <List>
                        {categories.map((category, index) => (
                            <ListItem key={category.categoryId}>
                                <ListItemText primary={category.categoryName} />
                                <IconButton onClick={() => handleOpenModal('category', category, index)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete('category', category.categoryId)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                    <Button variant="contained" color="primary" onClick={() => handleOpenModal('category')}>
                        Thêm loại hàng
                    </Button>
                </TabPanel>

                {/* Thuế */}
                <TabPanel value={tabValue} index={1}>
                    <Typography variant="h6">Danh sách thuế</Typography>
                    <List>
                        {taxes.map((tax) => (
                            <ListItem key={tax.taxId}>
                                <ListItemText primary={`${tax.taxId} - ${tax.taxName} - ${tax.taxRate}%`} />
                                <IconButton onClick={() => handleOpenModal('tax', tax)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete('tax', tax.taxId)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                    <Button variant="contained" color="primary" onClick={() => handleOpenModal('tax')}>
                        Thêm thuế
                    </Button>
                </TabPanel>
            </Paper>

            {/* Dialog thêm hoặc sửa */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>
                    {modalData.isEditMode
                        ? modalData.modalType === 'category'
                            ? 'Sửa loại hàng'
                            : 'Sửa thuế'
                        : modalData.modalType === 'category'
                        ? 'Thêm loại hàng'
                        : 'Thêm thuế'}
                </DialogTitle>
                <DialogContent>
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
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                label="Thuế suất (%)"
                                fullWidth
                                value={modalData.newTaxRate}
                                onChange={(e) => setModalData((prev) => ({ ...prev, newTaxRate: e.target.value }))}
                                error={!!modalData.validationError}
                                helperText={modalData.validationError}
                                sx={{ mt: 2 }}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="secondary">
                        Hủy
                    </Button>
                    <Button onClick={handleAddOrUpdate} color="primary">
                        {modalData.isEditMode ? 'Cập nhật' : 'Thêm'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
