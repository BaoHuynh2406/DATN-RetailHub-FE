import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosSecure } from '@/config/axiosInstance';

// Hàm để trích xuất thông báo lỗi từ response
const extractErrorMessage = (error) => {
    if (error.response) {
        return error.response.data?.message || 'Lỗi máy chủ không xác định';
    } else if (error.request) {
        return 'Không có phản hồi từ máy chủ';
    } else {
        return error.message || 'Lỗi không xác định';
    }
};

// Lấy toàn bộ lịch sử điểm với phân trang
export const fetchAllPointHistoriesAsync = createAsyncThunk(
    'pointHistory/fetchAllPointHistoriesAsync',
    async ({ page, size }, { rejectWithValue }) => {
        try {
            const response = await axiosSecure.get('api/v1/point-history/history-list', {
                params: {
                    page: page,
                    size: size,
                },
            });
            return response.data.data || []; // Trả về mảng rỗng nếu không có dữ liệu
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error)); // Trả về lỗi nếu có
        }
    }
);

// Lấy lịch sử điểm theo khách hàng với phân trang
export const fetchPointHistoryAsync = createAsyncThunk(
    'pointHistory/fetchPointHistoryAsync',
    async ({ customerId, page, size }, { rejectWithValue }) => {
        try {
            const response = await axiosSecure.get(`/api/v1/point-history/history-list/${customerId}`, {
                params: {
                    page: page,
                    size: size,
                },
            });
            return response.data.data || []; // Trả về mảng rỗng nếu không có dữ liệu
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error)); // Trả về lỗi nếu có
        }
    }
);

// Tạo mới một lịch sử điểm
export const createPointHistoryAsync = createAsyncThunk(
    'pointHistory/createPointHistoryAsync',
    async (historyRequest, { rejectWithValue }) => {
        try {
            const response = await axiosSecure.post('/api/v1/point-history/exchange', historyRequest);
            return response.data.data || {}; // Trả về đối tượng rỗng nếu không có dữ liệu
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error)); // Trả về lỗi nếu có
        }
    }
);

// Định nghĩa slice cho lịch sử điểm
const pointHistorySlice = createSlice({
    name: 'pointHistory',
    initialState: {
        data: [], // Trạng thái mặc định là mảng rỗng
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPointHistoriesAsync.pending, (state) => {
                console.log("Đang tải dữ liệu lịch sử điểm...");
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllPointHistoriesAsync.fulfilled, (state, action) => {
                console.log("Dữ liệu lịch sử điểm đã tải:", action.payload);
                // Lấy dữ liệu từ trường 'content' nếu có, tránh lấy dữ liệu không hợp lệ
                state.data = action.payload?.content || [];  // Đảm bảo lấy đúng trường dữ liệu
                state.loading = false;
            })
            .addCase(fetchAllPointHistoriesAsync.rejected, (state, action) => {
                // Kiểm tra và log lỗi chi tiết hơn
                const errorMessage = action.payload || action.error?.message || 'Lỗi không xác định';
                console.log("Lỗi khi tải dữ liệu lịch sử điểm:", errorMessage);
                state.error = errorMessage;  // Lưu thông báo lỗi vào state
                state.loading = false;
            })
            .addCase(fetchPointHistoryAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPointHistoryAsync.fulfilled, (state, action) => {
                state.data = action.payload || []; // Xử lý khi không có dữ liệu
                state.loading = false;
            })
            .addCase(fetchPointHistoryAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(createPointHistoryAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPointHistoryAsync.fulfilled, (state, action) => {
                state.data.push(action.payload); // Thêm lịch sử điểm mới vào mảng
                state.loading = false;
            })
            .addCase(createPointHistoryAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default pointHistorySlice.reducer;
