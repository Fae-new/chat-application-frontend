import React, { useEffect } from 'react'
// import { chatsdb,messsage} from '../data'
import { useAppSelector,useAppDispatch } from '../redux/hooks'
import { useParams } from 'react-router-dom'


const ChatField = () => {

    const user= useAppSelector((state)=>state.user.userInfo)
const dispatch=useAppDispatch()
const {chatId}=useParams()
const messagesArray=useAppSelector((state)=>state.messages)



let chatMessages=null
if(messagesArray){
chatMessages=messagesArray.filter((message)=>message.chatId===chatId)

}


    return (
        <div className='chatField' >

            <p className='chatStarterMessage'>This chat is encrypted from end to end</p>
            {chatMessages?.length!==0? chatMessages?.map((item, index) => {
                return (
                    <div key={index} id={item.date} className={item.senderId === user?.uid ? 'sentMsg msgDiv' : 'recMsg msgDiv'}>
                        <p className='msgBody' style={item.senderId === user?.uid ? { backgroundColor: ' #0ff4c6' } : { backgroundColor: 'white' }}> {item.text} </p>
                        <p className='time'>{item.date}</p>

                    </div>
                )
            }):<p> start chatting with this person</p>}
        </div>
    )
}

export default ChatField