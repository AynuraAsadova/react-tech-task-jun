import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface CategoryState {
    categories: [] | string[];
}

const initialState: CategoryState = {
  categories: [],
};

export const fetchCategories = createAsyncThunk("fetchCategories" , async () => {
    const response = await axios.get('https://fakestoreapi.com/products/categories')
    return response.data
})

export const categoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending , (state , action) => {
    });
    builder.addCase(fetchCategories.fulfilled , (state , action) => {
        state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected , (state , action) => {
    });
}
});


export default categoriesSlice.reducer;
