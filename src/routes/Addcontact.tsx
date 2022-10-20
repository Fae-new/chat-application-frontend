import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { userType } from '../data'
import { addChat } from '../redux/chatsSlice'
import { useNavigate } from 'react-router-dom';
import socket from '../socket/socket'

const Addcontact = () => {
  const searchValue = useRef() as React.MutableRefObject<HTMLInputElement>
  const [foundUsers, setFounduser] = useState<userType[]>([])
  const [error, setError] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user)
  const contacts = useAppSelector((state) => state.chat)
  const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>


  const searchUser = async () => {

    if (searchValue.current.value.trim().length === 0) {
      return setError('Input a search term')
    }

    try {
      const res = await axios.post(import.meta.env.VITE_API_BASE_URL + '/contacts/finduser', { username: searchValue.current.value })
      const data = await res.data
      if (data.length === 0) {
        setError('No Users Found')
      }
      setFounduser(data)

    } catch (error) {
      console.log(error);

    }

  }

  const addFriend = async (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {

    if (user.userInfo?.uid === e.currentTarget.id) {
      return setError('You want to chat with yourself ?')

    }
    const findFriend = contacts.filter((contact) => contact.friendId === e.currentTarget.id)
    if (findFriend.length !== 0) {
      return setError('Already added as friend')
    }


    try {

      const res = await axios.post(import.meta.env.VITE_API_BASE_URL + '/contacts', { senderid: user.userInfo?.uid, recieverid: e.currentTarget.id })
      const data = await res.data
      dispatch(addChat(data.chat.friendInfo))
      socket.emit('add_contact', { contactInfo: data.chat.userInfo, id: data.chat.friendInfo.friendId })


    } catch (error) {
      console.log(error);

    }

  }


  return (
    <div className='addContactDiv'>
      <ArrowBackIcon sx={{ alignSelf: 'flex-start', marginLeft: '50px', marginTop: '-30px', marginBottom: '50px' }} onClick={() => { navigate('/') }} />
      <input type="text" ref={searchValue} placeholder='Search by Username' onChange={() => setError('')} /> <br />
      <button onClick={searchUser}>Search</button>


      {foundUsers.map((user, index) => {
        return <div key={index} className='foundContact'>
          <h3 ref={nameRef} >{user.userName}</h3>
          {/* <button onClick={addFriend} id={user.uid}>add as friend</button> */}
          <img src="https://cdn-icons-png.flaticon.com/512/748/748137.png" id={user.uid} onClick={addFriend} style={{ width: '25px' }} alt="" />

        </div>


      })}
      <p style={{ color: 'red', fontWeight: 'bold', fontSize: '15px' }}>{error}</p>
    </div>
  )
}

export default Addcontact