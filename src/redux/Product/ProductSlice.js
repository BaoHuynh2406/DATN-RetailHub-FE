import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosSecure } from '@/config/axiosInstance';

// Hàm tiện ích để trích xuất thông báo lỗi
const extractErrorMessage = (error) => {
  console.error('Error details:', error); // Log error for debugging
  return error.response?.data?.message || error.message || 'An unknown error occurred';
};

// Các Thunks cho sản phẩm

// Lấy tất cả sản phẩm
export const fetchProductsAsync = createAsyncThunk('products/fetchProductsAsync', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosSecure.get('/api/product/getAllProducts');
    return response.data.data;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error));
  }
});

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
  }
);

// Lấy sản phẩm chưa bị xóa (trạng thái còn khả dụng)
export const fetchAvailableProductsAsync = createAsyncThunk(
  'products/fetchAvailableProductsAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.get('/api/product/getAll-available-product');
      return response.data.data; // Ensure `data.data` contains the list of available products
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Lấy sản phẩm đã bị xóa
export const fetchDeletedProductsAsync = createAsyncThunk(
  'products/fetchDeletedProductsAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.get('/api/product/getAll-deleted-product');
      return response.data.data; // Ensure `data.data` contains the list of deleted products
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
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
  }
);

// Xóa sản phẩm (cập nhật trạng thái xóa)
export const removeProductAsync = createAsyncThunk(
  'products/removeProductAsync',
  async (productId, { dispatch, rejectWithValue }) => {
    dispatch(removeProduct(productId)); // Cập nhật lạc quan
    try {
      await axiosSecure.delete(`/api/product/delete/${productId}`);
    } catch (error) {
      dispatch(restoreProduct(productId)); // Hoàn tác nếu có lỗi xảy ra
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Cập nhật sản phẩm
export const updateProductAsync = createAsyncThunk(
  'products/updateProductAsync',
  async (product, { dispatch, getState, rejectWithValue }) => {
    const currentProduct = getState().products.data.find((prod) => prod.productId === product.productId);
    dispatch(updateProduct(product)); // Cập nhật lạc quan

    try {
      const response = await axiosSecure.put('/api/product/update', product);
      return response.data.data;
    } catch (error) {
      dispatch(updateProduct(currentProduct)); // Hoàn tác nếu có lỗi xảy ra
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Khôi phục sản phẩm đã xóa
export const restoreProductAsync = createAsyncThunk(
  'products/restoreProductAsync',
  async (productId, { dispatch, rejectWithValue }) => {
    dispatch(restoreProduct(productId)); // Cập nhật lạc quan
    try {
      await axiosSecure.put(`/api/product/restore/${productId}`);
    } catch (error) {
      dispatch(removeProduct(productId)); // Hoàn tác nếu có lỗi xảy ra
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Định nghĩa slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    data: [], // Danh sách sản phẩm
    availableProducts: [], // Sản phẩm chưa bị xóa
    deletedProducts: [], // Sản phẩm đã bị xóa
    currentData: null, // Dữ liệu của sản phẩm hiện tại
    loading: false, // Trạng thái tải dữ liệu
    error: null, // Lưu trữ lỗi nếu có
  },
  reducers: {
    // Thêm sản phẩm vào danh sách
    addProduct: (state, action) => {
      state.data.push(action.payload);
    },
    // Đánh dấu sản phẩm là đã xóa
    removeProduct: (state, action) => {
      state.data = state.data.map((product) =>
        product.productId === action.payload ? { ...product, status: false } : product
      );
    },
    // Cập nhật thông tin sản phẩm
    updateProduct: (state, action) => {
      state.data = state.data.map((prod) =>
        prod.productId === action.payload.productId ? { ...prod, ...action.payload } : prod
      );
    },
    // Khôi phục sản phẩm đã bị đánh dấu xóa
    restoreProduct: (state, action) => {
      state.data = state.data.map((product) =>
        product.productId === action.payload ? { ...product, status: true } : product
      );
    },
    // Đặt thông báo lỗi
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý khi lấy tất cả sản phẩm
      .addCase(fetchProductsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Xử lý khi lấy sản phẩm chưa bị xóa
      .addCase(fetchAvailableProductsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableProductsAsync.fulfilled, (state, action) => {
        state.availableProducts = action.payload;
        state.loading = false;
      })
      .addCase(fetchAvailableProductsAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Xử lý khi lấy sản phẩm đã bị xóa
      .addCase(fetchDeletedProductsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeletedProductsAsync.fulfilled, (state, action) => {
        state.deletedProducts = action.payload;
        state.loading = false;
      })
      .addCase(fetchDeletedProductsAsync.rejected, (state, action) => {
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
