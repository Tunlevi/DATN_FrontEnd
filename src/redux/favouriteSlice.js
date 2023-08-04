import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lists: []
}
export const favouriteSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getListFavorite: (state, action) => {
            return state.lists;
        },
        addToFavouriteStore: (state, action) => {
            const itemInCart = state.lists.find((item) => item.id === action.payload.id);
            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state.lists.push({ ...action.payload, quantity: action.payload.quantity });
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.lists.find((item) => item.id === action.payload.id);
            item.quantity++;
        },
        decrementQuantity: (state, action) => {
            const item = state.lists.find((item) => item.id === action.payload.id);
            if (item.quantity === 1) {
                item.quantity = 1
            } else {
                item.quantity--;
            }
        },
        removeItemStore: (state, action) => {
            state.lists = state.lists.filter((item) => item.id !== action.payload.id);
        },
        remoteAll: (state) => {
            state.lists = [];
        }
    },
})

export const { addToFavouriteStore, removeItemStore } = favouriteSlice.actions
export default favouriteSlice.reducer;
