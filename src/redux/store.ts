import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import chatReducer from './chatsSlice'
import messagesReducer from "./messagesSlice";


const  store= configureStore({
    reducer:{
        user:userReducer,
        chat:chatReducer,
        messages:messagesReducer,
       
    }
})

export default store
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch =typeof store.dispatch