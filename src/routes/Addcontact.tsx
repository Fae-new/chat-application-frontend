import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { userType } from '../data'
import { addChat } from '../redux/chatsSlice'
import socket from '../socket/socket'

const Addcontact = () => {
  const add = useRef() as React.MutableRefObject<HTMLInputElement>
  const [foundUsers, setFounduser] = useState<userType[]>([])
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)
  const chats = useAppSelector((state) => state.chat.length)
  const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>


  const searchUser = async () => {
    try {
      const res = await axios.post('http://localhost:3000/contacts/finduser', { username: add.current.value })
      const data = await res.data
      console.log(data);
      setFounduser(data)

    } catch (error) {
      console.log(error);

    }

  }

  const addFriend = async (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {



    try {


      const res = await axios.post('http://localhost:3000/contacts', { senderid: user.userInfo?.uid, recieverid: e.currentTarget.id })
      const data = await res.data
      dispatch(addChat(data.chat.friendInfo))
       socket.emit('add_contact',{contactInfo:data.chat.userInfo,id:data.chat.friendInfo.friendId})


    } catch (error) {
      console.log(error);

    }

  }


  return (
    <div>

      <input type="text" ref={add} />
      <button onClick={searchUser}>Search</button>

      {foundUsers.map((user,index) => {
        return <div key={index}>
          <h3 ref={nameRef} >{user.userName}</h3>
          <p onClick={addFriend} id={user.uid}>add as friend</p>

        </div>


      })}

    </div>
  )
}

export default Addcontact