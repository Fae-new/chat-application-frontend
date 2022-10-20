import React from 'react'
import placeholderimg from '../assets/placeholder.jpg'
import { chatsdb } from '../data'
import { Link, useNavigate } from 'react-router-dom'

import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useAppSelector } from '../redux/hooks'

const ChatList = () => {

    const navigate = useNavigate()
    const contacts = useAppSelector((state) => state.chat)
    const messages = useAppSelector((state) => state.messages)

    const openChat = (chat: chatsdb, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        navigate(`${chat.chatId}`)
        const id = messages.filter((message) => message.chatId === e.currentTarget.id)[messages.filter((message) => message.chatId === e.currentTarget.id).length - 1].date

        setTimeout(() => { window.location.href = '#' + id }, 10)
    }


    const goHome=()=>{
        navigate('/')
    }

    return (
        <div className='chats'>
            <div className='userNav'>
              <div style={{display:'flex',alignItems:'center'}}> <img src={placeholderimg} alt="" className='profilePic' />
                <h2>Chats</h2>
                </div> 
               <AddCircleIcon fontSize='inherit' className='options'  onClick={() => { navigate('addcontact') }} />
            </div>
            <div style={{ position: 'relative', marginBlock: '10px' }}>
                <input className='searchBar' placeholder='Search Your Contacts' type="text" />
                <img style={{ width: '15px', position: 'absolute', marginLeft: '-30px', marginTop: '20px' }} src="https://cdn-icons-png.flaticon.com/512/151/151773.png" alt="" />
            </div>
            <div style={{overflowY:'auto'}}>
            {contacts.length !== 0 ? contacts.map((chat, index) => {
                return (
                    <div className='chat' key={index} id={chat.chatId} onClick={(e) => { openChat(chat, e) }}>

                        <img src={placeholderimg} alt="profile picture" className='profilePic' />

                        <div className='previewChat' >
                            <div >
                                <p style={{ fontWeight: 'bold' }}>{chat?.friendName}</p>
                                <p style={{ fontSize: '12px', fontWeight: '550' }}>{messages.filter((message) => message.chatId === chat.chatId)[0] ? messages.filter((message) => message.chatId === chat.chatId)[messages.filter((message) => message.chatId === chat.chatId).length - 1].date : ''}</p>
                            </div>

                            {messages.filter((message) => message.chatId === chat.chatId)[0] ? <p style={{ fontSize: '12px', marginLeft: '5px', marginBottom: '20px' }}>
                                {messages.filter((message) => message.chatId === chat.chatId)[messages.filter((message) => message.chatId === chat.chatId).length - 1].text.length > 20 ?
                                    messages.filter((message) => message.chatId === chat.chatId)[messages.filter((message) => message.chatId === chat.chatId).length - 1].text.slice(0, 18) + '...' :
                                    messages.filter((message) => message.chatId === chat.chatId)[messages.filter((message) => message.chatId === chat.chatId).length - 1].text}
                            </p> : null}
                        </div>



                    </div>
                )
            }) : <h3 style={{ textAlign: 'center' }}> Click the + icon to add a contact</h3>}
            </div>

           
        </div>
    )
}

export default ChatList