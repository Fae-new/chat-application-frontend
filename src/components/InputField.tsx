import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { chatsdb } from '../data'

import socket from '../socket/socket'
import { addMessage } from '../redux/messagesSlice'
import axios from 'axios'



const InputField = ({ specificChat }: { specificChat: chatsdb | null }) => {
  const dispatch = useAppDispatch()
  const User = useAppSelector((state) => state.user.userInfo)
  const Chat=useAppSelector((state)=>state.chat)
  const [text, setText] = useState('')

  let uid = ''
  if (User) uid = User.uid

  let chatId = ''
  if (specificChat) chatId = specificChat.chatId

  Chat.filter((chat)=>chat.chatId===chatId)

  const sendMessage = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text.trim().length === 0) return


const date=new Date()
let hours=''+date.getHours()
let minutes=''+date.getMinutes()
if(hours.length===1)hours='0'+hours 
if(minutes.length===1)minutes='0'+minutes 
 const newMessage = {text:text,sentUid:uid,time:`${hours}:${minutes}`,chatId:chatId}

 socket.emit('send_message', { message: newMessage,chatId})
    dispatch(addMessage(newMessage))
    window.location.href = '#' + `${hours}:${minutes}`
    setText('')

    const res = await axios.post('http://localhost:3000/contacts/sendmessage', { senderid: newMessage.sentUid, recieverid: Chat[0].friendId,chatid:newMessage.chatId,text:newMessage.text,time:newMessage.time })
    const data = await res.data
    if(data.msg==='message sent'){
      console.log('saved to db');
      
    }

  }

  return (
    <div className='inputDiv'>
      <img src="https://cdn-icons-png.flaticon.com/512/569/569501.png" alt="" />
      <form action="" onSubmit={sendMessage} >
        <input type="text" value={text} placeholder='Type a message' onChange={(e) => { setText(e.target.value) }} />
      </form>
      <img src="https://cdn-icons-png.flaticon.com/512/709/709950.png" className='recordIcon' alt="" />


    </div>
  )
}

export default InputField