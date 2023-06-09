import { createSlice } from "@reduxjs/toolkit";
import { Product } from '../../@types';
import { notification } from 'antd';


export interface CartState {
  cartItems: Product[];
  cartTotalQuantity: number
  cartTotalAmount: number,
}

const initialState: CartState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};


export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
        const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
        if(itemIndex >=0) {
            state.cartItems[itemIndex].cartQuantity += 1;
            notification["success"]({
                message: "Operation was successfull!",
                description: `${action.payload.title} added to cart`,
              });
        } else{
            state.cartItems.push({ ...action.payload, cartQuantity: 1})
            notification["success"]({
                message: "Operation was successfull!",
                description: `${action.payload.title} added to cart`,
              });
        }
    },
    removeProduct: (state,action) => {
        const deleteItem = state.cartItems.filter(item => item.id !== action.payload.id)
        state.cartItems = deleteItem;
        notification["success"]({
            message: "Operation was successfull!",
            description: `${action.payload.title} deleted from cart`,
          });
      },
      decreaseProduct: (state, action) => {
        const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
        if(state.cartItems[itemIndex].cartQuantity > 1) {
          state.cartItems[itemIndex].cartQuantity -= 1;
         
        } else if(state.cartItems[itemIndex].cartQuantity === 1){
          const removeItem = state.cartItems.filter(item => item.id !== action.payload.id)
          state.cartItems = removeItem;
          
        }
      },
      clearCart: (state) => {
        state.cartItems = []
        notification["success"]({
            message: "Operation was successfull!",
            description: `all products deleted from cart`,
          });
      },
      getTotal: (state) => {
        const {total, quantity} = state.cartItems.reduce(
          (cartTotal, cartItem) => {
            const {price, cartQuantity} = cartItem;
            const itemTotal = price * (cartQuantity ?? 0);
  
            cartTotal.total += itemTotal;
            cartTotal.quantity += (cartQuantity ?? 0);
  
            return cartTotal
          },
          {
            total: 0,
            quantity: 0
          }
        );
  
        state.cartTotalQuantity = quantity;
        state.cartTotalAmount = total;
      }
    
  },

});

export const { addProduct, removeProduct, decreaseProduct, getTotal, clearCart } = cartSlice.actions
export default cartSlice.reducer;
