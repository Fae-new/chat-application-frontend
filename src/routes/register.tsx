import React, { useState, useRef } from 'react'
import { useAppDispatch,useAppSelector } from '../redux/hooks';
import { useNavigate,Link} from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { setUser } from '../redux/userSlice';
import { setMessages } from '../redux/messagesSlice';
import { setChats } from '../redux/chatsSlice';
import { userType } from '../data';





const Register = () => {
  const navigate = useNavigate()

  const dispatch=useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const passwordConfirmRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const usernameRef = useRef() as React.MutableRefObject<HTMLInputElement>



  const register = async (e:React.FormEvent<HTMLFormElement>) => {
e.preventDefault()

try {
  

const res= await axios.post('http://localhost:3000/users/register',
{username:usernameRef.current.value,
password:passwordRef.current.value,
email:emailRef.current.value
})

const data:userType=await res.data.userInfo
dispatch(setUser({uid:data.uid,email:data.email,userName:data.userName}))
dispatch(setMessages(data.messages))
dispatch(setChats(data.contacts))
navigate('/',{replace:true})

console.log(data.messages,data.contacts,data.userName)
  
} catch (err:any) {
  console.log(err.response.data);
  setError(err.response.data)

}



  }

 

  return (
    <div className='form' >
      <h1>Create an account</h1>
      <p className='subtext'> Let's get started</p>

<form action="" onSubmit={register}>
      <label htmlFor="email">Email</label> <br />
      <input type="email"
        placeholder='Enter your email'
        autoComplete='none'
        ref={emailRef}
        required
      /><br />

<label htmlFor="email">Username</label> <br />
      <input type="text"
        placeholder='choose a username'
        autoComplete='none'
        ref={usernameRef}
        required
      /><br />

      <label htmlFor="password">Password</label><br />
      <input type="password"
        name="password"
        placeholder='Enter your password'
        ref={passwordRef}
        required
      />

      <label htmlFor="password">Confirm Password</label><br />
      <input type="password"
        name="password"
        ref={passwordConfirmRef}
        placeholder='Confirm your password'
        required
      />

      <p className='error'>{error}</p>

      <button className='form-btn' type='submit'>Create account</button>

      <p style={{ textAlign: 'center' }}>Already have an account? <Link to={'/login'}> Sign in</Link></p>

      </form>
    </div>
  )
}

export default Register;