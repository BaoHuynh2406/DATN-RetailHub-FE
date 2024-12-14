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
                state.data = action.payload;
            })
            .addCase(fetchAllDiscounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.data = [];
            });
    },
});

export default discountSlice.reducer;
