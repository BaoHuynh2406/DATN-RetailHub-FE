import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosSecure } from '@/config/axiosInstance';

// Hàm tiện ích để trích xuất thông báo lỗi
const extractErrorMessage = (error) => {
    if (error.response) {
        return error.response.data?.message || 'Lỗi máy chủ không xác định';
    } else if (error.request) {
        return 'Không có phản hồi từ máy chủ';
    } else {
        return error.message || 'Lỗi không xác định';
    }
};

// Thêm khách hàng
export const addCustomerAsync = createAsyncThunk(
    'customers/addCustomerAsync',
    async (customer, { rejectWithValue }) => {
        try {
            const response = await axiosSecure.post('/api/customer/create', customer);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

// Cập nhật khách hàng
export const updateCustomerAsync = createAsyncThunk(
    'customers/updateCustomerAsync',
    async (customer, { dispatch, getState, rejectWithValue }) => {
        try {
            dispatch(updateCustomer(customer));
            const response = await axiosSecure.put('/api/customer/update', customer);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

// Xóa khách hàng
export const removeCustomerAsync = createAsyncThunk(
    'customers/removeCustomerAsync',
    async (customerId, { dispatch, rejectWithValue }) => {
        dispatch(removeCustomer(customerId));
        try {
            await axiosSecure.delete(`/api/customer/Delete/${customerId}`);
        } catch (error) {
            dispatch(restoreCustomer(customerId));
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

// Khôi phục khách hàng
export const restoreCustomerAsync = createAsyncThunk(
    'customers/restoreCustomerAsync',
    async (customerId, { dispatch, rejectWithValue }) => {
        dispatch(restoreCustomer(customerId));
        try {
            await axiosSecure.post(`/api/customer/restore/${customerId}`);
        } catch (error) {
            dispatch(removeCustomer(customerId));
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

// Lấy tất cả khách hàng chưa bị xóa
export const fetchCustomersAsync = createAsyncThunk(
    'customers/fetchCustomersAsync',
    async ({ page, size }, { rejectWithValue }) => {
        try {
            const response = await axiosSecure.get('/api/v2/customer/getAll', {
                params: {
                    page: page,
                    size: size,
                },
            });
            console.log(response.data.data);

            return response.data.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

// Lấy khách hàng theo ID
export const fetchCustomerByIdAsync = createAsyncThunk(
    'customers/fetchCustomerByIdAsync',
    async (customerId, { rejectWithValue }) => {
        try {
            const response = await axiosSecure.get(`/api/customer/${customerId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

// Lấy khách hàng theo số điện thoại
export const fetchCustomerByPhoneNumberAsync = createAsyncThunk(
    'customers/fetchCustomerByPhoneNumberAsync',
    async (phoneNumber, { rejectWithValue }) => {
        try {
            const response = await axiosSecure.get(`/api/customer/getByPhoneNumber/${phoneNumber}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

// Lấy tất cả khách hàng đã bị xóa
export const fetchAllDeletedCustomersAsync = createAsyncThunk(
    'customers/fetchAllDeletedCustomersAsync',
    async ({ page, size }, { rejectWithValue }) => {
        try {
            const response = await axiosSecure.get('/api/v2/customer/deleted', {
                params: {
                    page: page,
                    size: size,
                },
            });
            return response.data.data?.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

// Định nghĩa slice cho khách hàng
const customersSlice = createSlice({
    name: 'customers',
    initialState: {
        data: [],
        currentData: null,
        deletedCustomers: [],
        loading: false,
        error: null,
    },
    reducers: {
        addCustomer: (state, action) => {
            state.data.push(action.payload);
        },
        removeCustomer: (state, action) => {
            state.data = state.data.map((customer) =>
                customer.customerId === action.payload ? { ...customer, isDelete: true } : customer,
            );
        },
        updateCustomer: (state, action) => {
            state.data = state.data.map((cust) =>
                cust.customerId === action.payload.customerId ? { ...cust, ...action.payload } : cust,
            );
        },
        restoreCustomer: (state, action) => {
            state.data = state.data.map((customer) =>
                customer.customerId === action.payload ? { ...customer, isDelete: false } : customer,
            );
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setDeletedCustomers: (state, action) => {
            state.deletedCustomers = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Xử lý khôi phục khách hàng trong extraReducers
            .addCase(restoreCustomerAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(restoreCustomerAsync.fulfilled, (state, action) => {
                state.data = state.data.map((customer) =>
                    customer.customerId === action.payload.customerId ? { ...customer, isDelete: false } : customer,
                );
                state.loading = false;
            })
            .addCase(restoreCustomerAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            //
            .addCase(fetchCustomerByIdAsync.fulfilled, (state, action) => {
                state.currentData = action.payload;
                state.loading = false;
            })
            .addCase(fetchCustomerByIdAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            //
            .addCase(fetchCustomerByPhoneNumberAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomerByPhoneNumberAsync.fulfilled, (state, action) => {
                state.currentData = action.payload;
                state.loading = false;
            })
            .addCase(fetchCustomerByPhoneNumberAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            //
            .addCase(fetchCustomersAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(fetchCustomersAsync.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchCustomersAsync.pending, (state, action) => {
                state.error = false;
                state.loading = true;
            })
            //
            .addCase(fetchAllDeletedCustomersAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllDeletedCustomersAsync.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchAllDeletedCustomersAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

// Xuất các actions và reducer
export const { addCustomer, removeCustomer, updateCustomer, restoreCustomer, setError, setDeletedCustomers } =
    customersSlice.actions;

export default customersSlice.reducer;
