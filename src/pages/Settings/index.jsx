// Settings.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Tabs, Tab, Paper } from '@mui/material';
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
import TabPanel from '../Settings/Tab';
import CategoryList from '../Settings/Category';
import TaxList from '../Settings/Tax';
import SettingsDialog from '../Settings/SettingsDialog';

export default function Settings() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.settings.categories);
    const taxes = useSelector((state) => state.settings.taxes);

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
        const newData = { modalType: type, isEditMode: !!item, editIndex: index, validationError: '' };
        if (item) {
            newData.newItem = item.categoryName || item.taxName;
            newData.taxId = item.taxId || '';
            newData.newTaxRate = item.taxRate || '';
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
            await dispatch(
                isEditMode
                    ? updateCategoryAsync({ categoryId: updatedCategory.categoryId, updatedCategory })
                    : addCategoryAsync({ categoryName: newItem }),
            );
        } else if (modalType === 'tax') {
            if (!newTaxRate || isNaN(newTaxRate)) {
                setModalData((prev) => ({ ...prev, validationError: 'Thuế suất phải là một số hợp lệ.' }));
                return;
            }
            const updatedTax = { taxId, taxName: newItem, taxRate: parseFloat(newTaxRate), isDelete: false };
            await dispatch(
                isEditMode
                    ? updateTaxAsync({ taxId: updatedTax.taxId, updatedTax })
                    : addTaxAsync({ taxId: updatedTax.taxId, taxName: newItem, taxRate: parseFloat(newTaxRate) }),
            );
        }
        // Tải lại danh sách sau khi thêm hoặc cập nhật
        dispatch(fetchSettingsfillCategoryAsync());
        dispatch(fetchSettingsfillTaxAsync());
        handleCloseModal();
    };

    const handleDelete = (type, id) => {
        dispatch(type === 'category' ? deleteCategoryAsync(id) : deleteTaxAsync(id));
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Cài đặt hệ thống
            </Typography>
            <Paper elevation={3} sx={{ p: 1 }}>
                <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)} centered>
                    <Tab label="Loại hàng" />
                    <Tab label="Thuế" />
                </Tabs>
                <TabPanel value={tabValue} index={0}>
                    <CategoryList
                        categories={categories}
                        handleOpenModal={handleOpenModal}
                        handleDelete={handleDelete}
                    />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <TaxList taxes={taxes} handleOpenModal={handleOpenModal} handleDelete={handleDelete} />
                </TabPanel>
            </Paper>

            <SettingsDialog
                open={openModal}
                handleClose={handleCloseModal}
                modalData={modalData}
                setModalData={setModalData}
                handleAddOrUpdate={handleAddOrUpdate}
            />
        </Container>
    );
}
