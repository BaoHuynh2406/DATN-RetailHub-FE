import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosSecure } from '@/config/axiosInstance';

// Hàm tiện ích để trích xuất thông báo lỗi
const extractErrorMessage = (error) => {
    console.error('Error details:', error); // Log error for debugging
    return error.response?.data?.message || error.message || 'An unknown error occurred';
};

// Các Thunks cho sản phẩm

// Lấy tất cả sản phẩm chưa xóa
export const fetchProductsAvailableAsync = createAsyncThunk(
    'products/fetchProductsAvailableAsync',
    async ({ page, size }, { rejectWithValue }) => {
        try {
            const response = await axiosSecure.get('/api/v2/product/getAll-available-product', {
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

// Lấy tất cả sản phẩm đã xóa
export const fetchProductsDeletedAsync = createAsyncThunk(
    'products/fetchProductsDeletedAsync',
    async ({ page, size }, { rejectWithValue }) => {
        try {
            const response = await axiosSecure.get('/api/v2/product/getAll-deleted-product', {
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

// Lấy sản phẩm theo ID
export const fetchProductByIdAsync = createAsyncThunk(
    'products/fetchProductByIdAsync',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axiosSecure.get(`/api/product/${productId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

// Thêm sản phẩm mới
export const addProductAsync = createAsyncThunk(
    'products/addProductAsync',
    async (product, { dispatch, rejectWithValue }) => {
        dispatch(addProduct(product)); // Cập nhật lạc quan
        try {
            const response = await axiosSecure.post('/api/product/create', product);
            return response.data.data;
        } catch (error) {
            dispatch(removeProduct(product.productId)); // Hoàn tác nếu có lỗi xảy ra
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

// Xóa sản phẩm (cập nhật trạng thái xóa)
export const removeProductAsync = createAsyncThunk(
    'products/removeProductAsync',
    async (productId, { dispatch, rejectWithValue }) => {
        dispatch(removeProduct(productId));
        try {
            await axiosSecure.delete(`/api/product/delete/${productId}`);
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

// Cập nhật sản phẩm
export const updateProductAsync = createAsyncThunk(
    'products/updateProductAsync',
    async (product, { dispatch, rejectWithValue }) => {
        dispatch(updateProduct(product));
        try {
            const response = await axiosSecure.put('/api/product/update', product);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

// Khôi phục sản phẩm đã xóa
export const restoreProductAsync = createAsyncThunk(
    'products/restoreProductAsync',
    async (productId, { dispatch, rejectWithValue }) => {
        dispatch(removeProduct(productId));
        try {
            await axiosSecure.put(`/api/product/restore/${productId}`);
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    },
);

// Định nghĩa slice
const productSlice = createSlice({
    name: 'products',
    initialState: {
        data: [],
        currentData: null,
        loading: false,
        error: null,
    },
    reducers: {
        // Thêm sản phẩm vào danh sách
        addProduct: (state, action) => {
            state.data.data.push(action.payload);
        },
        // Đánh dấu sản phẩm là đã xóa
        removeProduct: (state, action) => {
            if (state.data.data) {
                state.data.data = state.data.data.filter((product) => product.productId != action.payload);
            }
            state.currentData = null;
        },
        // Cập nhật thông tin sản phẩm
        updateProduct: (state, action) => {
            if (state.data.data) {
                state.data.data = state.data.data.map((prod) =>
                    prod.productId == action.payload.productId ? { ...prod, ...action.payload } : prod,
                );
            }
            state.currentData = action.payload;
        },

        // Đặt thông báo lỗi
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Xử lý khi lấy sản phẩm chưa bị xóa
            .addCase(fetchProductsAvailableAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsAvailableAsync.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchProductsAvailableAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // Xử lý khi lấy sản phẩm đã bị xóa
            .addCase(fetchProductsDeletedAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsDeletedAsync.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchProductsDeletedAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // Xử lý khi lấy sản phẩm theo ID
            .addCase(fetchProductByIdAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
                state.currentData = action.payload;
                state.loading = false;
            })
            .addCase(fetchProductByIdAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // Xử lý thêm sản phẩm
            .addCase(addProductAsync.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(addProductAsync.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Xử lý xóa sản phẩm
            .addCase(removeProductAsync.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(removeProductAsync.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Xử lý cập nhật sản phẩm
            .addCase(updateProductAsync.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(updateProductAsync.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Xử lý khôi phục sản phẩm
            .addCase(restoreProductAsync.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(restoreProductAsync.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

// Xuất các action và reducer
export const { addProduct, removeProduct, updateProduct, restoreProduct, setError } = productSlice.actions;
export default productSlice.reducer;
