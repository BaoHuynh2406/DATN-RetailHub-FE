import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosSecure } from '@/config/axiosInstance'; // Giả sử axiosSecure đã được cấu hình đúng

// Initial state
const initialState = {
    loading: false,
    data: [], // Khởi tạo là mảng rỗng thay vì null
    error: null,
};

// Fetch sales volume statistics
export const fetchSalesVolumeStatistics = createAsyncThunk(
    'outProduct/fetchSalesVolumeStatistics',
    async ({ page, size, startDate, endDate, sort }, { rejectWithValue }) => {
        try {
            const response = await axiosSecure.get('/api/thong-ke/invoice-SalesVolumeStatistics', {
                params: { startDate, endDate, sort, page: page, pageSize: size },
            });
            return response.data.data; // Giả sử dữ liệu trả về có trường `data`
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

// Create slice
const outProductSlice = createSlice({
    name: 'outProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Common handling for all thunks
        const handlePending = (state) => {
            state.loading = true;
            state.error = null;
        };

        const handleFulfilled = (state, action) => {
            state.loading = false;
            // Kiểm tra nếu payload là null hoặc không có dữ liệu
            state.data = action.payload || []; // Trả về mảng rỗng nếu không có dữ liệu
        };

        const handleRejected = (state, action) => {
            state.loading = false;
            state.error = action.payload;
        };

        // Add cases for the fetchSalesVolumeStatistics thunk
        builder
            .addCase(fetchSalesVolumeStatistics.pending, handlePending)
            .addCase(fetchSalesVolumeStatistics.fulfilled, handleFulfilled)
            .addCase(fetchSalesVolumeStatistics.rejected, handleRejected);
    },
});

export default outProductSlice.reducer;
