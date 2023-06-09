import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../reducers/productSlice'
import categoryReducer from '../reducers/categoriesSlice'
import cartReducer from '../reducers/cartSlice'
import userReducer from '../reducers/userSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    cart: cartReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch