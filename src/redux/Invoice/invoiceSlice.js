import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosSecure, axiosPublic } from '@/config/axiosInstance';

// Initial state
const initialState = {
    loading: false,
    data: [],
    error: null,
};

// END POINT GET INVOICES
export const fetchInvoices = createAsyncThunk(
    'invoice/fetchInvoices',
    async ({ page, size, startDate, endDate, status, sort }, { rejectWithValue }) => {
        try {
            const response = await axiosSecure.get('/api/v2/invoice/list', {
                params: {
                    page: page,
                    size: size,
                    startDate: startDate,
                    endDate: endDate,
                    status: status,
                    sort: sort,
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

const formatDateTime = (isoString) => {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    return new Date(isoString).toLocaleString('vi-VN', options);
};

// Create the slice
const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch User Current
            .addCase(fetchInvoices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInvoices.fulfilled, (state, action) => {
                state.loading = false;
                const res = action.payload;

                // Giữ nguyên các thuộc tính của res, chỉ thay đổi mảng `data`
                if (res && Array.isArray(res.data)) {
                    state.data = {
                        ...res,
                        data: res.data.map((item) => ({
                            ...item,
                            invoiceDate: formatDateTime(item.invoiceDate), // Chuyển đổi định dạng ngày tháng
                        })),
                    };
                } else {
                    state.data = []; // Gán null nếu dữ liệu không hợp lệ
                }
            })
            .addCase(fetchInvoices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.data = null;
            });
    },
});

export default invoiceSlice.reducer;
