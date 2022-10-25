import React from 'react'
import placeholderimg from '../assets/placeholder.jpg'
import { chatsdb } from '../data'
import { Link, useNavigate } from 'react-router-dom'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useAppSelector,useAppDispatch } from '../redux/hooks'

const ChatList = () => {
const dispatch=useAppDispatch()
    const navigate = useNavigate()
    const contacts = useAppSelector((state) => state.chat)
    const messages = useAppSelector((state) => state.messages)
let thisChat:chatsdb|{}={}
    const openChat = (chat: chatsdb, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        navigate(`${chat.chatId}`)
        const id = messages.filter((message) => message.chatId === e.currentTarget.id).at(-1)?.date
// let readmessage=messages.filter((message)=>message.chatId===e.currentTarget.id).map((message)=>{
// message.read=true
// })


        setTimeout(() => { window.location.href = '#' + id }, 10)
    }
// const unread=messages.filter((message)=>message.chatId === ).length



    return (
        <div className='chats'>
            <div className='userNav'>
                <div style={{ display: 'flex', alignItems: 'center' }}> <img src={placeholderimg} alt="" className='profilePic' />
                    <h2>Chats</h2>
                </div>
                <AddCircleIcon fontSize='inherit' className='options' onClick={() => { navigate('addcontact') }} />
            </div>
            <div style={{ position: 'relative', marginBlock: '10px' }}>
                <input className='searchBar' placeholder='Search Your Contacts' type="text" />
                <img style={{ width: '15px', position: 'absolute', marginLeft: '-30px', marginTop: '20px' }} src="https://cdn-icons-png.flaticon.com/512/151/151773.png" alt="" />
            </div>
            <div style={{ overflowY: 'auto' }}>
                {contacts.length !== 0 ? contacts.map((chat, index) => {
                    return (
                        <div className='chat' key={index} id={chat.chatId} onClick={(e) => { openChat(chat, e) }}>

                            <img src={placeholderimg} alt="profile picture" className='profilePic' />

                            <div className='previewChat' >

                                <div >
                                    <p style={{ fontWeight: 'bold' }}>{chat?.friendName}</p>
                                    <p style={{ fontSize: '12px', fontWeight: '530',color: 'grey' }}>{messages.filter((message) => message.chatId === chat.chatId)[0] ? messages.filter((message) => message.chatId === chat.chatId)[messages.filter((message) => message.chatId === chat.chatId).length - 1].date : ''}</p>
                                </div>

                                <div>
                                    {messages.filter((message) => message.chatId === chat.chatId).at(-1)? <p style={{ fontSize: '12px', marginLeft: '5px', marginBottom: '20px' }}>
                                        {messages.filter((message) => message.chatId === chat.chatId)[messages.filter((message) => message.chatId === chat.chatId).length-1].text.length>17?
                                            messages.filter((message) => message.chatId === chat.chatId).at(-1)?.text.slice(0, 17) + '...' :
                                            messages.filter((message) => message.chatId === chat.chatId).at(-1)?.text}
                                    </p> : null}

                                  {/* <div  className='unreadMessagesCount'> { unread===0? null:<p>{unread}</p> }</div>  */}
                                </div>
                            </div>



                        </div>
                    )
                }) : <h3 style={{ textAlign: 'center' }}> Click the + icon to add a contact</h3>}
            </div>


        </div>
    )
}

export default ChatList