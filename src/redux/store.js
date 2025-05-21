import {configureStore, createStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice.js"
const store = configureStore({
    reducer: {
        login: authReducer,
    }
})
export default store;