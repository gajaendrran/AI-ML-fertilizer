import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "../slices/userSlice"

//Configuring Store
export const store = configureStore({
    reducer:{
        userInfo:userSlice.reducer
    }
});