import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosSecure, axiosPublic } from '@/config/axiosInstance';

// Initial state
const initialState = {
    loading: false,
    data: null,
    error: null,
};
// Gửi mã xác nhận đến email
export const sendResetPasswordCode = createAsyncThunk(
    'userCurrent/sendResetPasswordCode',
    async (email, { rejectWithValue }) => {
        try {
            const response = await axiosPublic.post('/api-public/auth/send-otp', { email });
            return response.data.message; // Giả định API trả về message xác nhận
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to send reset code');
        }
    },
);

// Đặt lại mật khẩu
export const resetPassword = createAsyncThunk('/api-public/auth/verify-otp', async (data, { rejectWithValue }) => {
    try {
        const response = await axiosPublic.post('/api-public/auth/verify-otp', data); // data gồm email, otpCode, newPassword
        return response.data.message; // Giả định API trả về message xác nhận
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to reset password');
    }
});

// Create the slice
const forgotPasswordSlice = createSlice({
    name: 'userCurrent',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Gửi mã xác nhận
            .addCase(sendResetPasswordCode.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendResetPasswordCode.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload; // Lưu message hoặc trạng thái xác nhận
            })
            .addCase(sendResetPasswordCode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Đặt lại mật khẩu
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload; // Lưu trạng thái thành công
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default forgotPasswordSlice.reducer;
