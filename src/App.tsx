import { useEffect } from 'react'

import './App.css'
import {Routes,Route} from 'react-router-dom'
import Signin from './routes/signin'
import Register from './routes/register'
import ProtectedRoutes from './routes/ProtectedRoutes'
import Homepage from './routes/homepage'
import Chat from './components/Chat'
import Addcontact from './routes/Addcontact'
import socket from './socket/socket'
import { addMessage } from './redux/messagesSlice'
import { addChat } from './redux/chatsSlice'
import { useAppDispatch,useAppSelector } from './redux/hooks'

function App() {
const dispatch=useAppDispatch()


  useEffect(():(()=>void)=>{
    const eventListener=(data:any)=>{
       dispatch(addMessage(data.message)) 
       console.log(data.message);  
     }

 
 socket.on('recieve_message',eventListener)
 
 return  ()=>socket.off('recieve_message',eventListener)
 
 },[socket])

 useEffect(():(()=>void)=>{
  const eventListener=(data:any)=>{
     dispatch(addChat(data)) 
   }

socket.on('collect_contact',eventListener)

return  ()=>socket.off('collect_contact',eventListener)

},[socket])



  return (
    <div className="App">
 <Routes>
<Route element={<ProtectedRoutes/>}>
<Route path='/' element={<Homepage/>}>

<Route path='/' element={<h1>Click a contact to start chatting</h1>}></Route>
<Route path=':chatId' element={<Chat/>}/>
<Route path='addcontact' element={<Addcontact/>}></Route>

</Route>

</Route>
  <Route path='signin' element={<Signin/>}/>
  <Route path='register' element={<Register/>}/>
  <Route path='*' element={<h1>page not found</h1>}/>
 </Routes>
    </div>
  )
}

export default App
