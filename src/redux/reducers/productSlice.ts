import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from '../../@types';


export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  loading: false,
};

export const fetchProducts = createAsyncThunk("fetchProducts" , async () => {
    const response = await axios.get('https://fakestoreapi.com/products')
    return response.data
})

export const fetchFilteredProducts = createAsyncThunk("fetchFilteredProducts" , async (category: string) => {
    const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`)
    return response.data
})

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
    });
    builder.addCase(fetchFilteredProducts.pending, (state, action) => {
        state.loading = true;
    });
    builder.addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload;
    });
    builder.addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.filteredProducts = [];
    });
}
});


export default productSlice.reducer;
