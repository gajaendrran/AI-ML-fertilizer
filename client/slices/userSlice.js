import {createSlice} from "@reduxjs/toolkit";

//Slice initial State
const initialState = {
    user : null
}

//creating slice
export const userSlice = createSlice({
    name:"user",
    initialState,
    //reducer functions
    reducers:{
        setGlobalUser:(state,action)=>{
            state.user = action.payload
        },
        removeGlobaluser:(state,action)=>{
            state.user = null
        }
    }
});

export const {setGlobalUser,removeGlobaluser} = userSlice.actions;

export default userSlice.reducer;