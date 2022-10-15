import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { chatsdb } from "../data";




const initialState:chatsdb[]=[]




export const chatSlice= createSlice({
    name:'chats',
    initialState:initialState,
    reducers:{
        setChats:(state,action:PayloadAction<[]|chatsdb[]>)=>state=action.payload,
addChat:(state,action:PayloadAction<chatsdb>)=>state=[...state,action.payload]

    }
})
// state.push(action.payload)

export const {addChat,setChats}=chatSlice.actions;
export default chatSlice.reducer;