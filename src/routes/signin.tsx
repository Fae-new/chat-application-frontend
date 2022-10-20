import axios from 'axios';
import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setUser } from '../redux/userSlice';
import { setMessages } from '../redux/messagesSlice';
import { setChats } from '../redux/chatsSlice';
import { userType } from '../data';




const Signin = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const [error, setError] = useState('')

  console.log(document.body.clientWidth);
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = { email: emailRef.current.value, password: passwordRef.current.value }

    try {
      const res = await axios.post(import.meta.env.VITE_API_BASE_URL+'/users/login', formData)
      const data = await res.data
      console.log(data);
 
      dispatch(setUser({uid:data.userInfo.uid,email:data.userInfo.email,userName:data.userInfo.userName}))
      dispatch(setMessages(data.userInfo.messages))
      dispatch(setChats(data.userInfo.chats))
console.log(data.userInfo.messages);


      navigate('/', { replace: true })
    }

    catch (err: any) {
      console.log(err.response.data);
      setError(err.response.data)
    }

  }





  return (
    
    <div className='form' >
      <h1>Welcome back</h1>
      <p className='subtext'> Welcome back! Please enter your details</p>
      <form action="" onSubmit={login} >
        <label htmlFor="email">Email</label> <br />
        <input type="email"
          placeholder='Enter your Email'

          ref={emailRef}
          required
        /><br />

        <label htmlFor="password">Password</label><br />
        <input type="password"
          name="password"
          placeholder='Enter your password'
          ref={passwordRef}
          required
        />


        <p className='error'>{error}</p>
        <button type='submit' className='form-btn'>Sign in</ button>


        <p style={{ textAlign: 'center' }}>Don't have an account? <Link to={'/register'}> <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Sign up</span></Link></p>
      </form>
    </div>
  )
}

export default Signin;