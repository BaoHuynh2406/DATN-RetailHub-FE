import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosSecure } from '@/config/axiosInstance';

// Hàm tiện ích để trích xuất thông báo lỗi
const extractErrorMessage = (error) => {
    if (error.response) {
        // Lỗi phản hồi từ máy chủ
        return error.response.data?.message || 'Lỗi máy chủ không xác định';
    } else if (error.request) {
        // Yêu cầu được gửi nhưng không nhận được phản hồi
        return 'Không có phản hồi từ máy chủ';
    } else {
        // Lỗi xảy ra trong quá trình thiết lập yêu cầu
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
            // Trích xuất thông điệp lỗi từ phản hồi của API
            return rejectWithValue(extractErrorMessage(error));
        }
    }
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
    }
);
// Xóa khách hàng
export const removeCustomerAsync = createAsyncThunk(
    'customers/removeCustomerAsync',
    async (customerId, { dispatch, rejectWithValue }) => {
        dispatch(removeCustomer(customerId)); // Cập nhật lạc quan
        try {
            await axiosSecure.delete(`/api/customer/Delete/${customerId}`);
        } catch (error) {
            dispatch(restoreCustomer(customerId)); // Hoàn tác nếu lỗi xảy ra
            return rejectWithValue(extractErrorMessage(error));
        }
    }
);


// Khôi phục khách hàng
export const restoreCustomerAsync = createAsyncThunk(
    'customers/restoreCustomerAsync',
    async (customerId, { dispatch, rejectWithValue }) => {
        dispatch(restoreCustomer(customerId)); // Cập nhật lạc quan
        try {
            await axiosSecure.post(`/api/customer/restore/${customerId}`);
        } catch (error) {
            dispatch(removeCustomer(customerId)); // Hoàn tác nếu lỗi xảy ra
            return rejectWithValue(extractErrorMessage(error));
        }
    }
);

// Lấy tất cả khách hàng
export const fetchCustomersAsync = createAsyncThunk(
    'customers/fetchCustomersAsync',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosSecure.get('/api/customer/getAll');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    }
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
    }
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
    }
);

// Lấy tất cả khách hàng đã bị xóa
export const fetchAllDeletedCustomersAsync = createAsyncThunk(
    'customers/fetchAllDeletedCustomersAsync',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosSecure.get('/api/customer/deleted');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    }
);

// Định nghĩa slice cho khách hàng
const customersSlice = createSlice({
    name: 'customers',
    initialState: {
        data: [],
        currentData: null,
        deletedCustomers: [], // Thêm trường để lưu khách hàng đã xóa
        loading: false,
        error: null,
    },
    reducers: {
        addCustomer: (state, action) => {
            state.data.push(action.payload);
        },
        removeCustomer: (state, action) => {
            state.data = state.data.map((customer) =>
                customer.customerId === action.payload ? { ...customer, isDelete: true } : customer
            );
        },
        updateCustomer: (state, action) => {
            state.data = state.data.map((cust) =>
                cust.customerId === action.payload.customerId ? { ...cust, ...action.payload } : cust
            );
        },
        restoreCustomer: (state, action) => {
            state.data = state.data.map((customer) =>
                customer.customerId === action.payload ? { ...customer, isDelete: false } : customer
            );
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setDeletedCustomers: (state, action) => {
            state.deletedCustomers = action.payload; // Thêm khách hàng đã xóa vào state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomersAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomersAsync.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchCustomersAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(fetchCustomerByIdAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomerByIdAsync.fulfilled, (state, action) => {
                state.currentData = action.payload;
                state.loading = false;
            })
            .addCase(fetchCustomerByIdAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
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
            .addCase(fetchAllDeletedCustomersAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllDeletedCustomersAsync.fulfilled, (state, action) => {
                state.deletedCustomers = action.payload; // Cập nhật khách hàng đã xóa
                state.loading = false;
            })
            .addCase(fetchAllDeletedCustomersAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(addCustomerAsync.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(addCustomerAsync.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(removeCustomerAsync.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(removeCustomerAsync.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateCustomerAsync.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(updateCustomerAsync.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(restoreCustomerAsync.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(restoreCustomerAsync.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { addCustomer, removeCustomer, updateCustomer, restoreCustomer, setError, setDeletedCustomers } = customersSlice.actions;

export default customersSlice.reducer;
