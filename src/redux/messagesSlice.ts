import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { messsage } from "../data";

const initialState: [] | messsage[] = []


 const messageSlice = createSlice({
    name: 'messageSlice',
    initialState: initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<messsage>) => state = [...state, action.payload],
        setMessages: (state, action: PayloadAction<[] | messsage[]>) => state = action.payload

    }

})

export const { addMessage ,setMessages} = messageSlice.actions
export default messageSlice.reducer