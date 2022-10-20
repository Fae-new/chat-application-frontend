import React, { useState,useRef } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { chatsdb } from '../data'
import EmojiKeyboard from './EmojiKeyboard'
import socket from '../socket/socket'
import { addMessage } from '../redux/messagesSlice'
import axios from 'axios'



const InputField = ({ specificChat }: { specificChat: chatsdb | null }) => {
  const dispatch = useAppDispatch()
  const User = useAppSelector((state) => state.user.userInfo)
  const Chat=useAppSelector((state)=>state.chat)
  const [keyboard,toggleKeyboard]=useState(true)
  const input=useRef()  as React.MutableRefObject<HTMLInputElement>

let uid = ''
  if (User) uid = User.uid

  let chatId = ''
  if (specificChat) chatId = specificChat.chatId


const openEmojiKeyboard=()=>{
keyboard ? toggleKeyboard(false) : toggleKeyboard(true)
input.current.focus()
}




const typeEmoji=(e:React.MouseEvent< HTMLParagraphElement,MouseEvent>)=> {
    
  input.current.value+= e.currentTarget.innerHTML
  input.current.focus()
}


  const sendMessage = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.current.value.trim().length === 0) return


const date=new Date()
let hours=''+date.getHours()
let minutes=''+date.getMinutes()
if(hours.length===1)hours='0'+hours 
if(minutes.length===1)minutes='0'+minutes 
 const newMessage = {text:input.current.value,senderId:uid,date:`${hours}:${minutes}`,chatId:chatId}

 socket.emit('send_message', { message: newMessage,chatId})
    dispatch(addMessage(newMessage))
 setTimeout(()=>{window.location.href='#'+newMessage.date},50)
input.current.value=''
    const res = await axios.post(import.meta.env.VITE_SEND_MESSAGE, { senderid: newMessage.senderId, recieverid: Chat[0].friendId,chatid:newMessage.chatId,text:newMessage.text,date:newMessage.date })
    const data = await res.data
    if(data.msg==='message sent'){
      console.log('saved to db');
    
    }
   
  
  }

  return (
    <>
    <div className='inputDiv'>
      <img src="https://cdn-icons-png.flaticon.com/512/569/569501.png" onClick={openEmojiKeyboard} alt="" />
      <form action="" onSubmit={sendMessage} >
        <input type="text" placeholder='Type a message' ref={input} />
      </form>
      <img src="https://cdn-icons-png.flaticon.com/512/709/709950.png" className='recordIcon' alt="" />


    </div>
    <EmojiKeyboard typeEmoji={typeEmoji} toggle={keyboard} toggleFunction={openEmojiKeyboard}/>
    </> 
  )
}

export default InputField