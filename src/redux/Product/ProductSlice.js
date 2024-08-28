// features/products/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/config/axiosInstance';

// Initial state
const initialState = {
  loading: false,
  data: [],
  error: null,
};

// Async thunks
export const fetchProductsAsync = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    const response = await axiosInstance.get('/products'); //đổi chỗ này
    return response.data;
  }
);

export const addProductAsync = createAsyncThunk(
  'product/addProduct',
  async (product) => {
    const response = await axiosInstance.post('/products', product); //đổi chỗ này
    return response.data; 
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (product) => {
    const response = await axiosInstance.put(`/products/${product.productId}`, product); //đổi chỗ này
    return response.data; 
  }
);

export const removeProductAsync = createAsyncThunk(
  'product/removeProduct',
  async (productId) => {
    await axiosInstance.delete(`/products/${productId}`);
    return productId; // Return the productId to remove from state
  }
);

// Slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchProductsAsync
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Handle addProductAsync
    builder.addCase(addProductAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
      state.error = null;
    });
    builder.addCase(addProductAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Handle updateProductAsync
    builder.addCase(updateProductAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.map((product) =>
        product.productId === action.payload.productId ? action.payload : product
      );
      state.error = null;
    });
    builder.addCase(updateProductAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Handle removeProductAsync
    builder.addCase(removeProductAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeProductAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((product) => product.productId !== action.payload);
      state.error = null;
    });
    builder.addCase(removeProductAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
