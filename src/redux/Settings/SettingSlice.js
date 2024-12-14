import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosSecure } from '../../config/axiosInstance';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
    position: {
        x: 'right',
        y: 'top',
    },
    dismissible: true,
});

// Fetch categories
export const fetchSettingsfillCategoryAsync = createAsyncThunk('settings/fetchSettingsfillCategoryAsync', async () => {
    const response = await axiosSecure.get('/api/category/getAllActive');
    return response.data.data;
});

// Add a category
export const addCategoryAsync = createAsyncThunk('settings/addCategoryAsync', async (newCategory) => {
    const categoryWithDefault = {
        ...newCategory,
        isDelete: false,
    };

    const response = await axiosSecure.post('/api/category/create', categoryWithDefault);
    return response.data;
});

// Update a category
export const updateCategoryAsync = createAsyncThunk('settings/updateCategoryAsync', async ({ updatedCategory }) => {
    const response = await axiosSecure.put(`/api/category/update`, updatedCategory);
    return response.data;
});

// Delete a category
export const deleteCategoryAsync = createAsyncThunk('settings/deleteCategoryAsync', async (categoryId) => {
    try {
        await axiosSecure.delete(`/api/category/delete/${categoryId}`);
        return categoryId; // Trả về ID đã xóa
    } catch (error) {
        notyf.error('Không thể xóa');
    }
});

// Fetch taxes
export const fetchSettingsfillTaxAsync = createAsyncThunk('settings/fetchSettingsfillTaxAsync', async () => {
    const response = await axiosSecure.get('/api/tax/getAllActive');
    return response.data.data;
});

// Add a tax
export const addTaxAsync = createAsyncThunk('settings/addTaxAsync', async (newTax) => {
    const taxWithDefault = {
        ...newTax,
        isDelete: false,
    };

    const response = await axiosSecure.post('/api/tax/create', taxWithDefault);
    return response.data;
});

// Update a tax
export const updateTaxAsync = createAsyncThunk('settings/updateTaxAsync', async ({ updatedTax }) => {
    const response = await axiosSecure.put(`/api/tax/update`, updatedTax);
    return response.data;
});

// Delete a tax
export const deleteTaxAsync = createAsyncThunk('settings/deleteTaxAsync', async (taxId) => {
    try {
        await axiosSecure.delete(`/api/tax/delete/${taxId}`);
        return taxId; // Trả về ID đã xóa
    } catch (error) {
        notyf.error('Không thể xóa');
    }
});

// Fetch a Payment
export const fetchSettingsfillPaymentAsync = createAsyncThunk('settings/fetchSettingsfillPaymentAsync', async () => {
    const response = await axiosSecure.get('/api/paymentmethods/getAllPaymentMethods');
    return response.data.data;
});

// Fetch taxes
export const fetchAllRole = createAsyncThunk('settings/fetchAllRole', async () => {
    const response = await axiosSecure.get('/api/role/getAll');
    return response.data.data;
});

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        categories: [],
        taxes: [],
        roles: [],
        paymentMethods: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch categories
            .addCase(fetchSettingsfillCategoryAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSettingsfillCategoryAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchSettingsfillCategoryAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addCategoryAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.push(action.payload); // Thêm category vào danh sách
            })
            .addCase(addCategoryAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Xử lý lỗi
            })
            .addCase(updateCategoryAsync.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.categories.findIndex((cat) => cat.categoryId === action.payload.categoryId);
                if (index !== -1) {
                    state.categories[index] = action.payload; // Cập nhật category
                }
            })
            .addCase(updateCategoryAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Xử lý lỗi
            })
            .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
                state.categories = state.categories.filter((cat) => cat.categoryId !== action.payload); // Xóa category
            })

            // Fetch taxes
            .addCase(fetchSettingsfillTaxAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSettingsfillTaxAsync.fulfilled, (state, action) => {
                state.loading = false;
                let taxes = action.payload;
                taxes.forEach((tax) => {
                    tax.taxRate = tax.taxRate * 100;
                });
                state.taxes = taxes; // Gán dữ liệu trả về vào taxes
            })
            .addCase(fetchSettingsfillTaxAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Xử lý lỗi
            })
            // Add tax
            .addCase(addTaxAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.taxes.push(action.payload); // Thêm thuế vào danh sách
            })
            .addCase(addTaxAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Xử lý lỗi
            })
            // Update tax
            .addCase(updateTaxAsync.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.taxes.findIndex((tax) => tax.taxId === action.payload.taxId);
                if (index !== -1) {
                    state.taxes[index] = action.payload; // Cập nhật thuế
                }
            })
            .addCase(updateTaxAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Xử lý lỗi
            })
            // Delete tax
            .addCase(deleteTaxAsync.fulfilled, (state, action) => {
                state.taxes = state.taxes.filter((tax) => tax.taxId !== action.payload); // Xóa thuế
            })
            // Fetch Payment
            .addCase(fetchAllRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllRole.fulfilled, (state, action) => {
                state.loading = false;
                state.roles = action.payload;
            })
            .addCase(fetchAllRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Xử lý lỗi
            });
    },
});

export const { clearError } = settingsSlice.actions;
export default settingsSlice.reducer;
