import { createSlice } from '@reduxjs/toolkit'
import { getDataByKey, setDataByKey } from "../utils/stograte";
import AuthService from "../api/AuthService";

// let token = getDataByKey('token');
// let access_token = '';

const initialState = {
    token_info: null,
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokenLogin: (state, action) => {
            let token = action.payload;
            state.token_info = token;

            // setDataByKey('token', token);
        },
        logoutRedux: (state) => {
            state.token_info = {};
            state.user = null;
        },

        setUser(state, action)
        {
            state.user = action.payload;
        }
    },
})

export const {  setTokenLogin, logoutRedux, setUser } = authSlice.actions

export default authSlice.reducer

