import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from "./cartSlice";
import favouriteReducer from "./favouriteSlice";
export const store = configureStore({
    reducer: {
        authReduce: authReducer,
        cartReducer: cartReducer,
        favouriteReducer: favouriteReducer,
    },
})
