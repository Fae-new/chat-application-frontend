import React, { useEffect } from 'react'
import ChatList from '../components/Added-contacts'
import { Outlet,Route } from 'react-router-dom'
import socket from '../socket/socket'
import { useAppSelector } from '../redux/hooks'

const Homepage = () => {

  const chats=useAppSelector((state)=>state.chat)  
  const user=useAppSelector((state)=>state.user)

  useEffect(()=>{
    chats.forEach((chat)=>{
      socket.emit('join_room',chat.chatId)
    })
      
    },[chats])

    useEffect(()=>{
socket.emit('join_room',user.userInfo?.uid)

    },[])


  return (
    <>
    <div className='home'>
 <ChatList/>
  <Outlet />
    </div>
    </>
  )
}

export default Homepage