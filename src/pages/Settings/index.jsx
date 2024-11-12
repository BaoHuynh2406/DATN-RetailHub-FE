import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Tabs, Tab, Paper } from '@mui/material';
import {
    fetchSettingsfillTaxAsync,
    fetchSettingsfillCategoryAsync,
    fetchSettingsfillPaymentAsync,
    addCategoryAsync,
    updateCategoryAsync,
    deleteCategoryAsync,
    addTaxAsync,
    updateTaxAsync,
    deleteTaxAsync,
    addPaymentAsync,
    updatePaymentAsync,
    deletePaymentAsync,
    clearError,
} from '../../redux/Settings/SettingSlice';
import TabPanel from '../Settings/Tab';
import CategoryList from '../Settings/Category';
import TaxList from '../Settings/Tax';
import PaymentMethodList from '../Settings/PaymentMethods';
import SettingsDialog from '../Settings/SettingsDialog';

export default function Settings() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.settings.categories);
    const taxes = useSelector((state) => state.settings.taxes);
    const paymentMethods = useSelector((state) => state.settings.paymentMethods); // Lấy danh sách phương thức thanh toán

    const [tabValue, setTabValue] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({
        newItem: '',
        newTaxRate: '',
        taxId: '',
        paymentName: '',
        image: '',
        modalType: '',
        isEditMode: false,
        editIndex: null,
        validationError: '',
        paymentMethodId: '', 
    });

    useEffect(() => {
        dispatch(fetchSettingsfillCategoryAsync());
        dispatch(fetchSettingsfillTaxAsync());
        dispatch(fetchSettingsfillPaymentAsync());
    }, [dispatch]);

    const handleOpenModal = (type, item = null, index = null) => {
        const newData = { modalType: type, isEditMode: !!item, editIndex: index, validationError: '' };
        if (item) {
            newData.newItem = item.categoryName || item.taxName || item.paymentName;
            newData.taxId = item.taxId || '';
            newData.newTaxRate = item.taxRate || '';
            newData.paymentName = item.paymentName || '';
            newData.image = item.image || '';
            newData.paymentMethodId = item.paymentMethodId || ''; // Đảm bảo `paymentMethodId` được lưu
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
            paymentName: '',
            image: '',
            modalType: '',
            isEditMode: false,
            editIndex: null,
            validationError: '',
            paymentMethodId: '', 
        });
        dispatch(clearError());
    };

    const handleAddOrUpdate = async () => {
        const { newItem, newTaxRate, taxId, paymentName, image, modalType, isEditMode, editIndex, paymentMethodId } = modalData;
        if (!newItem.trim() && modalType !== 'paymentMethod') {
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
        } // Kiểm tra giá trị của tên phương thức thanh toán
        else if (modalType === 'paymentMethod') {
            if (!paymentName.trim() || !image.trim()) {
                setModalData((prev) => ({
                    ...prev,
                    validationError: 'Tên phương thức thanh toán và hình ảnh không được để trống.',
                }));
                return;
            }
            const updatedPaymentMethod = {
                paymentMethodId: isEditMode ? paymentMethodId : undefined, // Sử dụng `paymentMethodId` khi chỉnh sửa
                paymentName,
                image,
            };
            await dispatch(
                isEditMode
                    ? updatePaymentAsync({ paymentMethodId: updatedPaymentMethod.paymentMethodId, updatedPaymentMethod })
                    : addPaymentAsync({ paymentName, image }),
            );
        }
        
        // Tải lại danh sách sau khi thêm hoặc cập nhật
        dispatch(fetchSettingsfillCategoryAsync());
        dispatch(fetchSettingsfillTaxAsync());
        dispatch(fetchSettingsfillPaymentAsync());
        handleCloseModal();
    };

    const handleDelete = (type, id) => {
        dispatch(
            type === 'category'
                ? deleteCategoryAsync(id)
                : type === 'tax'
                ? deleteTaxAsync(id)
                : deletePaymentAsync(id),
        );
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
                    <Tab label="Phương thức thanh toán" />
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
                <TabPanel value={tabValue} index={2}>
                    <PaymentMethodList
                        paymentMethods={paymentMethods}
                        handleOpenModal={handleOpenModal}
                        handleDelete={handleDelete}
                    />
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
