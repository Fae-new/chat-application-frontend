import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { userType } from '../data'
import { addChat } from '../redux/chatsSlice'
import { useNavigate } from 'react-router-dom';
import socket from '../socket/socket'
import Loader from '../components/loader';

const Addcontact = () => {
  const searchValue = useRef() as React.MutableRefObject<HTMLInputElement>
  const [foundUsers, setFounduser] = useState<userType[]>([])
  const [error, setError] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user)
  const contacts = useAppSelector((state) => state.chat)
  const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const [loading, setLoading] = useState(false)

  const searchUser = async () => {

    setError('')
    setLoading(true)
setFounduser([])

    if (searchValue.current.value.trim().length === 0) {
      setLoading(false)
      return setError('Input a search term')
    }

    try {
      const res = await axios.post(import.meta.env.VITE_FIND_USER, { username: searchValue.current.value })
      const data = await res.data
      if (data.length === 0) {
        setLoading(false)
        return setError('No Users Found')
      }

      setFounduser(data)
      setLoading(false)

    } catch (error) {
      console.log(error);
      setLoading(false)
      return setError('There was an error, try again later')

    }

  }

  const addFriend = async (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {

    setLoading(true)
    if (user.userInfo?.uid === e.currentTarget.id) {
      return setError('You want to chat with yourself ?')

    }
    const findFriend = contacts.filter((contact) => contact.friendId === e.currentTarget.id)
    if (findFriend.length !== 0) {
      return setError('Already added as friend')
    }


    try {

      const res = await axios.post(import.meta.env.VITE_ADD_CONTACT, { senderid: user.userInfo?.uid, recieverid: e.currentTarget.id })
      const data = await res.data
      dispatch(addChat(data.chat.friendInfo))
      socket.emit('add_contact', { contactInfo: data.chat.userInfo, id: data.chat.friendInfo.friendId })
navigate('/')
setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
      return setError('There was an error, try again later')
    }

  }



  if(loading) return <Loader height='100vh'/>


  return (
    <div className='addContactDiv'>
      <ArrowBackIcon className='backIcon' onClick={() => { navigate('/') }} />
      <input type="text" ref={searchValue} placeholder='Search by Username' onChange={() => setError('')} /> <br />
      <button onClick={searchUser} style={{cursor:'pointer',marginBottom:'20px'}}>Search</button>
     

      {   foundUsers.map((user, index) => {
        return <div key={index} className='foundContact'>
          <h3 ref={nameRef} >{user.userName}</h3>
   
          <img src="https://cdn-icons-png.flaticon.com/512/748/748137.png" id={user.uid} onClick={addFriend} style={{ width: '25px' }} alt="" />

        </div>


      })}


      <p style={{ color: 'red', fontWeight: 'bold', fontSize: '15px' }}>{error}</p>
    </div>
  )
}

export default Addcontact