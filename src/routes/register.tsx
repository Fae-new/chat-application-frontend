import React, { useState, useRef } from 'react'
import { useAppDispatch,useAppSelector } from '../redux/hooks';
import { useNavigate,Link} from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { setUser } from '../redux/userSlice';
import { setMessages } from '../redux/messagesSlice';
import { setChats } from '../redux/chatsSlice';
import { userType } from '../data';
import Loader from '../components/loader';





const Register = () => {
  const navigate = useNavigate()
  const dispatch=useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')  
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const passwordConfirmRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const usernameRef = useRef() as React.MutableRefObject<HTMLInputElement>


const handleClick:(user:number)=>void=(user)=>{

  usernameRef.current.value=`user${user}`
  emailRef.current.value=`user${user}@gmail.com`
  passwordRef.current.value=`123456`
  passwordConfirmRef.current.value=`123456`

}


  const register = async (e:React.FormEvent<HTMLFormElement>) => {
e.preventDefault()
setError('')
 setLoading(true)


if(passwordRef.current.value!== passwordConfirmRef.current.value){
  return setError('Passwords do not match')
}

try {
const res= await axios.post(import.meta.env.VITE_REGISTER_URL,
{username:usernameRef.current.value,
password:passwordRef.current.value,
email:emailRef.current.value
})

const data:userType=await res.data.userInfo
dispatch(setUser({uid:data.uid,email:data.email,userName:data.userName}))
dispatch(setMessages(data.messages))
dispatch(setChats(data.contacts))
navigate('/',{replace:true})

setLoading(false)
  
} catch (err:any) {
  console.log(err.response.data);
  setError(err.response.data)
  setLoading(false)
}
  }


 if(loading) return <Loader height='100vh'/>
 

  return (
    <div className='form' >
      <h1>Create an account</h1>
      <p className='subtext'> Let's get started</p>

<form action="" onSubmit={register}>
  <div>
      <label htmlFor="email">Email</label> <br />
      <input type="email"
        placeholder='Enter your email'
        autoComplete='none'
        ref={emailRef}
        required
      />
</div>

<div>
<label htmlFor="email">Username</label> <br />
      <input type="text"
        placeholder='choose a username'
        autoComplete='none'
        ref={usernameRef}
        required
        minLength={4}
        maxLength={8}
      />
</div>

<div>
      <label htmlFor="password">Password</label><br />
      <input type="password"
        name="password"
        placeholder='Enter your password'
        ref={passwordRef}

        required
        minLength={6}
      />


</div>

<div>
      <label htmlFor="password">Confirm Password</label><br />
      <input type="password"
        name="password"
        ref={passwordConfirmRef}
        placeholder='Confirm your password'
        required
      />
      </div>
      <p className='error'>{error}</p>

      <button className='form-btn' type='submit'>Create account</button>

      <p style={{ textAlign: 'center' }}>Already have an account? <Link to={'/login'}> Sign in</Link></p>

      </form>

    </div>
  )
}

export default Register;