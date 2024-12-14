import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosSecure, axiosPublic } from '@/config/axiosInstance';

// Initial state
const initialState = {
    loading: false,
    data: [],
    error: null,
};

// END POINT GET ALL DISCOUNT
export const fetchAllDiscounts = createAsyncThunk(
    'discount/fetchAllDiscounts',
    async ({ page = 1, size = 10 }, { rejectWithValue }) => {
        try {
            const response = await axiosSecure.get('/api/discount/all', {
                params: {
                    page: page,
                    size: size,
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
const discountSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch User Current
            .addCase(fetchAllDiscounts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllDiscounts.fulfilled, (state, action) => {
                state.loading = false;
                const res = action.payload;

                // Giữ nguyên các thuộc tính của res, chỉ thay đổi mảng `data`
                if (res && Array.isArray(res.data)) {
                    state.data = {
                        ...res,
                        data: res.data.map((item) => ({
                            ...item,
                            startDate: formatDateTime(item.startDate),
                            endDate: formatDateTime(item.endDate),
                        })),
                    };
                } else {
                    state.data = []; // Gán null nếu dữ liệu không hợp lệ
                }
            })
            .addCase(fetchAllDiscounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.data = [];
            });
    },
});

export default discountSlice.reducer;
