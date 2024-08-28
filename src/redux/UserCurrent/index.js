import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosSecure, axiosPublic } from '@/config/axiosInstance';

// Initial state
const initialState = {
    loading: false,
    data: null,
    error: null,
};

// END POINT GET USER CURRENT STATE
export const fetchUserCurrent = createAsyncThunk('userCurrent/fetchUserCurrent', async () => {
    const response = await axiosSecure.get('/api/user/my-info').catch(function (err) {        
        throw new Error(err);
    });

    return response.data.data;
});

// END POINT LOGIN
export const postUserLogin = createAsyncThunk('userCurrent/login', async (user, { dispatch }) => {
    try {
        const response = await axiosPublic.post('/api-public/auth/login', user);

        if (response.data.data && response.data.data.token) {
            localStorage.setItem('token', response.data.data.token);
            const fetchResult = await dispatch(fetchUserCurrent()).unwrap();
            return fetchResult;
        } else {
            throw new Error('Login failed: Invalid response data');
        }
    } catch (error) {
        localStorage.removeItem('token');
        throw error.response.data.message;
    }
});

// Create the slice
const userCurrentSlice = createSlice({
    name: 'userCurrent',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch User Current
            .addCase(fetchUserCurrent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserCurrent.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUserCurrent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.data = null;
            })

            // User Login
            .addCase(postUserLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postUserLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(postUserLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default userCurrentSlice.reducer;
