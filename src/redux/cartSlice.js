import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listsCart: []
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getCart: (state, action) => {
            return state.listsCart;
        },
        addToCartStore: (state, action) => {
            const itemInCart = state.listsCart.find((item) => item.id === action.payload.id);
            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state.listsCart.push({ ...action.payload, quantity: action.payload.quantity });
            }
        },
        incrementQuantity: (state, action) => {
            let itemInCart = state.listsCart.find((item) => item.id === action.payload.id);
            if (itemInCart && itemInCart.quantity) {
                console.log('--------------- itemInCart.quantity: ', itemInCart.quantity);
                itemInCart.quantity++;
                console.log('--------------- itemInCart.quantity ++ : ', itemInCart.quantity);
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.listsCart.find((item) => item.id === action.payload.id);
            if (item.quantity === 1) {
                item.quantity = 1
            } else {
                item.quantity--;
            }
        },
        removeItemStore: (state, action) => {
            state.listsCart = state.listsCart.filter((item) => item.id !== action.payload.id);
        },
        remoteAll: (state) => {
            state.listsCart = [];
        }
    },
})

export const { getCart, addToCartStore, removeItemStore, remoteAll, decrementQuantity, incrementQuantity } = cartSlice.actions
export default cartSlice.reducer;
