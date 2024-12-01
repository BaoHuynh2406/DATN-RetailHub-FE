// pointHistorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const extractErrorMessage = (error) => {
    if (error.response) {
        return error.response.data?.message || 'Lỗi máy chủ không xác định';
    } else if (error.request) {
        return 'Không có phản hồi từ máy chủ';
    } else {
        return error.message || 'Lỗi không xác định';
    }
};

// Lấy lịch sử điểm theo khách hàng với phân trang
export const fetchPointHistoryAsync = createAsyncThunk(
    'pointHistory/fetchPointHistoryAsync',
    async ({ customerId, page, size }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/v1/point-history/history-list/${customerId}?page=${page}&size=${size}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    }
);

// Định nghĩa slice cho lịch sử điểm
const pointHistorySlice = createSlice({
    name: 'pointHistory',
    initialState: {
        data: [], // Đảm bảo trạng thái mặc định của data là một mảng rỗng
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPointHistoryAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPointHistoryAsync.fulfilled, (state, action) => {
                state.data = action.payload || []; // Xử lý trường hợp action.payload là undefined
                state.loading = false;
            })
            .addCase(fetchPointHistoryAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default pointHistorySlice.reducer;
