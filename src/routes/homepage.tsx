import React, { useEffect } from 'react'
import ChatList from '../components/Added-contacts'
import { Outlet,Route } from 'react-router-dom'
import socket from '../socket/socket'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { useWindow } from '../hooks/useWidth'


const Homepage = () => {

  const chats=useAppSelector((state)=>state.chat)  
  const user=useAppSelector((state)=>state.user)
const {width}=useWindow()
  useEffect(()=>{
    chats.forEach((chat)=>{
      socket.emit('join_room',chat.chatId)
    })
      
    },[chats])

    useEffect(()=>{
socket.emit('join_room',user.userInfo?.uid)
// socket.emit('set_status',{online:true,uid:user.userInfo?.uid})

    },[])


  return (
    <>
    <div className='home'>
{width>768?<ChatList/>:null}
  <Outlet />
    </div>
    </>
  )
}

export default Homepage