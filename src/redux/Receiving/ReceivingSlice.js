import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosSecure } from '@/config/axiosInstance';

//Lấy tất cả phiểu nhập hàng
export const fetchAllReciving = createAsyncThunk(
    'receiving/fetchAllReciving',
    async ({ page, size }, { rejectWithValue }) => {
        try {
            const response = await axiosSecure.get('/api/receiving/findAllReceiving', {
                params: {
                    page: page,
                    size: size,
                },
            });

            return response.data.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

const receivingSlice = createSlice({
    name: 'receiving',
    initialState: {
        data: [],
        currentData: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllReciving.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllReciving.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchAllReciving.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.data = [];
            });
    },
});
export default receivingSlice.reducer;
