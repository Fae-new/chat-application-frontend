import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {userSliceType} from '../data'



interface InitialState{
    userInfo:null|userSliceType
}


const initialState:InitialState={
    userInfo:null
}

export const userSlice=createSlice({
    name:'userInfo',
    initialState:initialState,
    reducers:{
setUser:(state,action:PayloadAction<null|userSliceType>)=>{
   state.userInfo=action.payload
}


    }
})

export const {setUser}=userSlice.actions
export default userSlice.reducer