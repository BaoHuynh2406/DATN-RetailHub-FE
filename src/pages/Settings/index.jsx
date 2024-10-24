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

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
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
}

export default function Settings() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.settings.categories);
    const taxes = useSelector((state) => state.settings.taxes);
    const loading = useSelector((state) => state.settings.loading);
    const error = useSelector((state) => state.settings.error);

    const [tabValue, setTabValue] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [newItem, setNewItem] = useState('');
    const [newTaxRate, setNewTaxRate] = useState(''); // Trạng thái thuế
    const [modalType, setModalType] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [validationError, setValidationError] = useState('');

    // Trạng thái cho mã thuế
    const [taxId, setTaxId] = useState(''); // Mã thuế

    useEffect(() => {
        dispatch(fetchSettingsfillCategoryAsync());
        dispatch(fetchSettingsfillTaxAsync());
    }, [dispatch]);

    const handleOpenModal = (type, item = null, index = null) => {
        setModalType(type);
        setIsEditMode(!!item);
        setEditIndex(index);

        if (item) {
            if (type === 'category') {
                setNewItem(item.categoryName);
            } else if (type === 'tax') {
                setTaxId(item.taxId); // Gán taxId
                setNewItem(item.taxName);
                setNewTaxRate(item.taxRate);
            }
        } else {
            // Reset trạng thái khi mở modal cho thêm mới
            setTaxId(''); // Reset taxId
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setNewItem('');
        setNewTaxRate(''); // Reset thuế
        setTaxId(''); // Reset taxId
        setIsEditMode(false);
        setEditIndex(null);
        setValidationError('');
        dispatch(clearError());
    };

    const handleAddOrUpdate = async () => {
        if (!newItem.trim()) {
            setValidationError(modalType === 'category' ? 'Tên loại hàng không được để trống.' : 'Tên thuế không được để trống.');
            return;
        }
    
        if (modalType === 'category') {
            if (isEditMode && editIndex !== null) {
                const updatedCategories = {
                    categoryId: categories[editIndex].categoryId,
                    categoryName: newItem,
                    isDelete: false,
                };
                await dispatch(updateCategoryAsync({ categoryId: updatedCategories.categoryId, updatedCategory: updatedCategories }));
            } else {
                await dispatch(addCategoryAsync({ categoryName: newItem }));
            }
        } else if (modalType === 'tax') {
            if (!newTaxRate || isNaN(newTaxRate)) {
                setValidationError('Thuế suất phải là một số hợp lệ.');
                return;
            }
    
            const updatedTaxes = {
                taxId: taxId, 
                taxName: newItem,
                taxRate: parseFloat(newTaxRate),
                isDelete: false, 
            };
    
            if (isEditMode && editIndex !== null) {
                await dispatch(updateTaxAsync({ taxId: updatedTaxes.taxId, updatedTax: updatedTaxes }));
            } else {
                // Thêm mới thuế với trạng thái mặc định
                await dispatch(addTaxAsync({ taxId: updatedTaxes.taxId, taxName: newItem, taxRate: parseFloat(newTaxRate), isActive: false }));
            }
        }
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
        <Container maxWidth="md" sx={{ mt: 4 }}>
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
                        {taxes.map((tax, index) => (
                            <ListItem key={tax.taxId}>
                                <ListItemText primary={`${tax.taxId} - ${tax.taxName} - ${tax.taxRate}%`} />
                                <IconButton onClick={() => handleOpenModal('tax', tax, index)}>
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
                <DialogTitle>{isEditMode ? (modalType === 'category' ? 'Sửa loại hàng' : 'Sửa thuế') : (modalType === 'category' ? 'Thêm loại hàng' : 'Thêm thuế')}</DialogTitle>
                <DialogContent>
                    <TextField
                        label={modalType === 'category' ? 'Tên loại hàng' : 'Tên thuế'}
                        fullWidth
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        error={!!validationError}
                        helperText={validationError}
                    />
                    {modalType === 'tax' && (
                        <>
                            <TextField
                                label="Mã thuế" // Trường nhập mã thuế
                                fullWidth
                                value={taxId} // Sử dụng taxId
                                onChange={(e) => setTaxId(e.target.value)}
                                error={!!validationError}
                                helperText={validationError}
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                label="Thuế suất (%)"
                                fullWidth
                                value={newTaxRate}
                                onChange={(e) => setNewTaxRate(e.target.value)}
                                error={!!validationError}
                                helperText={validationError}
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
                        {isEditMode ? 'Cập nhật' : 'Thêm'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
