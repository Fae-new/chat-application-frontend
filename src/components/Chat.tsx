import React from 'react'
import { useParams } from 'react-router-dom'
import { chatsdb,messsage } from '../data'
import InputField from './InputField'
import ChatField from './ChatField'
import ChatHeader from './ChatHeader'
import { useAppSelector } from '../redux/hooks'



const Chat = () => {

    const User= useAppSelector((state)=>state.user.userInfo)

    const { chatId } = useParams()
    const chats=useAppSelector((state)=>state.chat)
    let specificChat=null
    
    if(chats){
       specificChat= chats.filter((chat)=>chat.chatId===chatId)[0]
    }


    return (

        <div className='currentChat'>

            <ChatHeader specificChat={specificChat}/>
            <ChatField />
            <InputField specificChat={specificChat}/>

        </div>


    )
}

export default Chat