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
console.log(chatMessages);
;


}






    return (
        <div style={{ flexGrow: '1', overflowY: 'scroll', paddingInline: '60px' }}>
            {chatMessages?.length!==0? chatMessages?.map((item, index) => {
                return (
                    <div key={index} id={''+item.time} className={item.sentUid === user?.uid ? 'sentMsg msgDiv' : 'recMsg msgDiv'}>
                        <p className='msgBody' style={item.sentUid === user?.uid ? { backgroundColor: ' rgb(155, 247, 155)' } : { backgroundColor: 'white' }}> {item.text} </p>
                        <p className='time'>{item.time}</p>

                    </div>
                )
            }):<p> start chatting with this person</p>}
        </div>
    )
}

export default ChatField