import axios from 'axios';
import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setUser } from '../redux/userSlice';
import { setMessages } from '../redux/messagesSlice';
import { setChats } from '../redux/chatsSlice';
import { userType } from '../data';
import Loader from '../components/loader';




const Signin = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)


  const handleClick=(user:number)=>{

    emailRef.current.value=`user${user}@gmail.com`
    passwordRef.current.value='123456'

  }
  

  const login = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()
    setLoading(true)
    
    const formData = { email: emailRef.current.value, password: passwordRef.current.value }
    try {
      const res = await axios.post(import.meta.env.VITE_LOGIN_URL, formData)
      const data = await res.data
      dispatch(setUser({uid:data.userInfo.uid,email:data.userInfo.email,userName:data.userInfo.userName}))
      dispatch(setMessages(data.userInfo.messages))
      dispatch(setChats(data.userInfo.chats))
      navigate('/', { replace: true })
      setLoading(false)
    }

    catch (err: any) {
      console.log(err.response.data);
      setError(err.response.data)
      setLoading(false)
    }

  }

  if(loading) return <Loader height='100vh'/>


  return (
    
    <div className='form' >
      <h1>Welcome back</h1>
      <p className='subtext'> Welcome back! Please enter your details</p>
    
 
      <form action="" onSubmit={login}>
      <div >
        <label htmlFor="email">Email</label> <br />
        <input type="email"
          placeholder='Enter your Email'
          ref={emailRef}
          required
        />
        </div>
<div >
        <label htmlFor="password">Password</label><br />
        <input type="password"
          name="password"
          placeholder='Enter your password'
          ref={passwordRef}
          required
        />
</div>

        <p className='error'>{error}</p>
        <button type='submit' className='form-btn' >Sign in</ button>
        <button style={{backgroundColor:'#101935',color:'#f2fdff'}} onClick={()=>{handleClick(1)}} className='form-btn'>Sign in as Test User 1</ button> 
        <button   style={{backgroundColor:'#101935',color:'#f2fdff'}} onClick={()=>{handleClick(2)}} className='form-btn'>Sign in as Test User 2</ button>


        <p style={{ textAlign: 'center' }}>Don't have an account? <Link to={'/register'}> <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Sign up</span></Link></p>
      </form>
    </div>
  )
}

export default Signin;